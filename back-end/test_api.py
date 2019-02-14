import unittest
from server_func import *
import server_func
import datetime
import psycopg2

class TestApiCalls(unittest.TestCase):

   def test_offered_item(self):
      self.assertEqual(2, len(server_func.get_all_offered_items_by_user_id(1)))
      self.assertEqual(6, len(server_func.get_all_offered_items_by_user_id(2)))
