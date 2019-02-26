import psycopg2
import psycopg2.extras
import os
import sys
import traceback
import user

default_connect = """
dbname=cultivatr user=evolveu
"""
db_env = 'DATABASE_URL'

create_table_users_string = """
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

insert_users_string = """
insert into users (
first_name, 
last_name, 
email
) 
values(%s,%s,%s)
  """

drop_users_string = """
DROP TABLE users;
  """

get_user_by_id_string = """
SELECT * FROM users;
"""

def hello():
    return 'hello world from SQL'

def get_connect_string():
    return os.environ.get(db_env, default_connect)
    # return os.environ.get('DATABASE_URL', 'xxx')

def init_users():
    r = sql_util(create_table_users_string, [])

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
    return a

def get_users():
    """
    get a user by id
    """
    sql_results = select(get_user_by_id_string, None)
    res = []
    for r in sql_results:
      res.append(user.User(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15], r[16], r[17], r[18], r[19], r[20], r[21], r[22], r[23], r[24], r[25]))
    return res

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
def select(sql, parms):
    """
    Execute standard sql statements.
    """
    results = []
    try:
        conn = psycopg2.connect(get_connect_string(), sslmode='require')
        cur = conn.cursor()
        res = cur.execute(sql, parms)
        for r in cur:
            results.append(r)

    except:
        print('***We had a problem Huston...', sys.exc_info())
        traceback.print_exception(sys.exc_info()[0],sys.exc_info()[1],sys.exc_info()[2])
        raise
    finally:
        cur.close()
        conn.close()

    return results

def sql_util(sql, parm):
    """ 
    Run general maintaince statements.
    """
    res = []
    try:
        conn = psycopg2.connect(get_connect_string(), sslmode='require')
        cur = conn.cursor()
        res = cur.execute(sql, parm)
        # This may return the id of an inserted row
        # for r in cur:
        # 	results.append(r)
        conn.commit()
    except:
        print('***We had a problem Huston...', sys.exc_info())
        traceback.print_exception(sys.exc_info()[0], sys.exc_info()[
                                  1], sys.exc_info()[2])
        raise
    finally:
        cur.close()
        conn.close()
    return res
    
def create_table_users():
  """
  creating table users
  """
  a = sql_util(create_table_users_string,[])
  return a

def delete_table_users():
  """
  deleting the table users
  """
  a = sql_util(drop_users_string, [])
  return a

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
