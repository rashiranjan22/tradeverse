import pandas as pd
from flask import Flask, jsonify,Blueprint
from app import db
from app.models.transaction import Transaction
from flask_login import login_required, current_user

progress = Blueprint("progress", __name__)


def get_portfolio_progress(user_id):
    """Fetch transactions for a user and compute portfolio value over time."""
    transactions = Transaction.query.filter_by(user_id=user_id).order_by(Transaction.timestamp).all()
    
    data = []
    portfolio_value = 0  # Running portfolio value
    
    for txn in transactions:
        value = txn.quantity * txn.price
        if txn.order_type.upper() == "BUY":
            portfolio_value += value
        elif txn.order_type.upper() == "SELL":
            portfolio_value -= value

        data.append({"date": txn.timestamp.strftime("%Y-%m-%d"), "value": portfolio_value})

    return pd.DataFrame(data)


from flask_login import login_required, current_user

@progress.route("/api/portfolio_progress", methods=["GET","POST"])
@login_required
def portfolio_progress():
    df = get_portfolio_progress(current_user.id)  # Get data for the logged-in user
    return jsonify(df.to_dict(orient="records"))