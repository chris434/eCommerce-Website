import { formattedPrice, cartNumber, updateCart, localData } from './main.js'
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
    const { text, value } = localData(_id)
    return `<div class="item-holder display"><a href="single-product.html?id=${_id}"><div class="zoom"><img class="item-holder-img" src="${imageUrl}"></div></a><h2><a href="single-product.html?id=${_id}">${name}</a></h2>
       <hr><span>${formattedPrice(price)}</span><p class="eclipse-text">${description}</p><button class="add-to-cart" value="${value}"><span class="bnt-status"><i class="fas fa-shopping-cart"></i> ${text}</span></button></div>
        `
}

const load = async() => {
    const data = await getAll()
    await createTemplate(data)
    document.querySelectorAll('.add-to-cart').forEach((bnt, index) => {
        bnt.addEventListener('click', (e) => {
            const value = bnt.value
            const selected = data[index].lenses[0]
            const textStatus = updateCart(selected, value, data[index])
            bnt.querySelector('.bnt-status').innerHTML = textStatus.text
            bnt.value = textStatus.value
        })
    })
    document.querySelector('#cart-button').addEventListener('click', (e) => {
        window.location.href = 'cart.html'

    })

}
load()
cartNumber()