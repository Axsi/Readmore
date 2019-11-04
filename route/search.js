const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const queryString = require('query-string');

router.get('/searchbar/:input/:index?', function(req, res){
    // console.log("Inside searchbar router");
    // console.log(req.params.input);
    // console.log(req.params.index);
    // console.log(req.params);
    let query = '';
    //&startIndex=40
    if(req.params.index === undefined){
        query = "https://www.googleapis.com/books/v1/volumes?q=intitle:"+req.params.input+"&filter=partial&printType=books&maxResults=40&key="+process.env.API_KEY
    }else{
        query = "https://www.googleapis.com/books/v1/volumes?q=intitle:"+req.params.input+"&filter=partial&printType=books&maxResults=40&startIndex="+req.params.index+"&key="+process.env.API_KEY
    }
    fetch(query)
        .then(res => res.json())
            .then( data =>{
            // console.log("inside fetch of router.get");
            // console.log(data);
                let keys = Object.keys(data.items);
                let books = data.items;
                for(let i = 0; i < keys.length; i++){
                    //TODO:Issue where sometimes thumbnail might not exist in the return fetch, it seems setting filter=partial, will avoid those books
                    //console.log(books[i]['volumeInfo']['imageLinks']['thumbnail']);
                    // if(books[i]['volumeInfo']['imageLinks']){
                    //     if(books[i]['volumeInfo']['imageLinks']['thumbnail']){
                            let q = queryString.parseUrl(books[i]['volumeInfo']['imageLinks']['thumbnail']);
                            // .query['zoom'];
                            q.query.zoom = '2';
                            // console.log(q);
                            // console.log(queryString.stringify(q));
                            books[i]['volumeInfo']['imageLinks']['thumbnail'] =
                                q.url+'?'+'id='+q.query.id+'&printsec='+q.query.printsec+'&img='+q.query.img+'&zoom='+
                                q.query.zoom+'&edge='+q.query.edge+'&source='+q.query.source;
                            // console.log(books[i]['volumeInfo']['imageLinks']['thumbnail']);
                        // }
                    // }
                }
            res.status(200).json(data);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
    })
    //now to make the call...wait i dont really have to do route/store for outside api calls do i.... if it was related to database then it would be a different story
});

module.exports = router;