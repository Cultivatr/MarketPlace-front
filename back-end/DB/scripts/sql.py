import psycopg2
import psycopg2.extras
import os
import sys
import traceback
from . import user
from . import offered_item

# STRINGS FOR CREATING THE ENVIRONMENT
default_connect = """
dbname=cultivatr user=evolveu
"""
db_env = 'DATABASE_URL'

# STRINGS FOR USERS TABLE
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
INSERT INTO Users (
First_name,
Last_name,
Primary_phone,
Secondary_phone,
Email,
Farm_name,
Farm_location,
Area,
Is_producer,
Is_admin,
Is_other,
Member_since,
Farm_type,
Rating,
Mailing_street,
Mailing_city,
Mailing_province,
Mailing_country,
Mailing_postal_code,
Billing_street,
Billing_city,
Billing_province,
Billing_country,
Billing_postal_code,
User_comments
) 
VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
  """

update_users_string = """
UPDATE Users
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
DROP TABLE Users;
  """

get_all_users_string = """
SELECT * FROM Users;
"""

get_user_by_id_string = """
SELECT * FROM Users WHERE ID = %s;
"""

# STRINGS FOR OFFERED ITEMS TABLE
create_table_offered_items_string = """
DROP TABLE IF EXISTS Offered_items CASCADE;

CREATE TABLE Offered_items (
Id SERIAL PRIMARY KEY,
Users_id INT REFERENCES Users ON DELETE RESTRICT,
Product_name TEXT,
Quantity INT,
Price_paid NUMERIC,
Est_birthdate DATE,
Registration_number INT,
RFID_tag INT,
Breed TEXT,
Single_brand BOOLEAN,
Starting_date_of_feed DATE,
Type_of_feed TEXT,
Est_completion_date DATE,
Starting_weight NUMERIC,
Est_finished_weight NUMERIC,
Hanging_weight NUMERIC,
Est_price_to_be_paid NUMERIC,
Date_planted DATE,
Seed_type TEXT,
Heirloom BOOLEAN,
GMO BOOLEAN,
Fertilizer_type_used TEXT,
Pesticide_type_used TEXT,
Estimated_qty_planted NUMERIC,
Estimated_finished_qty NUMERIC,
Qty_accepted_for_listing NUMERIC,
Qty_accepted_at_delivery NUMERIC,
Chargebacks NUMERIC,
Delivered_date DATE,
Delivered_to TEXT,
Status TEXT
);
"""

drop_offered_items_string = """
DROP TABLE Offered_items;
"""

add_offered_item_string = """
INSERT INTO Offered_items (
Users_id,
Product_name,
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
Delivered_to,
Status
)
VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
"""

get_offered_items_by_id_string = """
SELECT * FROM Offered_items WHERE Users_id = %s;
"""

get_offered_items_detail_by_id_string="""
SELECT * FROM Offered_items WHERE ID = %s;
"""

get_all_offered_items_string="""
SELECT * FROM Offered_items
"""

update_offered_items_details_string="""
UPDATE Offered_items
SET
Users_id = %s,
Product_name = %s,
Quantity = %s,
Price_paid = %s,
Est_birthdate = %s,
Registration_number = %s,
RFID_tag = %s,
Breed = %s,
Single_brand = %s,
Starting_date_of_feed = %s,
Type_of_feed = %s,
Est_completion_date = %s,
Starting_weight = %s,
Est_finished_weight = %s,
Hanging_weight = %s,
Est_price_to_be_paid = %s,
Date_planted = %s,
Seed_type = %s,
Heirloom = %s,
GMO = %s,
Fertilizer_type_used = %s,
Pesticide_type_used = %s,
Estimated_qty_planted = %s,
Estimated_finished_qty = %s,
Qty_accepted_for_listing = %s,
Qty_accepted_at_delivery = %s,
Chargebacks = %s,
Delivered_date = %s,
Delivered_to = %s,
Status = %s
WHERE ID = %s;
"""

def hello():
    return 'hello world from SQL'

def get_connect_string():
    return os.environ.get(db_env, default_connect)

# FUNCTION FOR USERS
def add_user(first_name, last_name, p_number, s_number, email, f_name, f_location, area, is_producer, is_admin, is_other, member_since, f_type, rating, m_street, m_city, m_province, m_country, m_postal_code, b_street, b_city, b_province, b_country, b_postal_code, comments):
    """
    insert a single user into the users table.
    """
    a = sql_util(insert_users_string, [first_name, last_name, p_number, s_number, email, f_name, f_location, area, is_producer, is_admin, is_other, member_since, f_type, rating, m_street, m_city, m_province, m_country, m_postal_code, b_street, b_city, b_province, b_country, b_postal_code, comments])
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

def update_user(first_name, last_name, p_number, s_number, email, f_name, f_location, area, is_producer, is_admin, is_other, member_since, f_type, rating, m_street, m_city, m_province, m_country, m_postal_code, b_street, b_city, b_province, b_country, b_postal_code, comments, userID):
    """
    update a user by id
    """
    sql_results = sql_util(update_users_string, [first_name, last_name, p_number, s_number, email, f_name, f_location, area, is_producer, is_admin, is_other, member_since, f_type, rating, m_street, m_city, m_province, m_country, m_postal_code, b_street, b_city, b_province, b_country, b_postal_code, comments, userID])
    if sql_results:
      r = sql_results[0]
      return user.User(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15], r[16], r[17], r[18], r[19], r[20], r[21], r[22], r[23], r[24], r[25])
    return None

# FUNCTIONS FOR OFFERED ITEMS
def add_item_by_user_id(users_id,product_name,Quantity,Price_paid,Est_birthdate,Registration_number,RFID_tag,Breed,Single_brand,Starting_date_of_feed,Type_of_feed,Est_completion_date,Starting_weight,Est_finished_weight,Hanging_weight,Est_price_to_be_paid,Date_planted,Seed_type,Heirloom,GMO,Fertilizer_type_used,Pesticide_type_used,Estimated_qty_planted,Estimated_finished_qty,Qty_accepted_for_listing,Qty_accepted_at_delivery,Chargebacks,Delivered_date,Delivered_to,Status):
    """
    add a item by the user id
    """
    sql_results = sql_util(add_offered_item_string, [users_id,product_name,Quantity,Price_paid,Est_birthdate,Registration_number,RFID_tag,Breed,Single_brand,Starting_date_of_feed,Type_of_feed,Est_completion_date,Starting_weight,Est_finished_weight,Hanging_weight,Est_price_to_be_paid,Date_planted,Seed_type,Heirloom,GMO,Fertilizer_type_used,Pesticide_type_used,Estimated_qty_planted,Estimated_finished_qty,Qty_accepted_for_listing,Qty_accepted_at_delivery,Chargebacks,Delivered_date,Delivered_to,Status])
    return sql_results

def get_offered_items_by_id(userID):
    """
    get a offered items by id
    """
    sql_results = select(get_offered_items_by_id_string, [userID])
    res=[]
    for r in sql_results:
      res.append(offered_item.Offered_item(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15], r[16], r[17], r[18], r[19], r[20], r[21], r[22], r[23], r[24], r[25], r[26], r[27], r[28], r[29], r[30]))
    return res

def get_offered_items_details_by_id(itemID):
    """
    get a offered item by offered item id
    """
    sql_results = select(get_offered_items_detail_by_id_string, [itemID])
    if sql_results:
      r = sql_results[0]
      return offered_item.Offered_item(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15], r[16], r[17], r[18], r[19], r[20], r[21], r[22], r[23], r[24], r[25], r[26], r[27], r[28], r[29], r[30])
    return None

def get_all_offered_items():
    """
    get all offered items available
    """
    sql_results = select(get_all_offered_items_string, None)
    res = []
    for r in sql_results:
      res.append(offered_item.Offered_item(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15], r[16], r[17], r[18], r[19], r[20], r[21], r[22], r[23], r[24], r[25], r[26], r[27], r[28], r[29], r[30]))
    return res

def update_offered_items_detail(Users_id,Product_name,Quantity,Price_paid,Est_birthdate,Registration_number,RFID_tag,Breed,Single_brand,Starting_date_of_feed,Type_of_feed,Est_completion_date,Starting_weight,Est_finished_weight,Hanging_weight,Est_price_to_be_paid,Date_planted,Seed_type,Heirloom,GMO,Fertilizer_type_used,Pesticide_type_used,Estimated_qty_planted,Estimated_finished_qty,Qty_accepted_for_listing,Qty_accepted_at_delivery,Chargebacks,Delivered_date,Delivered_to,Status, ItemID):
    """
    updating the details for offered items
    """
    sql_results = sql_util(update_offered_items_details_string, [Users_id,Product_name,Quantity,Price_paid,Est_birthdate,Registration_number,RFID_tag,Breed,Single_brand,Starting_date_of_feed,Type_of_feed,Est_completion_date,Starting_weight,Est_finished_weight,Hanging_weight,Est_price_to_be_paid,Date_planted,Seed_type,Heirloom,GMO,Fertilizer_type_used,Pesticide_type_used,Estimated_qty_planted,Estimated_finished_qty,Qty_accepted_for_listing,Qty_accepted_at_delivery,Chargebacks,Delivered_date,Delivered_to,Status, ItemID])
    if sql_results:
      r = sql_results[0]
      return offered_item.Offered_item(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15], r[16], r[17], r[18], r[19], r[20], r[21], r[22], r[23], r[24], r[25], r[26], r[27], r[28], r[29], r[30])
    return None

# HELPER FUNCTIONS
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

# CREATE AND DELETE TABLES
def create_table_offered_items():
  """
  creating table offered items
  """
  a = sql_util(create_table_offered_items_string, [])
  return a

def delete_table_offered_items():
  """
  deleting the table users
  """
  a = sql_util(drop_offered_items_string, [])
  return a
    
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
