\copy r_product FROM 'sample_files/r_product.tsv' WITH NULL ''

ALTER TABLE r_product add column product_id SERIAL PRIMARY KEY;
