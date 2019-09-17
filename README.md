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
      "weight": "182.5",
      "password": "one"
    },
    {
      "id": 2,
      "userName": "new",
      "weight": "100",
      "password": "new"
    },
    {
      "userName": "ellie",
      "weight": 0,
      "password": "two",
      "id": 3
    },
    {
      "userName": "crornk",
      "weight": 0,
      "password": "three",
      "id": 4
    },
    {
      "id": 5,
      "userName": "person",
      "weight": "100",
      "password": "test"
    },
    {
      "userName": "austyn",
      "weight": 0,
      "password": "austyn",
      "id": 6
    },
    {
      "userName": "cuteBarista",
      "weight": 0,
      "password": "cuteBarista",
      "id": 7
    },
    {
      "id": 8,
      "userName": "newguy",
      "weight": "400",
      "password": "newguy"
    },
    {
      "id": 9,
      "userName": "hope",
      "weight": "99",
      "password": "hope"
    },
    {
      "id": 10,
      "userName": "dave",
      "weight": "100",
      "password": "dave"
    },
    {
      "id": 11,
      "userName": "noob",
      "weight": "99",
      "password": "noob"
    },
    {
      "id": 12,
      "userName": "elephant",
      "weight": "1000",
      "password": "elephant"
    },
    {
      "id": 13,
      "userName": "animal",
      "weight": "500",
      "password": "animal"
    },
    {
      "id": 14,
      "userName": "giant",
      "weight": "1000",
      "password": "giant"
    }
  ],
  "foods": [
    {
      "id": 6,
      "userId": 2,
      "name": "new const thing",
      "fat": 1,
      "carb": 1,
      "protein": 1,
      "date": 8,
      "count": 1
    },
    {
      "id": 23,
      "userId": 1,
      "name": "mp shake",
      "fat": 2,
      "carb": 5,
      "protein": 25,
      "date": 11,
      "count": 2
    },
    {
      "id": 24,
      "userId": 1,
      "name": "on shake",
      "fat": 1.5,
      "carb": 3,
      "protein": 24,
      "date": 11,
      "count": 1
    },
    {
      "id": 25,
      "userId": 1,
      "name": "2 almonds",
      "fat": 1,
      "carb": "0.4285",
      "protein": "0.4285",
      "count": 0
    },
    {
      "id": 26,
      "userId": 1,
      "name": "veggies 1cup",
      "fat": 0,
      "carb": "5",
      "protein": "2",
      "count": 0
    },
    {
      "id": 27,
      "userId": 1,
      "name": "chicken 3oz",
      "fat": 1,
      "carb": 0,
      "protein": 24,
      "date": 11,
      "count": 4
    },
    {
      "id": 29,
      "userId": 3,
      "name": "sandwich",
      "fat": 27,
      "carb": 45.4,
      "protein": 14.4,
      "date": 11,
      "count": 1
    },
    {
      "id": 30,
      "userId": 1,
      "name": "pumpkin seeds 1/4cup",
      "fat": 17,
      "carb": 4,
      "protein": 10,
      "date": 11,
      "count": 0
    },
    {
      "id": 35,
      "userId": 1,
      "name": "chicken 1oz",
      "fat": 0.3333,
      "carb": 0,
      "protein": 8,
      "date": 11,
      "count": 1
    },
    {
      "id": 36,
      "userId": 5,
      "name": "thing one",
      "fat": 1,
      "carb": 1,
      "protein": 1,
      "date": 13,
      "count": 1
    },
    {
      "id": 38,
      "userId": 1,
      "name": "beans 1/4cup",
      "fat": 0,
      "carb": 9.5,
      "protein": 3.5,
      "count": 0
    },
    {
      "id": 40,
      "userId": 8,
      "name": "constant thing",
      "fat": 1,
      "carb": 1,
      "protein": 1,
      "date": 14,
      "count": 1
    },
    {
      "id": 41,
      "userId": 8,
      "name": "changing thing",
      "fat": "100",
      "carb": "100",
      "protein": "100",
      "count": 1
    },
    {
      "id": 43,
      "userId": 1,
      "name": "avocado",
      "fat": 16.64,
      "carb": 9.86,
      "protein": 2.28,
      "count": 1
    },
    {
      "id": 46,
      "userId": 1,
      "name": "sweet peas",
      "fat": 0,
      "carb": 30,
      "protein": 7,
      "date": 14,
      "count": 0
    },
    {
      "name": "food",
      "fat": 1,
      "carb": 1,
      "protein": 1,
      "userId": 9,
      "count": 0,
      "date": 14,
      "id": 48
    },
    {
      "name": "more food",
      "fat": 1,
      "carb": 1,
      "protein": 1,
      "userId": 9,
      "count": 0,
      "date": 14,
      "id": 50
    },
    {
      "name": "one more food",
      "fat": 8,
      "carb": 6,
      "protein": 9,
      "userId": 9,
      "count": 0,
      "date": 14,
      "id": 51
    },
    {
      "id": 52,
      "userId": 11,
      "name": "good food",
      "fat": 1,
      "carb": 1,
      "protein": 1,
      "date": 15,
      "count": 1
    },
    {
      "id": 54,
      "userId": 1,
      "name": "corn",
      "fat": 2,
      "carb": 26,
      "protein": 2,
      "date": 15,
      "count": 0
    },
    {
      "id": 55,
      "userId": 1,
      "name": "coconut oil 1tbsp",
      "fat": 14,
      "carb": 0,
      "protein": 0,
      "date": 15,
      "count": 0
    },
    {
      "id": 58,
      "userId": 1,
      "name": "coconut oil 1tsp",
      "fat": 4.667,
      "carb": 0,
      "protein": 0,
      "date": 16,
      "count": 0
    },
    {
      "id": 64,
      "userId": 1,
      "name": "banana",
      "fat": 0,
      "carb": 27,
      "protein": 1,
      "date": 19,
      "count": 3
    },
    {
      "id": 65,
      "userId": 1,
      "name": "watermelon kombucha",
      "fat": "0",
      "carb": 18,
      "protein": 0,
      "count": 1
    },
    {
      "id": 66,
      "userId": 12,
      "name": "grass",
      "fat": 1,
      "carb": 1,
      "protein": 1,
      "date": 19,
      "count": 1
    },
    {
      "id": 67,
      "userId": 13,
      "name": "constant food",
      "fat": 1,
      "carb": 1,
      "protein": 1,
      "date": 19,
      "count": 1
    },
    {
      "id": 68,
      "userId": 1,
      "name": "cheese",
      "fat": 7,
      "carb": 0,
      "protein": 5,
      "date": 19,
      "count": 5
    },
    {
      "id": 69,
      "userId": 1,
      "name": "trilogy kombucha",
      "fat": 0,
      "carb": 12,
      "protein": 0,
      "count": 1
    }
  ]
}


Traverse back the MacroPolo folder and run: npm install This is will install all packages, libraries and their dependencies used by Macro Polo. 

In another window of your terminal go into the src/api forlder and run: json-server -p 5001 database.json.  Be sure to leave the -w flag off.

Next run the following in order to view Macro Polo in your browser: npm start.  The page should launch automatically. 

