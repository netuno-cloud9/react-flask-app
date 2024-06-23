from flask import Flask, jsonify, request, session, send_from_directory, redirect, url_for
from flask_mysqldb import MySQL
from flask_cors import CORS
import os
import secrets  # For generating secure secret key
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app)  # Enable CORS for all domains on all routes

# Configure MySQL connection using environment variables
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'  # Return query results as dictionaries
mysql = MySQL(app)

# Secret key for session management (replace with a secure secret key)
app.secret_key = secrets.token_hex(16)  # Generate a secure random secret key

# API endpoint example
@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM data")
        data = cursor.fetchall()
        cursor.close()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': f'Database error: {str(e)}'}), 500

# Login route - serves login page and handles login POST request
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
            user = cursor.fetchone()

            if user:
                session['logged_in'] = True
                session['username'] = username
                session['name'] = user['name']  # Assuming 'name' is a column in your 'users' table
                return jsonify({'message': 'Login successful', 'username': username, 'name': user['name']}), 200
            else:
                return jsonify({'error': 'Invalid username or password'}), 401

        except Exception as e:
            return jsonify({'error': f'Database error: {str(e)}'}), 500

        finally:
            cursor.close()

    return jsonify({'error': 'Method not allowed'}), 405

# Logout route
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    session.pop('name', None)
    return redirect(url_for('login'))  # Redirect to login page

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

if __name__ == '__main__':
    app.run(debug=True)
