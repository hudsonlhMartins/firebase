const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const products = db.collection('products').get()
products.then(snapshot =>{
    snapshot.forEach(doc =>{
        console.log(doc.id, ' => ', doc.data())
        db
            .collection('products')
            .doc(doc.id)
            .collection('images')
            .get()
            .then(imgSnap =>{
                imgSnap.forEach(img =>{
                    console.log('img => ', img.id, ' => ', img.data())
                })
            })
    })
})