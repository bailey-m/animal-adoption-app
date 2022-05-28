const express = require('express');
const bodyParser = require('body-parser');
const fs = require('../lib/firestore');

const firestore = fs.firestore;
const app = express.Router();
app.use(bodyParser.json());


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

// *** Start Users controller functions ***

app.get('/', async (req, res) => {
    try {
        let user_collection = await fs.get_collection_ids('Users');
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
    } catch (err) {
        console.log(err);
    }
});

// *** End Users controller functions ***

module.exports = app;
module.exports.get_user_by_id = get_user_by_id;