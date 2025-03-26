from app import db
from app.models.user import User
from app.models.leaderboard import Leaderboard
from flask import current_app

def update_leaderboard(app):
    """Ensure that Flask has an active application context before running."""
    # from app import create_app  # Import `create_app` to get app instance

    # app = create_app()  # Get the Flask app instance

    # with current_app.app_context():  #  Use current_app instead
    with app.app_context():  #  Use the passed app instance

        users = User.query.order_by(User.balance.desc()).all()

        for rank, user in enumerate(users, start=1):
            leaderboard_entry = Leaderboard.query.filter_by(user_id=user.id).first()

            if leaderboard_entry:
                leaderboard_entry.virtual_balance = user.balance
                leaderboard_entry.rank = rank
            else:
                new_entry = Leaderboard(user_id=user.id, virtual_balance=user.balance, rank=rank)
                db.session.add(new_entry)

        db.session.commit()
