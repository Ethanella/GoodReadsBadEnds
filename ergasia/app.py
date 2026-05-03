from flask import Flask,request,jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId
import numpy as np

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/wis_project"

mongo = PyMongo(app)

db_books = mongo.db.books
db_books.create_index([("name", "text")])

def serialize_book(book):
    return {
        "id": str(book["_id"]),
        "name": book.get("name"),
        "image": book.get("image"),
        "description": book.get("description"),
        "likes": book.get("likes",0),
        "price": book.get("price")
    }

@app.route('/')
def home():
  return "API is running"

if __name__ == '__main__':
   app.run(debug=True)

@app.route('/search', methods=['GET'])
def search_books():

    name = request.args.get('name', '')
    books=[]
    if name == "":
        books= db_books.find()
    else:
        books=db_books.find({"$text": {"$search":name}})
    
    final_items=[serialize_book(b) for b in books]
    final_items=sorted(final_items, key=lambda x: x["name"], reverse=True)
    
    return jsonify(final_items)
  

@app.route('/like', methods=['POST'])
def increase_like():

    book_id = request.get_json().get("id")
    
    if not book_id:
        return jsonify({"error": "Missing id"}), 400
    
    filter={"_id": ObjectId(book_id)}
    newvalues={"$inc": {"likes": 1}}

    db_books.update_one(
        filter,newvalues
    )
            
@app.route('/popular', methods=['GET'])
def get_popular():

    books=db_books.find().sort("likes",-1).limit(5)
    popular_books=[serialize_book(b) for b in books]
    
    return jsonify(popular_books)
