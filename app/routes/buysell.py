from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Transaction, BhavCopy, Holding
from app.utils.pseudo_stock_value import pseudo_stock_value
from flask_login import current_user, login_required, current_user

buysell = Blueprint("trading", __name__)

def get_stock_value(symbol):
    latest_data = BhavCopy.query.filter_by(symbol=symbol).order_by(BhavCopy.trade_date.desc()).first()

    if not latest_data:
        return None 

    return pseudo_stock_value(
        open_price=latest_data.open_price,
        close_price=latest_data.close_price,
        high_price=latest_data.high,
        low_price=latest_data.low
    )


@buysell.route("/buy", methods=["POST"])
@login_required
def buy_stock():
    data = request.get_json()
    symbol = data.get("symbol")
    quantity = int(data.get("quantity"))

    stock_price = get_stock_value(symbol)
    if not stock_price:
        return jsonify({"error": "Stock data unavailable."}), 404

    total_cost = stock_price * quantity
    if current_user.balance < total_cost:
        return jsonify({"error": "Insufficient balance."}), 400

    current_user.balance -= total_cost

    # Update holdings table
    holding = Holding.query.filter_by(user_id=current_user.id, symbol=symbol).first()
    if holding:
        new_quantity = holding.quantity + quantity
        new_avg_price = ((holding.avg_price * holding.quantity) + (stock_price * quantity)) / new_quantity
        holding.quantity = new_quantity
        holding.avg_price = new_avg_price
    else:
        holding = Holding(
            user_id=current_user.id,
            symbol=symbol,
            quantity=quantity,
            avg_price=stock_price
        )
        db.session.add(holding)

    # Create transaction record
    transaction = Transaction(
        user_id=current_user.id,
        symbol=symbol,
        order_type="BUY",
        quantity=quantity,
        price=stock_price,
        status="COMPLETED"
    )
    db.session.add(transaction)

    # Create order record
    # order = Order(
    #     user_id=current_user.id,
    #     symbol=symbol,
    #     order_type="BUY",
    #     quantity=quantity,
    #     price=stock_price,
    #     status="COMPLETED"
    # )
    # db.session.add(order)

    db.session.commit()
    return jsonify({"message": "Stock purchased successfully!"}), 200


@buysell.route("/sell", methods=["POST"])
@login_required
def sell_stock():
    print("!!!!!",current_user)
    data = request.get_json()
    symbol = data.get("symbol")
    quantity = int(data.get("quantity"))

    stock_price = get_stock_value(symbol)
    if not stock_price:
        return jsonify({"error": "Stock data unavailable."}), 404

    # Get holdings from the database
    holding = Holding.query.filter_by(user_id=current_user.id, symbol=symbol).first()
    if not holding or holding.quantity < quantity:
        return jsonify({"error": "Insufficient stock holdings."}), 400

    total_earning = stock_price * quantity
    current_user.balance += total_earning

    # Update holdings table
    if holding.quantity == quantity:
        db.session.delete(holding)  # Remove the holding if fully sold
    else:
        holding.quantity -= quantity  # Reduce the quantity

    # Create transaction record
    transaction = Transaction(
        user_id=current_user.id,
        symbol=symbol,
        order_type="SELL",
        quantity=quantity,
        price=stock_price,
        status="COMPLETED"
    )
    db.session.add(transaction)

    # Create order record
    # order = Order(
    #     user_id=current_user.id,
    #     symbol=symbol,
    #     order_type="SELL",
    #     quantity=quantity,
    #     price=stock_price,
    #     status="COMPLETED"
    # )
    # db.session.add(order)

    db.session.commit()
    return jsonify({"message": "Stock sold successfully!"}), 200

@buysell.route("/portfolio", methods=["GET,POST"])
@login_required
def view_portfolio():
    portfolio = {}
    for order in current_user.orders:
        if order.order_type == "BUY":
            portfolio[order.symbol] = portfolio.get(order.symbol, 0) + order.quantity
        elif order.order_type == "SELL":
            portfolio[order.symbol] = portfolio.get(order.symbol, 0) - order.quantity

    portfolio = {symbol: qty for symbol, qty in portfolio.items() if qty > 0}

    return jsonify(portfolio), 200



@buysell.route("/api/transactions", methods=["GET"])
@login_required
def get_transactions():
    try:
        transactions = Transaction.query.filter_by(user_id=current_user.id).order_by(Transaction.timestamp.desc()).all()
        
        transactions_list = [
            {
                "id": tx.id,
                "symbol": tx.symbol,
                "order_type": tx.order_type,
                "quantity": tx.quantity,
                "price": float(tx.price),  # Ensure price is serializable
                "status": tx.status,
                "timestamp": tx.timestamp.isoformat(),  # Convert datetime to string
            }
            for tx in transactions
        ]

        print(transactions_list)  # Debug 
        return jsonify(transactions_list), 200

    except Exception as e:
        print(f"Error: {str(e)}")  # Log any errors
        return jsonify({"error": str(e)}), 500


@buysell.route("/api/get-latest-symbols", methods=["GET"])
def get_latest_symbols():
    latest_date = db.session.query(db.func.max(BhavCopy.trade_date)).scalar()
    print("Latest Date:", latest_date)  # Debug

    if latest_date is None:
        return jsonify({"error": "No records found"}), 404
    symbols = BhavCopy.query.filter_by(trade_date=latest_date).with_entities(BhavCopy.symbol).distinct().all()
    
    # print("Fetched Symbols:", [symbol[0] for symbol in symbols])  # Debug
    return jsonify([symbol[0] for symbol in symbols])
