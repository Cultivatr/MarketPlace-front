import unittest
import sql
import os


class TestSql(unittest.TestCase):

    def test_hello(self):
        self.assertEqual('hello world from SQL', sql.hello())

    def test_get_connect_string(self):
        self.assertEqual(sql.default_connect, sql.get_connect_string())
        os.environ[sql.db_env] = "1"
        self.assertEqual(os.environ[sql.db_env], sql.get_connect_string())
        del os.environ[sql.db_env]

    def test_users(self):
        sql.create_table_users()
        sql.add_user("Joe", "Bob", "test@gmail.com")
        sql.add_user("Jim", "Greg", "test2@gmail.com")
        users=sql.get_users()
        self.assertEqual(2, len(users))
        self.assertEqual("Joe", users[0].first_name)
        self.assertEqual("test2@gmail.com", users[1].email)
        sql.delete_table_users()

    # def test_get_user(self):
        # self.assertEqual({'first_name': "Joe"}, sql.get_user({1}))
