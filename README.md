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
      "password": "one"
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
    },
    {
      "id": 2,
      "userId": 1,
      "name": "chicken 1oz",
      "fat": 0.3333,
      "carb": 0,
      "protein": 8,
      "count": 0
    },
    {
      "id": 3,
      "userId": 1,
      "name": "beans 1/4cup",
      "fat": 0,
      "carb": 9.5,
      "protein": 3.5,
      "count": 0
    },
    {
      "id": 4,
      "userId": 1,
      "name": "coconut oil 1tbsp",
      "fat": 14,
      "carb": 0,
      "protein": 0,
      "count": 0
    },
    {
      "id": 5,
      "userId": 1,
      "name": "coconut oil 1tsp",
      "fat": 4.667,
      "carb": 0,
      "protein": 0,
      "count": 0
    },
    {
      "id": 6,
      "userId": 1,
      "name": "banana xl",
      "fat": 1,
      "carb": 35,
      "protein": 1,
      "count": 0
    },
    {
      "id": 7,
      "userId": 1,
      "name": "watermelon kombucha",
      "fat": 0,
      "carb": 18,
      "protein": 0,
      "count": 0
    },
    {
      "id": 8,
      "userId": 1,
      "name": "trilogy kombucha",
      "fat": 0,
      "carb": 12,
      "protein": 0,
      "count": 0
    },
    {
      "id": 9,
      "userId": 1,
      "name": "gatorade",
      "fat": 0,
      "carb": 36,
      "protein": 0,
      "count": 0
    },
    {
      "id": 10,
      "userId": 1,
      "name": "pb crackers",
      "fat": 11,
      "carb": 25,
      "protein": 5,
      "count": 0
    },
    {
      "id": 11,
      "userId": 1,
      "name": "junk food",
      "fat": 17,
      "carb": 55,
      "protein": 2,
      "count": 0
    },
    {
      "name": "pea protein shake",
      "fat": 3,
      "carb": 5,
      "protein": 26.5,
      "userId": 1,
      "count": 0,
      "id": 12
    }
  ]
}

Traverse back the MacroPolo folder and run: npm install This is will install all packages, libraries and their dependencies used by Macro Polo. 

In another window of your terminal go into the src/api forlder and run: json-server -p 5001 database.json.  Be sure to leave the -w flag off.

Next run the following in order to view Macro Polo in your browser: npm start.  The page should launch automatically. 

