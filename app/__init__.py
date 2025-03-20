from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_apscheduler import APScheduler  # Use Flask-APScheduler
from config import Config



db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
scheduler = APScheduler()  # Initialize APScheduler

def create_app():
    app = Flask(__name__, template_folder="templates", static_folder="static")
    app.config.from_object(Config)

    
    # Ensure session persists across redirects
    app.config["SESSION_PERMANENT"] = False  

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    migrate = Migrate(app, db)

    # Initialize APScheduler BEFORE adding jobs
    scheduler.init_app(app)
    scheduler.start()

    # Import models and functions INSIDE app context to avoid circular imports
    with app.app_context():
        from app.models.user import User
        from app.models.leaderboard import Leaderboard
        from app.models.bhavcopy import BhavCopy
        from app.tasks import update_leaderboard  # Import update_leaderboard

        # Add the scheduled job (AFTER scheduler is started)
    # Pass app instance to the job
        scheduler.add_job(
            id="update_leaderboard",
            func=update_leaderboard,
            args=[app],  # Pass app as an argument
            trigger="interval",
            seconds=5
        )

    # Register Blueprints
    from app.routes import register_blueprints
    register_blueprints(app)

    # User Loader Function for Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    login_manager.login_view = "auth.signup"
    login_manager.login_message_category = "info"

    return app