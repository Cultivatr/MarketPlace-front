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
        # self.assertEqual('hey hey', sql.init_users())
        sql.init_users()
