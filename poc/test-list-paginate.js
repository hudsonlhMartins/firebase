const admin = require('firebase-admin');

const serviceAccount = require('../firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()


const pageSize = 1

const categories = db.collection('categories')
    .orderBy('category')
    .limit(pageSize+1)
    .startAfter('SmartTvs')
    .get()
categories.then(snapshot =>{
    let total = 0
    snapshot.forEach(doc =>{
        if(total < pageSize){
            console.log(doc.id, ' => ', doc.data())
        }
        total++
    })
    if(total > pageSize){
        console.log('has next')
    }else{
        console.log('doest have next')
    }
})