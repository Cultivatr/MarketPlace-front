\copy Offered_Item FROM 'sample_files/offered_item.tsv' WITH NULL ''

ALTER TABLE Offered_Item add column offer_id SERIAL PRIMARY KEY;
