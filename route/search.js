const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const queryString = require('query-string');
// const Jimp = require('jimp');

router.get('/searchbar/:input/:language', function(req, res){
    fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:"+req.params.input+"&filter=partial&langRestrict=" +
        req.params.language+"&printType=books&maxResults=36&key="+process.env.API_KEY)
        .then(res => res.json())
            .then( data =>{
            res.status(200).json(generalSearch(data));
            }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
            })
    //now to make the call...wait i dont really have to do route/store for outside api calls do i.... if it was related to database then it would be a different story
});

router.get('/releaseyear/:year/:month', function(req, res){
    let month = '';
    if(req.params.month < 10){
        month = '0'+req.params.month;
    }else{
        month = req.params.month;
    }
    fetch("https://api.nytimes.com/svc/books/v3/lists/"+req.params.year+"-"+month+"-12/hardcover-fiction.json?api-key="+process.env.NYT_KEY)
        .then(res => res.json())
        .then(data => {
            res.status(200).json(data);
        }).catch(err =>{
            console.log(err);
            res.sendStatus(404);
    })
});

router.get('/scroll/:input?/:index/:subject/:orderBy/:language', function(req, res){
    let query = '';
    if(req.params.orderBy === 'newest'){
        query = "https://www.googleapis.com/books/v1/volumes?q=subject:"+req.params.subject+"&orderBy="+req.params.orderBy+"&filter=partial&langRestrict=" +req.params.language+"&printType=books&startIndex="+req.params.index+"&maxResults=36&key="+process.env.API_KEY;
    }else{
        query = "https://www.googleapis.com/books/v1/volumes?q=intitle:"+req.params.input+"&filter=partial&langRestrict="+req.params.language+"&printType=books&startIndex="+req.params.index+"&maxResults=36&key="+process.env.API_KEY;
    }
    fetch(query)
        .then(res => res.json())
        .then(data => {
            // console.log("scroll fetch result");
            // console.log(data);
            res.status(200).json(generalSearch(data));
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
    })
});

router.get('/newbooks/:subject/:orderBy/:language', function(req, res){
    fetch("https://www.googleapis.com/books/v1/volumes?q=subject:"+req.params.subject+"&orderBy=newest&filter=partial&langRestrict="+req.params.language+"&printType=books&maxResults=36&key="+process.env.API_KEY)
        .then(res=> res.json())
        .then(data =>{
            res.status(200).json(generalSearch(data));
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
    })
});

router.get('/bestseller', function(req, res){
    fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key='+process.env.NYT_KEY)
        .then(res => res.json())
        .then( data=>{
            res.status(200).json(data);
        }).catch(err =>{
            console.log(err);
            res.sendStatus(404);
    })
});

router.get('/bestseller-cover/:info', function(req, res){
    // console.log("inside bestseller-cover");
    // console.log(req.params.info);
    fetch("https://www.googleapis.com/books/v1/volumes?q="+req.params.info+"&maxResults=1&key="+process.env.API_KEY)
        .then(res => res.json())
        .then(data => {
            // console.log("within bestseller-cover/isbn");
            // console.log(data);
                res.status(200).json(generalSearch(data));
        }).catch(err =>{
            console.log(err);
            res.sendStatus(404);
    })

});

function generalSearch(data){
    if(data.totalItems > 0){
    let keys = Object.keys(data.items);
    let books = data.items;
        console.log("generalSearch");
    for(let i = 0; i < keys.length; i++){
        // console.log(books[i]['volumeInfo']['imageLinks']);
        //TODO:Issue where sometimes thumbnail might not exist in the return fetch, it seems setting filter=partial, will avoid those books
            if (books[i]['volumeInfo']['imageLinks']) {
                console.log(books[i]['volumeInfo']['imageLinks']);
                let q = queryString.parseUrl(books[i]['volumeInfo']['imageLinks']['thumbnail']);
                q.query.zoom = '2';
                books[i]['volumeInfo']['imageLinks']['thumbnail'] = q.url + '?' + queryString.stringify(q.query);

                //BELOW CODE WORKS THE SAME AS ABOVE LINE***
                // books[i]['volumeInfo']['imageLinks']['thumbnail'] =
                //     q.url+'?'+'id='+q.query.id+'&printsec='+q.query.printsec+'&img='+q.query.img+'&zoom='+
                //     q.query.zoom+'&edge='+q.query.edge+'&source='+q.query.source;

            }
    }
    return data;
    }
}
module.exports = router;