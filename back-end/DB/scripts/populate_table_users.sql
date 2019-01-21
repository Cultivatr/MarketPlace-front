
\copy users from 'sample_files/user.tsv' with null ''

ALTER TABLE users add column user_id SERIAL PRIMARY KEY;
