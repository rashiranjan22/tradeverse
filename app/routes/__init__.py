from flask import Blueprint

# Import all route Blueprints
from app.routes.auth import auth
from app.routes.nse import nse_bp
from app.routes.leaderboard import leaderboard_bp
from app.routes.buysell import buysell

def register_blueprints(app):
    """Registers all Blueprint routes."""
    app.register_blueprint(auth, url_prefix="/auth")  # Set URL prefix
    app.register_blueprint(nse_bp, url_prefix="/nse")
    app.register_blueprint(leaderboard_bp, url_prefix="/leaderboard")
    app.register_blueprint(buysell, url_prefix="/buysell")
