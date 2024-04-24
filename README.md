# Flavor Fusion 

An web application for restaurant and music event reccomendations based on preferences, budget, and location. Get a list of top rated, restaurants, and nearby music events, save them into your profile for future use! 

* Work in Progress...


## Setup

git clone the repository
```js
https://github.com/juan-baltazar-tapia/Flavor-Fusion.git
```
## install node modules
cd into the folder and run npm install
```js
npm install
```
## You will need three api keys
1. https://docs.developer.yelp.com/docs/fusion-authentication
2. https://developers.google.com/maps/documentation/javascript/get-api-key
3. https://seatgeek.com/account/develop

## create a .env in under the main folder and and use these exact names into the file
```js
VITE_GOOGLE_API_KEY = 'insert api key'
VITE_YELP_API_KEY = 'insert api key'
VITE_SEAK_GEEK_API_KEY = 'insert api key'
```

## Run npm run dev to start the server
```js
npm run dev
```

You will land on the home page, click on the get started button to input preference.


