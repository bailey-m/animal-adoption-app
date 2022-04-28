const express = require('express');
const cors = require('cors');
const app = express();
const {Firestore, QuerySnapshot} = require('@google-cloud/firestore');
const firestore = new Firestore();
app.use(cors());

// *** Begin Pet model functions ***

// Turns a collection into a list of document IDs
// Based on code from: https://stackoverflow.com/questions/61435004/get-all-documents-from-a-collection
const get_collection = async(collection) => {
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

// *** Begin Pet controller functions ***
app.get('/helloworld', async (req, res) => {
    let petDocument = await get_pet_by_id('MdYu8EDvl1kcZvSsK9xP');
    let data = {data: petDocument};
    res.send(data);
});

app.get('/petcard', async (req, res) => {
    // Get the list of document ids
    let collection = await get_collection('Pets');
    let pets = [];

    // Add an entry for each document
    for (var k in collection){
        let petDocument = await get_pet_by_id(collection[k]);
        let data = {data: petDocument};
        
        // This for loop only runs once, but it doesn't work without it right now. Can fix later.
        for(var k in data){
            temp = {};
            temp["id"] = data[k].ID;
            temp["name"] = data[k].Name;
            temp["image"] = data[k].imageURL;
            temp["description"] = data[k].Description;
            temp["age"] = `${data[k].Age} year(s) old`;
            temp["breed"] = data[k].Breed;
            temp["availability"] = data[k].Availability;
            temp["disposition"] = {
                goodWithAnimals: data[k].Disposition[0],
                goodWithChildren: data[k].Disposition[1],
                leashed: data[k].Disposition[2]};
            temp["species"] = data[k].Species;
            pets.push(temp);
        }
}
    res.send(pets);
});

// *** End Pet controller functions ***

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});