from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import server_func
import simplejson as json

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret'

@app.route("/all_items")
def all_items():

    items = server_func.get_all_offered_items_by_user_id()
    #json.dumps is used to fix previous serialize error,
    #it converts date and decimal to string
    dump = json.dumps(items,  indent=0, default=str)
    return jsonify(dump)

if __name__ == '__main__':
    app.run(debug=True)
