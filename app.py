from flask import Flask, jsonify, request, session, send_from_directory, redirect, url_for
from flask_mysqldb import MySQL
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app)  # Enable CORS for all domains on all routes

# Configure MySQL connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'BASH$634pcpv!!'
app.config['MYSQL_DB'] = 'edu_db'
mysql = MySQL(app)

# Secret key for session management (replace with a secure secret key)
app.secret_key = 'replace_with_secure_secret_key'

# API endpoint example
@app.route('/api/data', methods=['GET'])
def get_data():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM data")
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

# Login route - serves login page and handles login POST request
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        cursor = mysql.connection.cursor()
        try:
            cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
            user = cursor.fetchone()

            if user:
                session['logged_in'] = True
                session['username'] = username
                session['name'] = user[1]
                return jsonify({'message': 'Login successful', 'username': username, 'name': user[1]}), 200
            else:
                return jsonify({'error': 'Invalid username or password'}), 401

        except Exception as e:
            return jsonify({'error': f'Database error: {str(e)}'}), 500

        finally:
            cursor.close()

    return send_from_directory(os.path.join(app.static_folder), 'index.html')

# Logout route
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    session.pop('name', None)
    return redirect(url_for('login'))  # Redirect to login page

# Catch-all route to serve React frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if 'logged_in' in session or path.startswith('static/') or path.startswith('media/'):
        return send_from_directory(app.static_folder, 'index.html')
    else:
        return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
