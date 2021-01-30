import { formattedPrice, cartNumber, updateCart, localData } from './main.js'
const url = 'http://localhost:3000/api/cameras'

//send request to the server and gets back all the products
const getAll = async() => {
    try {
        let response = await fetch(url)
        let data = await response.json()
        return data
    } catch (e) {
        console.log(new Error(e))
    }
}

// adds the product template to page
const createTemplate = async(res) => {
        const data = await res
        const template = data.map(productTemplate).join('')
        document.querySelector('main').innerHTML = template
    }
    //creates a template to from the data sent back from the server
const productTemplate = (data) => {
        let { _id, name, price, description, imageUrl } = data
        const { text, value } = localData(_id)
        return `<div class="item-holder display"><a href="single-product.html?id=${_id}"><div class="zoom"><img class="item-holder-img" src="${imageUrl}" alt="${name}"></div></a><h2><a href="single-product.html?id=${_id}">${name}</a></h2>
       <hr><span>${formattedPrice(price)}</span><p class="eclipse-text">${description}</p><button class="add-to-cart" value="${value}"><span class="bnt-status"><i class="fas fa-shopping-cart"></i> ${text}</span></button></div>
        `
    }
    // loads in the data
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

        //links to the cart page
        document.querySelector('#cart-button').addEventListener('click', (e) => {
            window.location.href = 'cart.html'

        })

    }
    //load gets called when the script is loaded
load()
    //gets the number of items that are in the cart
cartNumber()