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


# from apscheduler.schedulers.background import BackgroundScheduler
# from apscheduler.triggers.interval import IntervalTrigger
# from flask import current_app
# from .nse import fetch_bhavcopy
# from .tasks import update_leaderboard  # Import leaderboard update function

# def start_scheduler(app):
#     scheduler = BackgroundScheduler()

#     # Wrap fetch_bhavcopy in app context
#     def run_fetch_bhavcopy():
#         with app.app_context():
#             fetch_bhavcopy()

#     # Wrap update_leaderboard in app context
#     def run_update_leaderboard():
#         with app.app_context():
#             update_leaderboard()

#     # Run fetch_bhavcopy every 10 seconds
#     scheduler.add_job(
#         run_fetch_bhavcopy,
#         trigger=IntervalTrigger(seconds=10),
#         replace_existing=True
#     )

#     # Run update_leaderboard every 10 seconds
#     scheduler.add_job(
#         run_update_leaderboard,
#         trigger=IntervalTrigger(seconds=10),
#         replace_existing=True
#     )

#     scheduler.start()
