class Offered_item(object):
	def __init__(self,
                Id,
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
                Delivered_to):
                self.id = id
                self.Users_id = Users_id
                self.Product_name = Product_name
                self.Quantity = Quantity
                self.Price_paid = Price_paid
                self.Est_birthdate = Est_birthdate
                self.Registration_number = Registration_number
                self.RFID_tag = RFID_tag
                self.Breed=Breed
                self.Single_brand = Single_brand
                self.Starting_date_of_feed = Starting_date_of_feed
                self.Type_of_feed = Type_of_feed
                self.Est_completion_date = Est_completion_date
                self.Starting_weight = Starting_weight
                self.Hanging_weight = Hanging_weight
                self.Est_price_to_be_paid = Est_price_to_be_paid
                self.Date_planted = Date_planted
                self.Seed_type = Seed_type
                self.Heirloom = Heirloom
                self.GMO = GMO
                self.Fertilizer_type_used = Fertilizer_type_used
                self.Pesticide_type_used = Pesticide_type_used
                self.Estimated_qty_planted = Estimated_qty_planted
                self.Estimated_finished_qty = Estimated_finished_qty
                self.Qty_accepted_for_listing = Qty_accepted_for_listing
                self.Qty_accepted_at_delivery = Qty_accepted_at_delivery
                self.Chargebacks = Chargebacks
                self.Delivered_date = Delivered_date
                self.Delivered_to = Delivered_to
	def __str__(self):
		return f'Offered Item=id: {self.id}, UserId: {self.Users_id}, Product Name: {self.Product_name}, Qty: {self.Quantity}, Price: {self.Price_paid}, Est Birthdate: {self.Est_birthdate}, Reg. Number: {self.Registration_number}, RFID: {self.RFID_tag}, Breed: {self.Breed}, Single Brand: {self.Single_brand}, Start Date of Feed: {self.Starting_date_of_feed}, Type of Feed: {self.Type_of_feed}, Est Completion Date: {self.Est_completion_date}, Starting Weight: {self.Starting_weight}, Hanging Weight: {self.Hanging_weight}, Est Price: {self.Est_price_to_be_paid}, Date Planted: {self.Date_planted}, Seed Type: {self.Seed_type}, Heirloom: {self.Heirloom}, GMO: {self.GMO}, Fertilzer: {self.Fertilizer_type_used}, Pesticide: {self.Pesticide_type_used}, Est Qty Planted: {self.Estimated_qty_planted}, Est Finished Qty: {self.Estimated_finished_qty}, Qty Listing: {self.Qty_accepted_for_listing}, Qty Delivered: {self.Qty_accepted_at_delivery}, Chargeback: {self.Chargebacks}, Delivered Date: {self.Delivered_date}, Delivered To: {self.Delivered_to}'

	def __repr__(self):
		return self.__str__()