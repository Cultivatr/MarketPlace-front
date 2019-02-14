import psycopg2

class Items:
    def __init__(self, id):
        self.id = id

def get_all_offered_items_by_user_id(id):
    conn = psycopg2.connect("dbname=cultivatr")
    cur = conn.cursor()

    cur.execute(f'SELECT * FROM offered_item where user_id = {id};')
    # select statement will need to be refactored
    # sql statement from node file is as follows:
    # `SELECT OFFERED_ITEM.*, STATUS_TRACKER.*, R_STATUS.STATUS_NAME \
	# FROM OFFERED_ITEM \
	# FULL JOIN STATUS_TRACKER \
	# ON OFFERED_ITEM.ID = STATUS_TRACKER.OFFER_ID \
	# INNER JOIN R_STATUS \
	# ON STATUS_TRACKER.STATUS_ID = R_STATUS.ID \
	# WHERE USER_ID = ${user_id} \
	# AND END_DATE IS NULL;
    # above is not for MVP but will be required to keep history of offered items and status

    offered_item_array = cur.fetchall()

    offered_item_obj_array = []
    for items in offered_item_array:
        newItem = Items(items)
        offered_item_obj_array.append(newItem.__dict__)

    cur.close()
    conn.close()

    return offered_item_obj_array

def add_offered_item_by_user_id(name, user_id, qty, est_birthday, registration_number,rfid_tag, breed, single_brand,\
            starting_date_of_feed, type_of_feed, est_completion_date, starting_weight, est_finished_weight, hanging_weight,\
            est_price_to_be_paid, date_planted, seed_type, heirloom, gmo, fertilizer_type_used, pesticide_type_used,\
            estimated_qty_planted, estimated_finished_qty, qty_accepted_for_listing, qty_accepted_at_delivery, chargebacks):
    conn = psycopg2.connect("dbname=cultivatr")
    cur = conn.cursor()

    cur.execute(f"INSERT INTO offered_item (name (select product_id from r_product), user_id, qty, est_birthday, registration_number,rfid_tag, breed, single_brand,\
            starting_date_of_feed, type_of_feed, est_completion_date, starting_weight, est_finished_weight, hanging_weight,\
            est_price_to_be_paid, date_planted, seed_type, heirloom, gmo, fertilizer_type_used, pesticide_type_used,\
            estimated_qty_planted, estimated_finished_qty, qty_accepted_for_listing, qty_accepted_at_delivery, chargebacks),\
            VALUES ('{name}','{user_id}','{qty}', '{est_birthday}', '{registration_number}', '{rfid_tag}', '{breed}',\
            '{single_brand}', '{starting_date_of_feed}', '{type_of_feed}', '{est_completion_date}', '{starting_weight}',\
            '{est_finished_weight}', '{hanging_weight}', '{est_price_to_be_paid}', '{date_planted}', '{seed_type}', '{heirloom}',\
            '{gmo}', '{fertilizer_type_used}', '{pesticide_type_used}', '{estimated_qty_planted}', '{estimated_finished_qty}',\
            '{qty_accepted_for_listing}', '{qty_accepted_at_delivery}', '{chargebacks}');")

    conn.commit()

    cur.close()
    conn.close()

