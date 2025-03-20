from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify
from flask_login import login_user, logout_user, login_required
from app import db
from app.models.user import User
from app.forms.auth_forms import SignupForm, LoginForm

auth = Blueprint("auth", __name__)

@auth.route("/api/test")
def test_api():
    return jsonify({"message": "Hello from Flask!"})


@auth.route("/signup", methods=["GET", "POST"])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        existing_email = User.query.filter_by(email=form.email.data).first()
        existing_username = User.query.filter_by(username=form.username.data).first()

        # Check if email or username already exists
        if existing_email:
            flash("Email already exists. Please log in.", "danger")
            return redirect(url_for("auth.signup"))

        if existing_username:
            flash("Username already taken. Please choose another.", "danger")
            return redirect(url_for("auth.signup"))

        # Check if passwords match
        if form.password.data != form.confirm_password.data:
            flash("Passwords do not match. Please try again.", "danger")
            return redirect(url_for("auth.signup"))

        # Create new user
        new_user = User(username=form.username.data, email=form.email.data)
        new_user.set_password(form.password.data)

        try:
            db.session.add(new_user)
            db.session.commit()
            flash("Account created successfully!", "success")
            return redirect(url_for("auth.login"))
        except Exception as e:
            db.session.rollback()
            flash(f"Error: {str(e)}", "danger")

    return render_template("signup.html", form=form)


@auth.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()

        if user and user.check_password(form.password.data):
            login_user(user)
            flash("Logged in successfully!", "success")
            return redirect(url_for("auth.dashboard"))  # Change this if needed
        else:
            flash("Invalid email or password", "danger")

    return render_template("login.html", form=form)


@auth.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "success")
    return redirect(url_for("auth.login"))


@auth.route("/dashboard")
@login_required
def dashboard():
    return "Welcome to your dashboard!"


# ======= REAL-TIME VALIDATION ROUTES ======= #

@auth.route("/check_username")
def check_username():
    """AJAX route to check username availability."""
    username = request.args.get("username")
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"message": "Username is taken ❌", "color": "red"})
    return jsonify({"message": "Username is available ✅", "color": "green"})


@auth.route("/check_email")
def check_email():
    """AJAX route to check email availability."""
    email = request.args.get("email")
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email already registered ❌", "color": "red"})
    return jsonify({"message": "Email is available ✅", "color": "green"})
