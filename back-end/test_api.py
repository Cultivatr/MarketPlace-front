import unittest
from server_func import *
import server_func
import datetime
import psycopg2

class TestApiCalls(unittest.TestCase):

   def test_offered_item(self):
      self.assertEqual(2, len(server_func.get_all_offered_items_by_user_id(1)))
      self.assertEqual(6, len(server_func.get_all_offered_items_by_user_id(2)))

   def test_adding_item(self):
      user_id = 1
      name = "Pig"
      qty = 25
      est_birthday = "2019-02-14"
      registration_number = 1234
      rfid_tag = 23435
      breed = 'jeff'
      single_brand = True
      starting_date_of_feed = "2019-02-01"
      type_of_feed = "hay"
      est_completion_date = "2020-01-01"
      starting_weight = 200
      est_finished_weight = 400
      hanging_weight = 500
      est_price_to_be_paid = 10

      date_planted = "null"
      seed_type = "null"
      heirloom = "null"
      gmo = "null"
      fertilizer_type_used = "null"
      pesticide_type_used = "null"
      estimated_qty_planted = "null"
      estimated_finished_qty = "null"
      qty_accepted_for_listing = "null"
      qty_accepted_at_delivery = "null"
      chargebacks = "null"
      server_func.add_offered_item_by_user_id(name, user_id, qty, est_birthday, registration_number,rfid_tag, breed, single_brand,\
            starting_date_of_feed, type_of_feed, est_completion_date, starting_weight, est_finished_weight, hanging_weight,\
            est_price_to_be_paid, date_planted, seed_type, heirloom, gmo, fertilizer_type_used, pesticide_type_used,\
            estimated_qty_planted, estimated_finished_qty, qty_accepted_for_listing, qty_accepted_at_delivery, chargebacks)
      # test_product_id = server_func.add_offered_item_by_user_id("name")
      self.assertEqual({'product_id':'', 'est_birthdate':'', 'single_brand':'', "user_id":''}, server_func.get_all_offered_items_by_user_id(1)[-1])