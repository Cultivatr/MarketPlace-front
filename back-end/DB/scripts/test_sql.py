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
        # sql.init_users()
        #     self.assertEqual('hey hey', sql.init_users())

        # def test_add_user(self):
        # new_user = {
        #     "first_name": "Henry",
        #     "last_name": "Ford",
        #     "primary_phone": '123-567-89-89',
        #     "secondary_phone": '587-908-78-65',
        #     "email": "ford@anything.com",
        #     "farm_name": "Ford Farm"
        # }
        sql.add_user("Joe", "Bob", "test@gmail.com")
        print('hey', )
        # temp_user = {}
        # temp_user.__dict__ = new_user
        # print('new_user', temp_user.first_name)
        # sql.add_user(new_user)
    # def test_get_user(self):
        # self.assertEqual({'first_name': "Joe"}, sql.get_user({1}))
