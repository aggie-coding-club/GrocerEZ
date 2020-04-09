"""
Forms the API layer that relays information between the databse, scraper, and frontend
"""
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    """
    Homepage for the API
    """
    return 'Welcome to the GrocerEZ API!'
