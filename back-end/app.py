import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from flask_migrate import Migrate

app=Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']

db=SQLAlchemy(app)
migrate = Migrate(app, db)


CORS(app, supports_credentials=True)



@app.route('/')
def hello_world():
    return 'Hello, World!'





def test_print_function():
    return "hello my friend"


if __name__ == '__main__':
    app.debug = True
    app.run()
