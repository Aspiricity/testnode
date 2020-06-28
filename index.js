require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

console.log('NodeJS Server is starting...');

router.get('/api/ghost/posts/', (req, res) => {
    const getPosts = async () => {
        try {
            const response = await axios.get(
                'http://localhost:2368/ghost/api/v3/content/posts/',
                { 
                    params: {
                        key: process.env.GHOST_CONTENT_API_KEY,
                    }
                }
            );
            res.json({posts: response.data.posts});
        }
        catch (error){
            console.log(error);
        }
    };
    getPosts();
});

router.get('/api/ghost/posts/:id/', (req, res) => {
    const getPostsByID = async () => {
        try {
            const response = await axios.get(
                `http://localhost:2368/ghost/api/v3/content/posts/${req.params.id}`,
                { 
                    params: {
                        key: process.env.GHOST_CONTENT_API_KEY,
                    }
                }
            );
            res.json({posts: response.data.posts});
        }
        catch (error){
            console.log(error);
        }
    };
    getPostsByID();
});

const app = express();
app.use(express.json());
app.use('/', router);
app.listen(5000);

console.log('Server is ready to handle requests on port 5000.')