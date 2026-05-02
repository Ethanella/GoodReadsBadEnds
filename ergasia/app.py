from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import numpy as np 

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/wis_project"

mongo = PyMongo(app)

db_books = mongo.db.books

@app.route("/")
def home():
    return "API is running!"

if __name__ == "__main__":
    app.run(debug=True)


