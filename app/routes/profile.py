from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from app import db  
from app.models.user import User  

profile = Blueprint('profile', __name__)

def json_login_required(func):
    """Decorator to return JSON instead of redirecting to login"""
    def wrapper(*args, **kwargs):
        if not current_user.is_authenticated:
            return jsonify({"error": "Unauthorized"}), 401
        return func(*args, **kwargs)
    return wrapper

@profile.route("/api/user_profile", methods=["GET"])
# @json_login_required
@login_required
def get_user_profile():

    print("Fetching user profile...")  # Debugging
    print("Current User:", current_user)  # Ensure Flask recognizes the user
    return jsonify({
        "id": current_user.id,
        "email": current_user.email,
        "virtual_balance": current_user.balance
    })


@profile.route("/api/change_password", methods=["POST"])
@login_required
def change_password():
    """Allow user to change password"""
    data = request.json
    old_password = data.get("old_password")
    new_password = data.get("new_password")
    # Fix: Use password_hash instead of password
    if not current_user.check_password(old_password):  # Use the model's check_password method
        return jsonify({"error": "Incorrect old password"}), 400

    current_user.set_password(new_password)  # Use the model's set_password method
    db.session.commit()
    return jsonify({"message": "Password changed successfully"})

    # if not check_password_hash(current_user.password, old_password):
    #     return jsonify({"error": "Incorrect old password"}), 400

    # current_user.password = generate_password_hash(new_password)
    # db.session.commit()
    # return jsonify({"message": "Password changed successfully"})
