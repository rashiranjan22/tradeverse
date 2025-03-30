# from app import db
# import enum
# import datetime

# class OrderType(enum.Enum):
#     BUY = "BUY"
#     SELL = "SELL"

# class Order(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
#     symbol = db.Column(db.String(20), nullable=False)
#     order_type = db.Column(db.Enum(OrderType), nullable=False)
#     quantity = db.Column(db.Integer, nullable=False)
#     price = db.Column(db.Float, nullable=False)
#     status = db.Column(db.String(20), default="PENDING")  # Status: PENDING, COMPLETED, FAILED
#     timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)

#     user = db.relationship("User", backref="orders")
