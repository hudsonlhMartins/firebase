const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const cat1 = 'DKZZVlqH7fsBptMiIBne'
const catRef = db.collection('categories').doc(cat1)
// isso aqui para criar uma referencia

const doc = db.collection('products').doc()
doc
    .set({
        product: 'nome product',
        price: 2000,
        category: [catRef]

    })
    .then(snap =>{
        console.log(snap)
    })