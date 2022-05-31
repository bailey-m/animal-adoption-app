const {Firestore, QuerySnapshot} = require('@google-cloud/firestore');

const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const fs = require('../lib/firestore');

const firestore = fs.firestore;
app.use(bodyParser.json());

// *** Begin News model functions ***

const get_news_by_id = async(newsId) => {
    try {
        let documentRef = firestore.doc('News_Item/' + newsId);
        return documentRef.get().then(documentSnapshot => {
            if (documentSnapshot.exists) {
                return documentSnapshot.data();
            }
            else return 'No data retrieved';
        });
    } catch(err) {
        console.log(err);
    }
}

// *** End News model functions ***

// *** Start News controller functions ***

app.get('/', async (req, res) => {
    try {
    // Get the list of document ids
        let news_collection = await fs.get_collection_ids('News_Item');
        let news = [];

    // Add an entry for each document
        for (var news_id of news_collection){
            let newsDocument = await get_news_by_id(news_id);
            temp = {};

            temp["id"] = news_id;
            temp["title"] = newsDocument.Title;
            temp["imageURL"] = newsDocument.imageURL;
            temp["description"] = newsDocument.Description;
            temp["date"] = newsDocument.Date.toDate().toDateString()
            news.push(temp);
        }
        res.send(news);
    } catch (err) {
        console.log(err);
    }
});

app.post('/', async (req, res) =>{
    try {
        await firestore.collection('News_Item').add({
            // We can safely delete the ID feild after we re-deploy my branch or our assignment is graded
            Date: Firestore.Timestamp.now(),
            Description: req.query.Description,
            Title: req.query.Title,
            imageURL: req.query.imageURL
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete('/', async (req, res) =>{
    try {
        await firestore.collection('News_Item').doc(req.query.id).delete();
        res.status(204).end();
    } catch (err) {
        console.log(err);
    }
});

// *** End News controller functions ***

module.exports = app;