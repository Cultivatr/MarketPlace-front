import psycopg2
import psycopg2.extras
import os


def hello():
    return 'hello world from SQL'


default_connect = """
dbname=cultivatr user=evolveu
"""
db_env = 'DATABASE_URL'


def get_connect_string():
    return os.environ.get(db_env, default_connect)
    # return os.environ.get('DATABASE_URL', 'xxx')


create_users = """
DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE Users (
  Id SERIAL PRIMARY KEY,
  First_name TEXT,
  Last_name TEXT,
  Primary_phone TEXT,
  Secondary_phone TEXT,
  Email TEXT,
  Farm_name TEXT,
  Farm_location TEXT,
  Area TEXT,
  Is_producer BOOLEAN,
  Is_admin BOOLEAN,
  Is_other BOOLEAN,
  Member_since DATE,
  Farm_type TEXT,
  Rating INT,
  Mailing_street TEXT,
  Mailing_city TEXT,
  Mailing_province TEXT,
  Mailing_country TEXT,
  Mailing_postal_code TEXT,
  Billing_street TEXT,
  Billing_city TEXT,
  Billing_province TEXT,
  Billing_country TEXT,
  Billing_postal_code TEXT,
  User_comments TEXT);
"""

def init_users():
    r = sql_util(create_users, [])

def add_user(new_user):

    pass

def delete_user(user_id):
    conn = psycopg2.connect(get_connect_string())
    cur = conn.cursor()

    cur.execute(f"DELETE FROM users WHERE id={user_id};")
    conn.commit()

    cur.close()
    conn.close()

def get_all_users():
    conn = psycopg2.connect(get_connect_string())
    cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    cur.execute(f"SELECT * FROM users;")
    users_dict = cur.fetchall()

    cur.close()
    conn.close()

    return users_dict

def get_user(user_id):
    conn = psycopg2.connect(get_connect_string())
    cur = conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor)
    cur.execute(f"SELECT * FROM users WHERE id={user_id};")
    users_dict = cur.fetchall()

    cur.close()
    conn.close()

    return users_dict

def update_user(user_dict, user_id):
    pass


def sql_util(sql, parms):

    # results = []

    conn = psycopg2.connect(get_connect_string(), sslmode='require')
    cur = conn.cursor()
    results = cur.execute(sql, parms)

    conn.commit()

    cur.close()
    conn.close()
    return results

delete_user(1)

#init_users()
print(get_user(2))
for user in get_all_users():
    for key in user:
        print(f"{key}:{user[key]}")
    print("###########ANOTHER USER################")


# new_user = {
# "First_name": "Henry"
# "Last_name": "Ford"
# "Primary_phone": 123-567-89-89
# "Secondary_phone": 587-908-78-65
# "Email": "ford@anything.com"
# "Farm_name": "Ford Farm"
# }
