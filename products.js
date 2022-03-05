const db = require('./firebase')
const admin = require('firebase-admin')


const findAll = async ()=>{
    const products = await db.collection('products').get()
    
    if(products.empty){
        return []
    }

    const productsList = []
    products.forEach(res =>{
        productsList.push({
            ...res.data(),
            id: res.id
        })
    })
    const imgs =[]
    const products2 = []
    for await (productList of productsList){
        
        const imagesDB = await db
            .collection('products')
            .doc(productList.id)
            .collection('images')
            .get()

        imagesDB.forEach(img =>{
            imgs.push({
                ...img.data(),
                id: img.id
            })
        })
        products2.push({
            ...productsList,
            imgs
        })
    }
    return products2
}


const findAllPaginete = async({pageSize = 10, startAfter=''})=>{

    const productsDB = await db.collection('products')
                            .orderBy('product')
                            .limit(pageSize+1)
                            .startAfter(startAfter)
                            .get()

    if(productsDB.empty){
        return {
            data: [],
            total: 0
        }
    }

    let total = 0
    const products = []
    productsDB.forEach(doc =>{
        if(total < pageSize){
            products.push({
                ...doc.data(),
                id: doc.id
            })
        }
        total++
    })

    const imgs =[]
    const products2 = []
    for await (productList of products){
        
        const imagesDB = await db
            .collection('products')
            .doc(productList.id)
            .collection('images')
            .get()

        imagesDB.forEach(img =>{
            imgs.push({
                ...img.data(),
                id: img.id
            })
        })
    }

    products2.push({
        ...products,
        imgs
    })
   
    //console.log(products)

    return {
        data: products2,
        total: products.length,
        hasNext: total > pageSize,
        startAfter: total > pageSize ? products[products.length-1].category : ''
    }
}


const remove = async (id)=>{

    const imgs = await db
                .collection('products')
                .doc(id)
                .collection('images')
                .get()



    const exclusoes =[]
    imgs.forEach(img =>{
        exclusoes.push(db.collection('products').doc(id).collection('images').doc(img.id).delete())
    })

    await Promise.all(exclusoes)
    

    
    const doc =  db.collection('products').doc(id)
    await doc.delete()
    
}


const create = async ({categories, ...data})=>{

    const categoriesRefs = categories.map(cat=> db.collection('categories').doc(cat))

    const doc = db.collection('products').doc()
    await doc.set({
        ...data,
        categories: categoriesRefs

    })
}

const addImage = async (id, data)=>{

    const imageRef = db
                    .collection('products')
                    .doc(id)
                    .collection('images')
                    .doc()
    await imageRef.set(data)

}


const update = async (id ,{categories, ...data})=>{

    const categoriesRefs = categories.map(cat=> db.collection('categories').doc(cat))


    const doc = db.collection('products').doc(id)
    await doc.update({
        ...data,
        categories: admin.firestore.FieldValue.arrayUnion(...categoriesRefs)
    })
}

module.exports ={
    findAll,
    findAllPaginete,
    remove,
    create,
    update,
    addImage
}