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


drop_users = """
DROP TABLE Users;
"""
create_users = """
CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    First_name TEXT,
    Last_name TEXT
);
"""


def init_users():
    d = sql_util(drop_users, [])

    r = sql_util(create_users, [])


def sql_util(sql, parms):

    results = []

    conn = psycopg2.connect(get_connect_string(), sslmode='require')
    cur = conn.cursor()
    res = cur.execute(sql, parms)

    conn.commit()

    cur.close()
    conn.close()
    return results
