from flask import Flask, jsonify, request, session, send_from_directory, redirect, url_for
from flask_cors import CORS
from flask_mysqldb import MySQL
import os
import secrets
from dotenv import load_dotenv
import logging

#load_dotenv()
# Configure logging
logging.basicConfig(level=logging.DEBUG)



app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app, supports_credentials=True)
#CORS(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'BASH$634pcpv!!'  # Replace with your actual MySQL password
app.config['MYSQL_DB'] = 'edu_db'
app.config['MYSQL_PORT'] = 3307  # Replace with your actual MySQL port if different
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'  # Return query results as dictionaries

# Configure MySQL connection using environment variables
#app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST', 'localhost')
#app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'root')
#app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', '')
#app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', 'edu_db')
#app.config['MYSQL_PORT'] = int(os.getenv('MYSQL_PORT', 3307))
#app.config['MYSQL_CURSORCLASS'] = 'DictCursor'  # Return query results as dictionaries

mysql = MySQL(app)

# Secret key for session management
app.secret_key = 'your_secret_key_for_session'

# Example API endpoint
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM data")
        data = cursor.fetchall()
        cursor.close()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': f'Database error: {str(e)}'}), 500

# Login route
@app.route('/login', methods=['POST'])
# Login route
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        cursor = None  # Initialize cursor outside the try block

        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
            user = cursor.fetchone()

            if user:
                session['logged_in'] = True
                session['username'] = username
                session['name'] = user.get('name', '')  # Adjust if 'name' field is present
                logging.info(f"User '{username}' logged in successfully.")
                return jsonify({'message': 'Login successful', 'username': username, 'name': session['name']}), 200
            else:
                logging.warning(f"Login failed for username '{username}'. Invalid username or password.")
                return jsonify({'error': 'Invalid username or password'}), 401

        except Exception as e:
            logging.error(f"Database error during login for username '{username}': {str(e)}")
            return jsonify({'error': f'Database error: {str(e)}'}), 500

        finally:
            if cursor:
                cursor.close()

    return jsonify({'error': 'Method not allowed'}), 405


# Logout route
# Logout route
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    session.pop('name', None)
    logging.info('User logged out successfully.')
    return jsonify({'message': 'Logout successful'}), 200

# Route to serve React frontend (catch-all route)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path.startswith('static/') or path.startswith('media/'):
        # Serve static files directly
        return send_from_directory(app.static_folder, path)
    else:
        # Serve React's index.html for all other paths
        return send_from_directory(app.static_folder, 'index.html')
    
@app.route('/testdb')
def test_db_connection():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        cursor.close()
        return jsonify({'message': 'MySQL connection successful'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to connect to MySQL: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True)
