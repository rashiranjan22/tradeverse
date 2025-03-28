from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Transaction, Order, BhavCopy
from app.utils import pseudo_stock_value
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

    transaction = Transaction(
        user_id=current_user.id,
        symbol=symbol,
        order_type="BUY",
        quantity=quantity,
        price=stock_price,
        status="COMPLETED"
    )
    db.session.add(transaction)

    order = Order(
        user_id=current_user.id,
        symbol=symbol,
        order_type="BUY",
        quantity=quantity,
        price=stock_price,
        status="COMPLETED"
    )
    db.session.add(order)

    db.session.commit()
    return jsonify({"message": "Stock purchased successfully!"}), 200

@buysell.route("/sell", methods=["POST"])
@login_required
def sell_stock():
    data = request.get_json()
    symbol = data.get("symbol")
    quantity = int(data.get("quantity"))

    stock_price = get_stock_value(symbol)
    if not stock_price:
        return jsonify({"error": "Stock data unavailable."}), 404

    total_held = sum(order.quantity for order in current_user.orders if order.symbol == symbol and order.order_type == "BUY")
    total_sold = sum(order.quantity for order in current_user.orders if order.symbol == symbol and order.order_type == "SELL")

    net_holdings = total_held - total_sold
    if net_holdings < quantity:
        return jsonify({"error": "Insufficient stock holdings."}), 400

    total_earning = stock_price * quantity
    current_user.balance += total_earning

    transaction = Transaction(
        user_id=current_user.id,
        symbol=symbol,
        order_type="SELL",
        quantity=quantity,
        price=stock_price,
        status="COMPLETED"
    )
    db.session.add(transaction)

    order = Order(
        user_id=current_user.id,
        symbol=symbol,
        order_type="SELL",
        quantity=quantity,
        price=stock_price,
        status="COMPLETED"
    )
    db.session.add(order)

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

        print(transactions_list)  # Debug what's being sent
        return jsonify(transactions_list), 200

    except Exception as e:
        print(f"Error: {str(e)}")  # Log any errors
        return jsonify({"error": str(e)}), 500
