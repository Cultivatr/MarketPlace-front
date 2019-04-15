# MarketPlace

\***\* STARTING THE SERVER \*\***

0. Navigate to Marketplace/

1. run git pull

1. navigate to Marketplace/back-end

1. run pipenv install (should install dependencies for environment)
   note: if during the install you get an error that you are not running Python 3.6, you may
   need to install the correct version of Python in the environment using something
   like "pipenv install python version 3.6". This has NOT been tested successfully.

1. run pipenv shell (should get you into the environment)

1. run python server2.py (should start your flask server)

\*\* TO BE ABLE TO ADD USERS OR OFFERED ITEMS BE SURE TO HAVE A CULTIVATR DATABASE WHERE POSTGRES IS A SUPERUSER and PASSWORD is 'password'

\***\* FOR TESTING \*\***

1. navigate to Martketplace/back-end/

2. run pipenv shell

3. navigate to Marketplace/back-end/DB/scripts

4. run pytest -s
