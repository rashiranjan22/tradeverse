# Flask Application with Database Configuration  

## Project Setup  

This project is built with **Flask** and uses **Flask-Migrate** for database management.  


---

## Setting Up Environment Variables  

Create a `.env` file in the project root and add the following details:  

```
# .env
SECRET_KEY='your_secret_key_here'
DB_USERNAME='your_db_username'
DB_PASSWORD='your_db_password'
DB_HOST='your_db_host'
DB_NAME='your_db_name'

```
## Running the Project
### 1. Install Dependencies
```
pip install -r requirements.txt
```

### 2. Set Up the Database
```
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### 3. Start the Flask App
```
flask run
```


