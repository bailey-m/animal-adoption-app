const express = require('express');
const bodyParser = require('body-parser');
const fs = require('../lib/firestore');
const pets = require('./pets');

const firestore = fs.firestore;
const app = express.Router();
app.use(bodyParser.json());

// *** Begin Match model functions ***

async function post_new_match(userID, petID) {
    try {
        const data = {
            UserID: userID,
            PetID: petID
        }
    
        const response = await firestore.collection('Match').add(data);
        return response;

    } catch (error) {
        console.log(error);
    }
}

async function get_matches(userID) {
    try {
        let matches = [];

        const matchQuery = firestore.collection('Match').where('UserID', '==', userID);
        const matchDocs = await matchQuery.get();
        for (let doc of matchDocs.docs) {
            const petID = doc.data().PetID;
            let petDoc = await pets.get_pet_by_id(petID);
            let pet = pets.format_pet_info(petDoc, petID);

            matches.push(pet);
        }

        return matches;

    } catch (error) {
        console.log(error);
    }
}

// *** End Match model functions ***


// *** Start Match controller functions ***

app.get('/:userID', async (req, res) => {
    try {
        const matches = await get_matches(req.params.userID);

        if (matches) {
            res.status(200).send(matches);
        }
    } catch (err) {
        console.log(err);
    }
})

app.post('/', async (req, res) => {
    try {
        const response = await post_new_match(req.body.userID, req.body.petID);
        if (response) {
            res.status(200).send();
        }
    } catch (err) {
        console.log(err);
    }
})

// *** End Match controller functions ***

module.exports = app;