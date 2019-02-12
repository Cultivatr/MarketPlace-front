# import psycopg2
import unittest
from server_func import get_all_offered_items_by_user_id
import server_func
import datetime

class TestApiCalls(unittest.TestCase):

   def test_offered_item(self):
      self.assertEqual(1, db_to_objects.get_all_clients())
