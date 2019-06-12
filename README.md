# MarketPlace

\***\* STARTING THE SERVER \*\***

0. Navigate to Marketplace/

1. Update your branch
`git pull`

2. navigate to Marketplace/back-end
`cd back-end`


3. Install the environment dependancies with the following command:

`pip install pipenv`
`pipenv install`

    (should install dependencies for environment)
   note: if during the install you get an error that you are not running Python 3.6, you may
   need to install the correct version of Python in the environment using something
   like "pipenv install python version 3.6". This has NOT been tested successfully.

4. run pipenv shell (should get you into the environment)

5. Migrate the database with the following terminal commands:

`export FLASK_APP=app.py`
`flask db init`
`flask db upgrade`
`flask db migrate`


6. Start your flask server:
`python3 app.py`

\*\* TO BE ABLE TO ADD USERS OR OFFERED ITEMS BE SURE TO HAVE A CULTIVATR DATABASE WHERE POSTGRES IS A SUPERUSER and PASSWORD is 'password'

\***\* FOR TESTING \*\***

1. navigate to Martketplace/back-end/

2. run pipenv shell

3. navigate to Marketplace/back-end/DB/scripts

4. run pytest -s
