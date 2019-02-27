from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import server_func
import simplejson as json

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret'

@app.route("/admin", methods=['GET','POST'])
def add_new_user(''):
    data: request.get_json('')
    first_name: data.get('firstName')
    last_name: data.get('lastName')
    billing_street: data.get('billingAddressStreet')
    primary_phone: data.get('primaryNumber')
    secondary_phone: data.get('secondaryNumber')
    billing_city: data.get('billingAddressCity')
    billing_province: data.get('billingAddressProvince')
    email: data.get('email')
    billing_country: data.get('billingAddressCountry')
    billing_postal_code: data.get('billingAddressPostalCode')
    farm_name: data.get('farmName')
    farm_location: data.get('farmLocation')
    mailingAddressStreet: data.get('mailingAddressStreet')
    feedMethod: data.get('feedMethod')
    area: data.get('area')
    mailing_city: data.get('mailingAddressCity')
    mailing_province: data.get('mailingAddressProvince')
    rating: data.get('rating')
    mailing_country: data.get('mailingAddressCountry')
    mailing_postal_code: data.get('mailingAddressPostalCode')
    user_comments: data.get('comments')
    return jsonify()

@app.route("/all_items/<user_id>", methods=['GET'])
def all_items(user_id):

    items = server_func.get_all_offered_items_by_user_id(user_id)
    #json.dumps is used to fix previous serialize error,
    #it converts date and decimal to string
    # dump = json.dumps(items,  indent=0, default=str)
    return jsonify(items)

@app.route("/add_items/<user_id>", methods=['POST', 'GET'])
def add_items(user_id):
    data = request.get_json('')
    user_id = data.get('userId')
    name = data.get('type')
    qty = data.get('quantity')
    est_birthday = data.get('birthdate')
    registration_number = data.get('regNumber')
    rfid_tag = data.get('rfid')
    breed = data.get('breed')
    single_brand = data.get('')
    starting_date_of_feed = data.get('dateOnFeed')
    type_of_feed = data.get('typeOfFeed')
    est_completion_date = data.get('estCompletionData')
    starting_weight = data.get('estStartingWeight')
    est_finished_weight = data.get('estFinishedWeight')
    hanging_weight = data.get('hangingWeight')
    est_price_to_be_paid = data.get('estFinalPrice')

    date_planted = data.get('datePlanted')
    seed_type = data.get('seedType')
    heirloom = data.get('heirloom')
    gmo = data.get('gmo')
    fertilizer_type_used = data.get('fertilizerTypeUsed')
    pesticide_type_used = data.get('pesticideTypeUsed')
    estimated_qty_planted = data.get('estimatedQtyPlanted')
    estimated_finished_qty = data.get('estimatedFinishedQty')
    qty_accepted_for_listing = data.get('qtyAcceptedForListing')
    qty_accepted_at_delivery = data.get('qtyAcceptedAtDelivery')
    chargebacks = data.get('chargebacks')

    newItems = server_func.add_offered_item_by_user_id(name, user_id, qty, est_birthday, registration_number,rfid_tag, breed, single_brand,
        starting_date_of_feed, type_of_feed, est_completion_date, starting_weight, est_finished_weight, hanging_weight,
        est_price_to_be_paid, date_planted, seed_type, heirloom, gmo, fertilizer_type_used, pesticide_type_used,
        estimated_qty_planted, estimated_finished_qty, qty_accepted_for_listing, qty_accepted_at_delivery, chargebacks)

    return jsonify(newItems)


if __name__ == '__main__':
    app.run(debug=True)


