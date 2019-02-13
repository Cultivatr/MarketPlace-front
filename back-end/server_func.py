
class Items:
    def __init__(self, id):
        self.id = id

def get_all_offered_items_by_user_id():
    import psycopg2
    #import psycopg2 is here to fix error'no module name psycopg2' when running test
    conn = psycopg2.connect("dbname=cultivatr")
    cur = conn.cursor()

    cur.execute('SELECT * FROM offered_item;')

    offered_item_array = cur.fetchall()

    offered_item_obj_array = []
    for items in offered_item_array:
        newItem = Items(items)
        offered_item_obj_array.append(newItem.__dict__)

    cur.close()
    conn.close()

    return offered_item_obj_array
