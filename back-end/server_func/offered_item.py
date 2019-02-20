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


def add_offered_item_by_user_id(user_id,
                                product_id,
                                Quantity,
                                Price_paid,
                                Est_birthdate,
                                Registration_number,
                                RFID_tag,
                                Breed,
                                Single_brand,
                                Starting_date_of_feed,
                                Type_of_feed,
                                Est_completion_date,
                                Starting_weight,
                                Est_finished_weight,
                                Hanging_weight,
                                Est_price_to_be_paid,
                                Date_planted,
                                Seed_type,
                                Heirloom,
                                GMO,
                                Fertilizer_type_used,
                                Pesticide_type_used,
                                Estimated_qty_planted,
                                Estimated_finished_qty,
                                Qty_accepted_for_listing,
                                Qty_accepted_at_delivery,
                                Chargebacks,
                                Delivered_date,
                                Delivered_to):

    conn = psycopg2.connect("dbname=cultivatr")
    cur = conn.cursor()

    insert_query = f"""INSERT INTO offered_item (
                            user_id,
                            product_id,
                            Quantity,
                            Price_paid,
                            Est_birthdate,
                            Registration_number,
                            RFID_tag,
                            Breed,
                            Single_brand,
                            Starting_date_of_feed,
                            Type_of_feed,
                            Est_completion_date,
                            Starting_weight,
                            Est_finished_weight,
                            Hanging_weight,
                            Est_price_to_be_paid,
                            Date_planted,
                            Seed_type,
                            Heirloom,
                            GMO,
                            Fertilizer_type_used,
                            Pesticide_type_used,
                            Estimated_qty_planted,
                            Estimated_finished_qty,
                            Qty_accepted_for_listing,
                            Qty_accepted_at_delivery,
                            Chargebacks,
                            Delivered_date,
                            Delivered_to)
                    VALUES(
                            {user_id},
                            {product_id},
                            {Quantity},
                            {Price_paid},
                            {Est_birthdate},
                            {Registration_number},
                            {RFID_tag},
                            {Breed},
                            {Single_brand},
                            {Starting_date_of_feed},
                            {Type_of_feed},
                            {Est_completion_date},
                            {Starting_weight},
                            {Est_finished_weight},
                            {Hanging_weight},
                            {Est_price_to_be_paid},
                            {Date_planted},
                            {Seed_type},
                            {Heirloom},
                            {GMO},
                            {Fertilizer_type_used},
                            {Pesticide_type_used},
                            {Estimated_qty_planted},
                            {Estimated_finished_qty},
                            {Qty_accepted_for_listing},
                            {Qty_accepted_at_delivery},
                            {Chargebacks},
                            {Delivered_date},
                            {Delivered_to})"""

    cur.execute(insert_query)
    conn.commit()
    cur.close()
    conn.close()
