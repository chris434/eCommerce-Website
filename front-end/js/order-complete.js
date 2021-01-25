import { formattedPrice } from './main.js'

const createTemple = () => {
    localStorage.removeItem('cart')
    const { products, orderId, totalPrice } = JSON.parse(localStorage.getItem('orderConfirmed'))
    document.querySelector('main').innerHTML =
        `<h1>thank you for placing your order</h1><hr><div class="order-info">
        <p><b>order id: </b>${orderId}</p><br><p><b>total price: </b>${totalPrice}</p></div><section class="product-items">${products.map(productTemplate).join('')}</section><a href="index.html"><button class="orange-button">go back the home page</button></a>`
    localStorage.clear()
}
const productTemplate = (product) => {
    const { name, price, imageUrl } = product
    return `<div><img src="${imageUrl}"><h2>${name}</h2><span>${formattedPrice(price)}</span><hr></div>`
}

createTemple()