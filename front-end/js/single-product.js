import { formattedPrice, cartNumber, localData, updateCart, optionsTemplate } from './main.js'

const getId = () => {
    const url = new URL(document.URL)
    return url.searchParams.getAll('id')

}
const url = 'http://localhost:3000/api/cameras/'
const fetchProduct = async() => {
    try {
        let response = await fetch(url + getId())
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
    const { _id, lenses, name, price, description, imageUrl } = data
    document.title = name
    const { text, value, selected } = localData(_id)
    return `<div class="item-holder"><img class="item-holder-img" src="${imageUrl}" alt="${name}"><h2>${name}</h2>
       <hr><div class="info-container"><span>${formattedPrice(price)}</span>${optionsTemplate(lenses,selected)}
       <button value=${value} class="add-to-cart"><span class="bnt-status"><i class="fas fa-shopping-cart"></i> ${text}</span></button></div><hr><p class=description>${description}</p></div>
        `
}


const load = async() => {
    const data = await fetchProduct()
    await createTemplate(data)
        //update cart
    document.querySelector('.option').addEventListener('change', (e) => {
            let parsedData = JSON.parse(localStorage.getItem('cart'))
            if (parsedData) {
                parsedData.map(item => {
                    if (item.product._id == getId()) {
                        item.selectedOption = e.target.value
                    }

                })
                localStorage.setItem('cart', JSON.stringify(parsedData))
            }
        })
        //add product to cart
    const updateCartBnt = document.querySelector('.add-to-cart')
    updateCartBnt.addEventListener('click', (e) => {
        const selectedBox = document.querySelector('.option')
        const selected = selectedBox.options[selectedBox.selectedIndex].text
        const value = updateCartBnt.value
        const textStatus = updateCart(selected, value, data)
        updateCartBnt.value = textStatus.value
        document.querySelector('.bnt-status').innerHTML = textStatus.text
    })
    document.querySelector('#cart-button').addEventListener('click', (e) => {
        window.location.href = 'cart.html'

    })

}


cartNumber()
load()