import { formattedPrice } from './format.js'
import { formattedDescription } from './format.js'
const url = 'http://localhost:3000/api/cameras'

const getAll = async() => {
    try {
        let response = await fetch(url)
        let data = await response.json()
        return data
    } catch (e) {
        console.log(new Error(e))
    }
}

const createTemplate = async(res) => {
    const data = await res
    const template = data.map(productTemplate).join('')
    document.querySelector('main').innerHTML = template
}
const productTemplate = (data) => {
    let { _id, name, price, description, imageUrl } = data
    return `<div class="item-holder display"><a href="single-product.html?id=${_id}"><div class="zoom"><img class="item-holder-img" src="${imageUrl}"></div></a><h2><a href="single-product.html?id=${_id}">${name}</a></h2>
       <hr><span>${formattedPrice(price)}</span><p>${formattedDescription(description)}</p><button><span><i class="fas fa-shopping-cart"></i> add to cart</span></button></div>
        `
}

createTemplate(getAll())