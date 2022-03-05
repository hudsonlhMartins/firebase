const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

const productId = 'EYRQzmgsLLHohokvsQRE'
const imageRef = db.collection('products').doc(productId).collection('images').doc()
// aqui criando outra collection dentro de product
imageRef
    .set({
        description: 'my image',
        url: 'http://localhost:3000/api/images'
    })
    .then(res =>{
        console.log(res)
    })

