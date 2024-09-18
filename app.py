from flask import Flask, render_template, jsonify
from flask_caching import Cache
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Configure caching
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

# Load configuration from environment variables
app.config['DEBUG'] = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')

@app.route('/')
@cache.cached(timeout=300)  # Cache for 5 minutes
def home():
    return render_template('index.html')

@app.route('/api/features')
@cache.cached(timeout=3600)  # Cache for 1 hour
def get_features():
    features = [
        {"name": "Instant responses", "description": "Get answers in seconds"},
        {"name": "Multilingual support", "description": "Communicate in multiple languages"},
        {"name": "Privacy-focused", "description": "Your data stays private"},
        {"name": "Continuous learning", "description": "Always improving and updating"}
    ]
    return jsonify(features)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 8000)))