import { formattedPrice } from './format.js'
import { optionsTemplate } from './options.js'

const getId = () => {
    const url = new URL(document.URL)
    return url.searchParams.getAll('id')
}
const fetchProduct = async() => {
    try {
        let response = await fetch('http://localhost:3000/api/cameras/' + getId())
        let data = await response.json()
        return data
    } catch (e) {
        console.log(new Error(e))
        document.querySelector().innerHTML
    }
}
const createTemplate = async(res) => {
    let data = await res
    document.querySelector('main').innerHTML = productTemplate(data)
}
const productTemplate = (data) => {
    const { lenses, name, price, description, imageUrl } = data
    document.title = name
    return `<div class="item-holder"><img class="item-holder-img" src="${imageUrl}"><h2>${name}</h2>
       <hr><div class="info-container"><span>${formattedPrice(price)}</span>${optionsTemplate(lenses)}
       <button><span><i class="fas fa-shopping-cart"></i> add to cart</span></button></div><hr><p class=description>${description}</p></div>
        `
}


createTemplate(fetchProduct())