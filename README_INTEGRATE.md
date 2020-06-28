# Make REST requests from NodeJS / Express using Axios (to a local Headless Ghost CMS)

In this video tutorial, we will create a NodeJS Express server app and use Axios to make GET requests to a local Ghost Headless CMS
(which we set up in the previous video). In a future video, we will integrate that with a React frontend.

## Create the NodeJS App

The first step is to create a NodeJS app that will make requests to the Ghost CMS. By using the NodeJS server as intermediary, we can store the admin credentials on the server.

`Note:` It is important to keep credentials secure. A good first step is use an environment variable stored on environment files that are included in .gitignore (so they don't get checked into a public repository). For low impact credentials this approach is likely sufficient, but for API credentials that require greater security more robust solutions should be applied. 

- Setup the NodeJS project / dependencies
```
    mkdir testnode
    cd testnode
    npm init -y     // creates new package.json with default values
    npm install express
    npm install axios
    npm install dotenv
    npm i
    code .
```
- Create a new index.js file
- Add code to require express, express Router and axios
```
    require('dotenv').config();
    const express = require('express');
    const router = express.Router();
    const axios = require('axios');
```
- Create a GET POSTS request
    - Initially we will create the request with the API access credential inline, and then move it to an environment file.
```
    router.get('/api/ghost/posts/', (req, res) => {
        const getPosts = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:2368/ghost/api/v3/content/posts/',
                    {
                        params: {
                            key: '<insert Ghost Content API key>',
                        },
                    }
                );
                res.json({posts: response.data.posts});
            catch (error){
                console.log(error);
            }
        };
        getPosts();
    });
```
- Add code to setup Express
```
    const app = express();
    app.use(express.json());
    app.use('/', router);
    app.listen(5000);
```
- Run the NodeJS app locally
```
    node index.js
```
## Test the NodeJS app using Postman
- Create a Collection
- Create and run a request to GET all of the Ghost Posts
    - http://localhost:5000/api/ghost/posts

## Replace the inline API Content Key with an environment variable
- Create a .env file
- Add a new variable for the Ghost API Content Key
```
# .env

# Ghost Headless CMS
GHOST_CONTENT_API_KEY="<insert Ghost Content API Key>"
```
- update index.js to reference the new environment variable
```
    params: {
        key: process.env.GHOST_CONTENT_API_KEY,
    },
```
- Add a .gitignore file with the .env file listed (recommended)
```
node_modules
.env
.vscode
```

## Add and test a second REST GET request to get a single post by ID
- Add a second GET request to index.js
```
router.get('/api/ghost/posts/:id/', (req, res) => {
    const getPostsByID = async () => {
        try {
            const response = await axios.get(
                `http://localhost:2368/ghost/api/v3/content/posts/${req.params.id}/`,
                {
                    params: {
                        key: process.env.GHOST_CONTENT_API_KEY,
                    },
                }
            );
            res.json({posts: response.data.posts});
        catch (error){
            console.log(error);
        }
    };
    getPostsByID();
});
```
- Add a second Postman GET request to the collection
    - http://localhost:5000/api/ghost/posts/{id}

## GitHub Code Repository
- This code is available publically at https://github.com/Aspiricity/testnode

## Thank You!
- If this tutorial was useful, hit `like`
- If you are interested in more videos like this, hit `subscribe`
- If you have any comments, suggestions or questions, leave a `comment`
- Otherwise stick around for the next video in this series

