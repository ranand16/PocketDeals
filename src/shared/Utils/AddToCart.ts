export const AddToCart = (cart, newItem) => {
    let newCart = [...cart]
    const newItemToBeAdded = [...cart].filter((prod)=> {
        return prod.id === newItem.id
    })
    if(newItemToBeAdded.length>0) { // if item is already there in the cart
        newCart.map((product)=> {
            if(product.id === newItem.id) return { ...product, count: ++product.count }
            return product
        })
    } else {
        newCart.push(createNewProduct(newItem))
    }
    return newCart
}

const createNewProduct = (newProduct) => ({
    id: newProduct.id,
    productDetails: newProduct,
    count: 1
});

export const RemoveFromCart = (cart, id) => {
    let newCart = [...cart]
    const newItemToBeRemoved = [...cart].filter((prod)=> prod.id === id)
    if(newItemToBeRemoved.length>0) { // if item is already there in the cart
        newCart.map((product)=> {
            if(product.id === id) return { ...product, count: --product.count }
        })
        return newCart.filter(product => product.count !== 0)
    } 
    else return cart
}