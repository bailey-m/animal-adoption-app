const {Firestore, QuerySnapshot} = require('@google-cloud/firestore');

module.exports.firestore = new Firestore();

// Turns a collection into a list of document IDs
// Based on code from: https://stackoverflow.com/questions/61435004/get-all-documents-from-a-collection
module.exports.get_collection_ids = async(collection) => {
    try {
        let doc_list = [];
        let collectRef = this.firestore.collection(collection);
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