from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from flask import current_app
from .nse import fetch_bhavcopy

def start_scheduler(app):
    scheduler = BackgroundScheduler()

    # Wrap fetch_bhavcopy in app context
    def run_fetch_bhavcopy():
        with app.app_context():
            fetch_bhavcopy()

    scheduler.add_job(
        run_fetch_bhavcopy,
        trigger=CronTrigger(hour=0, minute=18),
        replace_existing=True
    )

    scheduler.start()


