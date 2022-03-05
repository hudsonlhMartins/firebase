const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const categories = db.collection('categories').get()
categories.then(snapshot =>{
    snapshot.forEach(doc =>{
        console.log(doc.id, ' => ', doc.data())
    })
})