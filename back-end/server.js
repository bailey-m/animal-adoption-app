const express = require('express');
const cors = require('cors');
const app = express();
const {Firestore, QuerySnapshot} = require('@google-cloud/firestore');
const firestore = new Firestore();
app.use(cors());
app.enable('trust proxy');


// Turns a collection into a list of document IDs
// Based on code from: https://stackoverflow.com/questions/61435004/get-all-documents-from-a-collection
const get_collection_ids = async(collection) => {
    try {
        let doc_list = [];
        let collectRef = firestore.collection(collection);
        await collectRef.get().then((querySnapshot) =>{
            querySnapshot.forEach((collectionDoc) => {
                doc_list.push(collectionDoc.id)
            })
        })
        return doc_list;
    } catch(err) {
        console.log(err);
    } 
}

// *** Begin Pet model functions ***

const get_pet_by_id = async(petId) => {
    try {
        let documentRef = firestore.doc('Pets/' + petId);
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

// *** End Pet model functions ***


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


// *** Begin Pet controller functions ***
app.get('/helloworld', async (req, res) => {
    let petDocument = await get_pet_by_id('MdYu8EDvl1kcZvSsK9xP');
    let data = {data: petDocument};
    res.send(data);
});

app.get('/pets', async (req, res) => {
    // Get the list of document ids
    let pet_collection = await get_collection_ids('Pets');
    let pets = [];

    // Add an entry for each document
    for (var pet_index in pet_collection){
        let petDocument = await get_pet_by_id(pet_collection[pet_index]);
        temp = {};
        temp["id"] = pet_index;
        temp["name"] = petDocument.Name;
        temp["image"] = petDocument.imageURL;
        temp["description"] = petDocument.Description;
        temp["age"] = `${petDocument.Age} year(s) old`;
        temp["breed"] = petDocument.Breed;
        temp["availability"] = petDocument.Availability;
        temp["disposition"] = {
            goodWithAnimals: petDocument.Disposition[0],
            goodWithChildren: petDocument.Disposition[1],
            leashed: petDocument.Disposition[2]};
        temp["species"] = petDocument.Species;
        pets.push(temp);
    }
    res.send(pets);
});

// *** End Pet controller functions ***

app.get('/news', async (req, res) => {
    // Get the list of document ids
    let news_collection = await get_collection_ids('News_Item');
    let news = [];

    // Add an entry for each document
    for (var news_index in news_collection){
        let newsDocument = await get_news_by_id(news_collection[news_index]);
        temp = {};
        temp["id"] = news_index;
        temp["title"] = newsDocument.Title;
        temp["imageURL"] = newsDocument.imageURL;
        temp["description"] = newsDocument.Description;
        temp["date"] = newsDocument.Date.toDate().toDateString()
        news.push(temp);
    }
    res.send(news);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});