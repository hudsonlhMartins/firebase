const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const cart = 'EYRQzmgsLLHohokvsQRE'

const productsref = db.collection('products').doc(cart)

        db
            .collection('products')
            .doc(cart)
            .collection('images')
            .get()
            .then(imgSnap =>{
                const exclusoes =[]
                imgSnap.forEach(img =>{
                   exclusoes.push(db.collection('products').doc(cart).collection('images').doc(img.id).delete())
                })
                return Promise.all(exclusoes)
            })
            .then(()=>{
                return productsref.delete()
            })
            .then(()=>{
                console.log('averithing was deleted')
            })