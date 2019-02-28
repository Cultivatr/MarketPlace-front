from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import server_func
import simplejson as json
from DB.scripts import sql as sql
app = Flask(__name__)
CORS(app, supports_credentials=True)


app.config['SECRET_KEY'] = 'secret'

@app.route("/admin", methods=['GET','POST'])
def add_new_user():
    data = request.get_json()
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    p_number = data.get('primaryNumber')
    s_number = data.get('secondaryNumber')
    email = data.get('email')
    f_name = data.get('farmName')
    f_location = data.get('farmLocation')
    area = data.get('area')
    f_type = data.get('farmType')
    rating = data.get('rating')
    m_street = data.get('mailingAddressStreet')
    m_city = data.get('mailingAddressCity')
    m_province = data.get('mailingAddressProvince')
    m_country = data.get('mailingAddressCountry')
    m_postal_code = data.get('mailingAddressPostalCode')
    b_street = data.get('billingAddressStreet')
    b_city = data.get('billingAddressCity')
    b_province = data.get('billingAddressProvince')
    b_country = data.get('billingAddressCountry')
    b_postal_code = data.get('billingAddressPostalCode')
    comments = data.get('comments')
    
    query = sql.add_user(
        first_name,
        last_name,
        p_number,
        s_number,
        last_name,
        email,
        f_name,
        f_location,
        area,
        f_type,
        rating,
        m_street,
        m_city,
        m_province,
        m_country,
        m_postal_code,
        b_street,
        b_city,
        b_province,
        b_country,
        b_postal_code,
        comments
        )
    return jsonify(query);

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


