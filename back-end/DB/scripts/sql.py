import psycopg2
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


get_connect_string()

# def init_users():
#     drop_users = """
#     DROP TABLE Users;
#     """
#     conn = psycopg2.connect("dbname=cultivatr")
#     cur = conn.cursor()
