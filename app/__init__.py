from datetime import timedelta
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_apscheduler import APScheduler  
from flask_cors import CORS
from config import Config
from flask import Flask, send_from_directory
import os

db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
scheduler = APScheduler()

def create_app():
    app = Flask(__name__, template_folder="frontend/build", static_folder="frontend/build/static")
    app.config.from_object(Config)

    # Session configuration
    # Session & Cookie Configuration
    app.config.update(
        SESSION_COOKIE_SECURE=False,       # True in production (HTTPS only)
        SESSION_COOKIE_HTTPONLY=True,      # Prevent JavaScript access
        SESSION_COOKIE_SAMESITE='None',     # 'None' if using HTTPS + CORS
        SESSION_COOKIE_DOMAIN=None,        # Explicitly set to None (default)
    )

    origins = [
        "http://localhost:3000",
        # "https://localhost:3000",
        "http://127.0.0.1:5000",
        "http://127.0.0.1:3000",
        # "https://127.0.0.1:5000"
    ]
    CORS(
        app,
        resources={r"/*": {"origins": origins}}, 
        supports_credentials=True
    )
    # CORS Configuration (REQUIRED for React-Flask communication)
    # CORS(
    #     app,
    #     resources={
    #         r"/*": {
    #             "origins": "http://localhost:3000",
    #             "supports_credentials": True,  # Required for cookies/session
    #         }
    #     },
    #     expose_headers=["Set-Cookie"],
    # )
    # # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    login_manager.session_protection = "strong"
    migrate = Migrate(app, db)
    scheduler.init_app(app)
    scheduler.start()

    # ... rest of your existing code ...

    # Import models and functions inside app context
    with app.app_context():
        from app.models.user import User
        from app.models.leaderboard import Leaderboard
        from app.models.bhavcopy import BhavCopy
        from app.tasks import update_leaderboard 

        # Add the scheduled job
        scheduler.add_job(
            id="update_leaderboard",
            func=update_leaderboard,
            args=[app],
            trigger="interval",
            seconds=5
        )

    # Register Blueprints
    from app.routes import register_blueprints
    register_blueprints(app)

    # Flask-Login Configuration
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    login_manager.login_view = "auth.signup"
    login_manager.login_message_category = "info"
    
    print(app.url_map)  # This will show all registered routes


    # Serve React Frontend
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_react(path):
        """
        Serves the React frontend for all routes except API requests.
        """
        if path != "" and os.path.exists(f"frontend/build/{path}"):
            return send_from_directory("frontend/build", path)
        return send_from_directory("frontend/build", "index.html")
    
    return app