To run Macro Polo locally, create an empty directory and clone the project by running the following command in your terminal: git@github.com:BerkeleyPlatte/MacroPolo.git

Macro Polo uses a database.json file to store all data. To create the database, run:

mkdir api
cd api
touch database.json
Open database.json and copy the following into the file to create a database skeleton:

{
  "users": [
    {
      "id": 1,
      "userName": "berk",
      "weight": 180,
      "password": "one",
      "fatFactor": 0.3777,
      "carbFactor": 0.9722,
      "proteinFactor": 1.1388
    }
  ],
  "foods": [
    {
      "id": 1,
      "userId": 1,
      "name": "2 almonds",
      "fat": 1,
      "carb": 0.4285,
      "protein": 0.4285,
      "count": 0
    }
  ],
}

Traverse back the MacroPolo folder and run: npm install This is will install all packages, libraries and their dependencies used by Macro Polo. 

In another window of your terminal go into the src/api forlder and run: json-server -p 5001 database.json.  Be sure to leave the -w flag off.

Next run the following in order to view Macro Polo in your browser: npm start.  The page should launch automatically. 

