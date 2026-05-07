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
        "price": book.get("price",0)
    }

@app.route('/')
def home():
  return "API is running"

if __name__ == '__main__':
   app.run(host="127.0.0.1",port=5000,debug=True)

@app.route('/search', methods=['GET'])
def search_books():
    name = request.args.get("name", "")
    
    if name == "":
        books= db_books.find()
    else:
        books=db_books.find({"$text": {"$search": name}})
    
    final_items=[serialize_book(b) for b in books]
    final_items=sorted(final_items, key=lambda x: x["name"], reverse=True)
    
    return jsonify(final_items)
  

@app.route('/like/<string:book_id', methods=['POST'])
def increase_like(book_id):
    
    try:
        filter={"_id": ObjectId(book_id)}
        newvalues={"$inc": {"likes": 1}}

        result=db_books.update_one(
            filter,newvalues
        )
        if result.matched_count==0:
            return jsonify({"error": "Missing id"}), 400
        
        return jsonify({"message": "Like added"})
    
    except Exception:
        return jsonify({"error": "Invalid ID"}), 400
            
@app.route('/popular', methods=['GET'])
def get_popular():

    books=db_books.find().sort("likes",-1).limit(5)
    popular_books=[serialize_book(b) for b in books]
    
    return jsonify(popular_books)
