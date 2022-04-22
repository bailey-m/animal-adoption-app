const express = require('express');
const cors = require('cors');
const app = express();
const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();
app.use(cors());

// *** Begin Pet model functions ***
const get_pet_by_id = async(petId) => {
    try {
        let documentRef = firestore.doc('Pets/' + petId);
        return documentRef.get().then(documentSnapshot => {
            if (documentSnapshot.exists) {
                console.log(documentSnapshot.data())
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
// *** Begin Pet controller functions ***

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});