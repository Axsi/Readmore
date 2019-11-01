const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/searchbar/:input', function(req, res){
    console.log("Inside searchbar router");
    console.log(req.params.input);
    fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:"+req.params.input+"&filter=partial&printType=books&maxResults=40&key="+process.env.API_KEY)
        .then(res => res.json())
            .then( data =>{
            console.log("inside fetch of router.get");
            console.log(data);
            res.status(200).json(data);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
    })
    //now to make the call...wait i dont really have to do route/store for outside api calls do i.... if it was related to database then it would be a different story
});

module.exports = router;