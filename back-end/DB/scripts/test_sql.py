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
        sql.add_user("Joe", "Bob", "123-456-7890", "890-123-4567", "test@gmail.com", "jeff's farm", "calgary", "southern alberta", "TRUE", "TRUE", "TRUE", "2018-09-01", "livestock", "5", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "hellllooooo")
        sql.add_user("Jim", "Greg", "123-456-7890", "890-123-4567", "test2@gmail.com", "jeff's farm", "calgary", "southern alberta", "TRUE", "TRUE", "TRUE", "2018-09-01", "livestock", "5", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "hellllooooo")
        users=sql.get_users()
        self.assertEqual(2, len(users))
        self.assertEqual("Joe", users[0].first_name)
        self.assertEqual("test2@gmail.com", users[1].email)
        user=sql.get_user(1)
        # print(user)
        self.assertEqual("Joe", user.first_name)
        user=sql.get_user(2)
        self.assertEqual("Greg", user.last_name)
        user=sql.get_user(10)
        self.assertIsNone(None)
        sql.update_user("Jeff", "Kwok", "123-456-7890", "890-123-4567", "jeff@test.com", "jeff's farm", "calgary", "southern alberta", "TRUE", "TRUE", "TRUE", "2018-09-01", "livestock", "5", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "hellllooooo", "1")
        user=sql.get_user(1)
        # print(user)
        self.assertEqual("jeff@test.com", user.email)
        self.assertEqual("jeff's farm", user.f_name)
        # print(user.p_number)
        sql.delete_table_users()

    def test_offered_items(self):
        sql.create_table_users()
        sql.add_user("Ana", "Elias", "123-456-7890", "890-123-4567", "test2@gmail.com", "jeff's farm", "calgary", "southern alberta", "TRUE", "TRUE", "TRUE", "2018-09-01", "livestock", "5", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "hellllooooo")
        user=sql.get_user(1)
        # print(user)
        sql.create_table_offered_items()
        sql.add_item_by_user_id("1","Cow","1","300","2019-01-01","290","1","Heffer","True","2019-02-02","Grain","2019-03-03","100","500","1000","5000","2019-02-07","None","TRUE","TRUE","None","None","12","20","30","40","50","2019-10-18","None")
        sql.add_item_by_user_id("1","Pig","1","300","2019-01-01","290","1","Heffer","True","2019-02-02","Grain","2019-03-03","100","500","1000","5000","2019-02-07","None","TRUE","TRUE","None","None","12","20","30","40","50","2019-10-18","None")
        sql.add_user("Larry", "Lemi", "123-456-7890", "890-123-4567", "test2@gmail.com", "jeff's farm", "calgary", "southern alberta", "TRUE", "TRUE", "TRUE", "2018-09-01", "livestock", "5", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "hellllooooo")
        sql.add_item_by_user_id("2","Lamb","1","300","2019-01-01","290","1","Heffer","True","2019-02-02","Grain","2019-03-03","100","500","1000","5000","2019-02-07","None","TRUE","TRUE","None","None","12","20","30","40","50","2019-10-18","None")
        # sql.delete_table_offered_items()
        # sql.delete_table_users()
        user=sql.get_user(2)
        # print(user)
        users=sql.get_users()
        print(users)

