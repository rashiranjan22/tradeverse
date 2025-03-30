from app import db
class Holding(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    symbol = db.Column(db.String(20), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    avg_price = db.Column(db.Float, nullable=False)
    #remove avg_price

    user = db.relationship("User", backref="holdings")
