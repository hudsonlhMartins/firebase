const categories = require('./categories')
const products = require('./products')

const teste = async()=>{
    /*
    await products.create({
        product: 'new name',
        price: 997,
        categories: ['DKZZVlqH7fsBptMiIBne']
    })*/

    /*
    const data = await products.update('5aGoaBgZCMUlg7VFHP6f',{
        product: 'super novo name',
        categories: ['F9mwbMyy1OWgJ3pAUOAj']
    })*/

    //await products.remove('O2sNjgURcjDRnbfVxawY')

    
    /*await products.addImage('o4ZM6ty8l5ySuzyoVFe0',{
        description: 'imagem',
        url: 'url'
    })*/

    //const data = await products.findAll()
    

    const data = await products.findAllPaginete({pageSize: 2, startAfter: ''})
    console.log(data.data)
}

teste()