import os
import urllib.parse
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")

    # Fetch credentials from .env
    DB_USERNAME = os.getenv("DB_USER", "root")
    DB_PASSWORD = urllib.parse.quote_plus(os.getenv("DB_PASS", ""))  # Encode password
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_NAME = os.getenv("DB_NAME", "tradeverse")
    DB_PORT = os.getenv("DB_PORT", "3306")

    print("db user=", DB_USERNAME)

    # Properly formatted database URI
    # SQLALCHEMY_DATABASE_URI = (
    #     f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    # )
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://user1:pw@localhost:3306/tradeverse"

    SQLALCHEMY_TRACK_MODIFICATIONS = False