# Flavor Fusion 

An web application for restaurant and music event reccomendations based on preferences, budget, and location. Get a list of top rated, restaurants, and nearby music events, save them into your profile for future use! 

* Work in Progress


## Setup

git clone the repository by copy and pasting the following code into your terminal in the desired location.
```js
git clone https://github.com/juan-baltazar-tapia/Flavor-Fusion.git
```
## install node modules, I used node version 20.11.1
cd into the folder and run npm install
```js
npm install
```

If you don't have nvm or node installed, heres a link
https://nodejs.org/en/download/package-manager/


## You will need three api keys
1. https://docs.developer.yelp.com/docs/fusion-authentication
2. https://developers.google.com/maps/documentation/javascript/get-api-key
3. https://seatgeek.com/account/develop

## Create a .env in under the main folder and and use these exact names into the file
```js
VITE_GOOGLE_API_KEY = 'insertApiKey'
VITE_YELP_API_KEY = 'insertApiKey'
VITE_SEAK_GEEK_API_KEY = 'insertApiKey'
```
## You will need a supabase account
1. https://supabase.com/

Create a project, and click on SQL editor on the left hand side.

<img width="210" alt="Screenshot 2024-05-02 at 11 29 43 PM" src="https://github.com/juan-baltazar-tapia/Flavor-Fusion/assets/73971599/2709840a-6d05-4a08-bcfd-a69b18a2f136">

Copy and paste the following querie, and click run on the bottom left hand side.
```js
create table
  restaurants (
    user_id uuid,
    restaurant_id varchar,
    name varchar,
    price varchar,
    rating float,
    review_count bigint,
    location varchar,
    foreign key (user_id) references auth.users (id)
  );
```

#Go into settings on the bottom left side

<img width="205" alt="Screenshot 2024-05-02 at 11 38 48 PM" src="https://github.com/juan-baltazar-tapia/Flavor-Fusion/assets/73971599/de9c9bc3-08dd-4a2e-97ce-e0cd95b12518">


Under configuration, click on API
<img width="251" alt="Screenshot 2024-05-02 at 11 39 15 PM" src="https://github.com/juan-baltazar-tapia/Flavor-Fusion/assets/73971599/7307879a-8e74-4e04-b43d-4f05fd9f4e17">


## Copy and paste this into the .env folder and paste your Project URL into VITE_SUPABASE_URL, and anon public Project Api Key into VITE_SUPABASE_KEY
```js
VITE_SUPABASE_URL = 'insertProjecRurl'
VITE_SUPABASE_KEY = 'insertAnonPublicKey'
```

## Run npm run dev to start the server
```js
npm run dev
```

You will land on the home page, click on the get started button to input preference.


