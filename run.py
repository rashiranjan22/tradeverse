from flask import Flask
from app import create_app, db
from flask_migrate import Migrate
from app.routes.scheduler import start_scheduler

app = create_app()
migrate = Migrate(app, db)

if __name__ == "__main__":
    start_scheduler(app)
    app.run(debug=True)