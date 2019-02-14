import psycopg2

class Items:
    def __init__(self, id):
        self.id = id

def get_all_offered_items_by_user_id(id):
    conn = psycopg2.connect("dbname=cultivatr")
    cur = conn.cursor()

    cur.execute(f'SELECT * FROM offered_item where user_id = {id};')

    offered_item_array = cur.fetchall()

    offered_item_obj_array = []
    for items in offered_item_array:
        newItem = Items(items)
        offered_item_obj_array.append(newItem.__dict__)

    cur.close()
    conn.close()

    return offered_item_obj_array
