import { formattedPrice } from './main.js'

const createTemple = () => {
    localStorage.removeItem('cart')
    const { products, orderId, totalPrice } = JSON.parse(localStorage.getItem('orderConfirmed'))
    document.querySelector('main').innerHTML =
        `<h1>thank you for placing your order</h1><hr><div class="order-info">
        <p><b>order id: </b>${orderId}</p><p><b>total price: </b>${totalPrice}</p></div><hr><section class="product-items">${products.map(productTemplate).join('')}</section><button id="home-page-bnt" class="orange-button">go back the home page</button>`
}
const productTemplate = (product) => {
    const { name, price, imageUrl } = product
    return `<div><img src="${imageUrl}"><h2>${name}</h2><span>${formattedPrice(price)}</span><hr></div>`
}
createTemple()
document.querySelector('#home-page-bnt').addEventListener('click', (e) => {
    localStorage.clear()
    location.href = 'index.html'
})