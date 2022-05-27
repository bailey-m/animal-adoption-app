const express = require('express');
const cors = require('cors');
const app = express();

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

// *** Begin Users model functions ***

async function get_user_by_id(userId) {
    try {
        let documentRef = firestore.doc('Users/' + userId);
        return documentRef.get().then(documentSnapshot => {
            if (documentSnapshot.exists) {
                return documentSnapshot.data();
            } else {
                return 'No data retrieved';
            }
        })
    } catch(err) {
        console.log(err);
    }
}

// *** End Users model functions ***

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
            let petDoc = await get_pet_by_id(petID);
            let pet = format_pet_info(petDoc, petID);

            matches.push(pet);
        }

        return matches;

    } catch (error) {
        console.log(error);
    }
}

// *** End Match model functions ***

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
    var date = req.query.date.replaceAll("-","");
    // Add an entry for each document
    for (var pet_id of pet_collection){
        let petDocument = await get_pet_by_id(pet_id);
        temp = format_pet_info(petDocument, pet_id);
        var tempDate = temp.date.replaceAll("/","");
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
});

// *** End Pet controller functions ***

app.get('/news', async (req, res) => {
    // Get the list of document ids
    let news_collection = await get_collection_ids('News_Item');
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
});


app.get('/users', async (req, res) => {
    let user_collection = await get_collection_ids('Users');
    let users = [];

    for (let user_id of user_collection) {
        let userDocument = await get_user_by_id(user_id);

        temp = {
            id: user_id,
            about_me: userDocument["About Me"],
            admin: userDocument["Admin Bool"],
            email: userDocument["Email"]
        }
        users.push(temp);
    }
    res.send(users);
});

app.get('/match/:userID', async (req, res) => {
    const matches = await get_matches(req.params.userID);

    if (matches) {
        res.status(200).send(matches);
    }
})

app.post('/match', async (req, res) => {
    const response = await post_new_match(req.body.userID, req.body.petID);
    console.log(response);
    if (response) {
        res.status(200).send();
    }
})

app.post('/pets', async (req, res) =>{
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
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Mops_oct09_cropped2.jpg"
    });
});

app.post('/news', async (req, res) =>{
    await firestore.collection('News_Item').add({
        // We can safely delete the ID feild after we re-deploy my branch or our assignment is graded
        Date: Firestore.Timestamp.now(),
        Description: req.query.Description,
        Title: req.query.Title,
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Mops_oct09_cropped2.jpg'
    });
});

app.delete('/pets', async (req, res) =>{
    await firestore.collection('Pets').doc(req.query.id).delete();
});

app.delete('/news', async (req, res) =>{
    await firestore.collection('News_Item').doc(req.query.id).delete();
});

app.use('/', require('./api/index'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});