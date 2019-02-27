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

update_users_string = """
UPDATE users
SET
First_name = %s,
Last_name = %s,
Primary_phone = %s,
Secondary_phone = %s,
Email = %s,
Farm_name = %s,
Farm_location = %s,
Area = %s,
Is_producer = %s,
Is_admin = %s,
Is_other = %s,
Member_since = %s,
Farm_type = %s,
Rating = %s,
Mailing_street = %s,
Mailing_city = %s,
Mailing_province = %s,
Mailing_country = %s,
Mailing_postal_code = %s,
Billing_street = %s,
Billing_city = %s,
Billing_province = %s,
Billing_country = %s,
Billing_postal_code = %s,
User_comments = %s
WHERE ID = %s;
"""

drop_users_string = """
DROP TABLE users;
  """

get_all_users_string = """
SELECT * FROM users;
"""

get_user_by_id_string = """
SELECT * FROM users where id = %s;
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
    get all users
    """
    sql_results = select(get_all_users_string, None)
    res = []
    for r in sql_results:
      res.append(user.User(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15], r[16], r[17], r[18], r[19], r[20], r[21], r[22], r[23], r[24], r[25]))
    return res

def get_user(userID):
    """
    get a user by id
    """
    sql_results = select(get_user_by_id_string, [userID])
    if sql_results:
      r = sql_results[0]
      return user.User(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15], r[16], r[17], r[18], r[19], r[20], r[21], r[22], r[23], r[24], r[25])
    return None

# def delete_user(userID):
#     """
#     delete a user by id
#     """
#     return 0

def update_user(first_name, last_name, p_number, s_number, email, f_name, f_location, area, is_producer, is_admin, is_other, member_since, f_type, rating, m_street, m_city, m_province, m_country, m_postal_code, b_street, b_city, b_province, b_country, b_postal_code, comments, userID):
    """
    update a user by id
    """
    sql_results = sql_util(update_users_string, [first_name, last_name, p_number, s_number, email, f_name, f_location, area, is_producer, is_admin, is_other, member_since, f_type, rating, m_street, m_city, m_province, m_country, m_postal_code, b_street, b_city, b_province, b_country, b_postal_code, comments, userID])
    if sql_results:
      r = sql_results[0]
      return user.User(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15], r[16], r[17], r[18], r[19], r[20], r[21], r[22], r[23], r[24], r[25])
    return None

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
