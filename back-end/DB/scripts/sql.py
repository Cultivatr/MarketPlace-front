import psycopg2
import psycopg2.extras
import os
import sys
import traceback


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
  User_comments TEXT
);
"""


def init_users():
    r = sql_util(create_users, [])


insert_users_string = """
insert into users (
First_name, 
Last_name, 
Email,
) 
values(%s,%s,%s)
  """


# insert_statement = "Insert into users("
#   for key in user_dict:
#       insert_statement += key + ","
#     insert_statement = insert_statement[:-3]
#     insert_statement += ")values("
#        for key in user_dict:
#             insert_statement += "'" + user_dict[key] + "',"
#         insert_statement = [:-3]
#         insert_statement += ");"


# def add_user(user_dict):
#     conn = psycopg2.connect(get_connect_string())
#     cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

#     cur.execute(insert_statement)
#     user_dict = cur.fetchall()

#     cur.close()
#     conn.close()

#     return user_dict


def add_user(
    First_name,
    Last_name,
    Email
):
    """
    insert a single user into the users table.
    """
    a = sql_util(insert_users_string, [First_name, Last_name, Email])
    print('aaa', a)
    return a


# def delete_user(user_id):
#     conn = psycopg2.connect(get_connect_string())
#     cur = conn.cursor()

#     cur.execute(f"DELETE FROM users WHERE id={user_id};")
#     conn.commit()

#     cur.close()
#     conn.close()

# def get_all_users():
#     conn = psycopg2.connect(get_connect_string())
#     cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
#     cur.execute(f"SELECT * FROM users;")
#     users_dict = cur.fetchall()

#     cur.close()
#     conn.close()

#     return users_dict


# def get_user(user_id):
#     conn = psycopg2.connect(get_connect_string())
#     cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
#     cur.execute(f"SELECT * FROM users WHERE id={user_id};")
#     user_dict = cur.fetchall()

#     cur.close()
#     conn.close()

#     return user_dict


# def update_user(user_dict, user_id):
#     pass


def sql_util(sql, parm):
    """ 
    Run general maintaince statements.
    """
    res = []
    try:
        conn = psycopg2.connect(get_connect_string(), sslmode='require')
        cur = conn.cursor()
        res = cur.execute(sql, parm)
        print('wtf is ', parm)
        # This may return the id of an inserted row
        # for r in cur:
        # 	results.append(r)
        conn.commit()
        print('lemi', get_connect_string(), res)

    except:
        print('***We had a problem Huston...', sys.exc_info())
        traceback.print_exception(sys.exc_info()[0], sys.exc_info()[
                                  1], sys.exc_info()[2])
        raise
    finally:
        cur.close()
        conn.close()

    print('end of sql')

    print('hey hey', res)
    return res

# delete_user(1)

# init_users()
# print(get_user(2))
# for user in get_all_users():
#     for key in user:
#         print(f"{key}:{user[key]}")
#     print("###########ANOTHER USER################")


# new_user = {
#     "First_name": "Henry",
#     "Last_name": "Ford",
#     "Primary_phone": '123-567-89-89',
#     "Secondary_phone": '587-908-78-65',
#     "Email": "ford@anything.com",
#     "Farm_name": "Ford Farm"
# }
