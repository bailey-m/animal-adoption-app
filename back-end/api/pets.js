const {Firestore, QuerySnapshot} = require('@google-cloud/firestore');

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('../lib/firestore');

const firestore = fs.firestore;
const app = express.Router();
app.use(bodyParser.json());


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

function format_pet_info (pet, id) {
    temp = {};

    temp["id"] = id;
    temp["name"] = pet.Name;
    temp["image"] = pet.imageURL;
    temp["description"] = pet.Description;
    temp["age"] = `${pet.Age} year(s) old`;
    temp["breed"] = pet.Breed;
    temp["availability"] = pet.Availability;
    temp["disposition"] = {
        goodWithAnimals: pet.Disposition[0],
        goodWithChildren: pet.Disposition[1],
        leashed: pet.Disposition[2]};
    temp["species"] = pet.Species;
    temp["date"] = pet.Date_Added.toDate().toLocaleDateString("en-ZA");

    return temp;
}

// *** End Pet model functions ***

// *** Begin Pet controller functions ***
app.get('/', async (req, res) => {
    // Get the list of document ids
    try{
        let pet_collection = await fs.get_collection_ids('Pets');
        let pets = [];
        if (req.query.date) {
            var date = req.query.date.replace(/\//g,'');
        } else {
            var date = "";
        }
        // Add an entry for each document
        for (var pet_id of pet_collection){
            let petDocument = await get_pet_by_id(pet_id);
            let temp = format_pet_info(petDocument, pet_id);
            var tempDate = temp.date.replace(/\//g,'');
            if (req.query.name == '' || req.query.name == temp.name){
                if (req.query.species == '' || req.query.species == temp.species){
                    if (req.query.breed == '' || req.query.breed == temp.breed){
                        if (req.query.good_with_animals != 'true' || temp.disposition.goodWithAnimals != false){
                            if (req.query.good_with_children != 'true' || temp.disposition.goodWithChildren != false){
                                if (req.query.safe_off_leash != 'true' || temp.disposition.leashed != true){
                                    if (req.query.date == '' || date <= tempDate){  
                                        pets.push(temp);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        res.send(pets);
    } catch (err) {
        console.log(err);
    }
});

app.post('/', async (req, res) =>{
   try {
        await firestore.collection('Pets').add({
            // We can safely delete the ID feild after we re-deploy my branch or our assignment is graded
            Availability: "Available",
            Species: req.query.Species,
            Breed: req.query.Breed,
            Date_Added: Firestore.Timestamp.now(),
            Description: req.query.Description,
            Disposition: [
                req.query.Good_With_Animals == 'true', 
                req.query.Good_With_Children == 'true', 
                req.query.Must_Be_Leashed == 'true'
            ],
            Name: req.query.Name,
            Age: Number(req.query.Age),
            imageURL: req.query.imageURL
        });
   } catch (err) {
       console.log(err);
   }
});

app.delete('/', async (req, res) =>{
    try {
        await firestore.collection('Pets').doc(req.query.id).delete();
        const matchQuery = firestore.collection('Match').where('PetID', '==', req.query.id);
        const docs = await matchQuery.get();
        for (let doc of docs.docs) {
            await firestore.collection('Match').doc(doc.id).delete();
        }
        res.status(204).end();
    } catch (err) {
        console.log(err);
    }
});

// *** End Pet controller functions ***

module.exports = app;
module.exports.get_pet_by_id = get_pet_by_id;
module.exports.format_pet_info = format_pet_info;