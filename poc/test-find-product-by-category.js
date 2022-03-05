const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const cat1 = 'Vu265KWjQ08ocGVeyNp5'
const catRef = db.collection('categories').doc(cat1)

const products = db
    .collection('products')
    .where('category', 'array-contains', catRef)
    .get()

products.then(snapshot =>{
    snapshot.forEach(doc =>{
        console.log(doc.id, ' => ', doc.data())
    })
})