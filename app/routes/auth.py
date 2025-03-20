from flask import Blueprint, jsonify, request
from flask_login import login_user, logout_user, login_required, current_user
from app import db
from app.models.user import User

auth = Blueprint("auth", __name__)

# --------------------------
#  SIGNUP ROUTE (POST)
# --------------------------
@auth.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()

    # Validate input
    if not all(key in data for key in ["username", "email", "password", "confirm_password"]):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if user already exists
    existing_email = User.query.filter_by(email=data["email"]).first()
    existing_username = User.query.filter_by(username=data["username"]).first()

    if existing_email:
        return jsonify({"error": "Email already exists"}), 400
    if existing_username:
        return jsonify({"error": "Username already taken"}), 400
    if data["password"] != data["confirm_password"]:
        return jsonify({"error": "Passwords do not match"}), 400

    # Create new user
    new_user = User(username=data["username"], email=data["email"])
    new_user.set_password(data["password"])

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Account created successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# --------------------------
#  LOGIN ROUTE (POST)
# --------------------------
@auth.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    # Validate input
    if "email" not in data or "password" not in data:
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if user and user.check_password(data["password"]):
        login_user(user)
        return jsonify({"message": "Logged in successfully!", "user": {"id": user.id, "username": user.username}}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


# --------------------------
# LOGOUT ROUTE (POST)
# --------------------------
@auth.route("/api/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "You have been logged out."}), 200


# --------------------------
#  DASHBOARD ROUTE (Protected)
# --------------------------
@auth.route("/api/dashboard", methods=["GET"])
@login_required
def dashboard():
    return jsonify({"message": f"Welcome to your dashboard, {current_user.username}!"})


# --------------------------
#  CHECK USERNAME AVAILABILITY (AJAX)
# --------------------------
@auth.route("/api/check_username", methods=["GET"])
def check_username():
    username = request.args.get("username")
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"message": "Username is taken ", "color": "red"})
    return jsonify({"message": "Username is available ", "color": "green"})


# --------------------------
# CHECK EMAIL AVAILABILITY (AJAX)
# --------------------------
@auth.route("/api/check_email", methods=["GET"])
def check_email():
    email = request.args.get("email")
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email already registered ", "color": "red"})
    return jsonify({"message": "Email is available ", "color": "green"})
