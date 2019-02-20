import psycopg2
import psycopg2.extras


def get_all_users():
    conn = psycopg2.connect("dbname=cultivatr")
    cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    cur.execute('SELECT * FROM users;')
    users_dict = cur.fetchall()

    cur.close()
    conn.close()

    return users_dict
