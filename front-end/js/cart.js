import { formattedPrice, optionsTemplate, cartNumber } from './main.js'
let parsedData = JSON.parse(localStorage.getItem('cart'))

const createTemplate = () => {
    if (!parsedData || parsedData.length > 0) {
        const template = parsedData.map(productTemplate).join('')
        document.querySelector('.cart').innerHTML += totalTemplate()
        document.querySelector('.list-container').innerHTML = template
        document.querySelector('.cart-empty').style.display = 'none'
    } else {
        document.querySelector('.cart-active').style.display = 'none'
    }
}

const productTemplate = (data) => {
    const { _id, lenses, name, price, imageUrl } = data.product
    return `<div class="product-container"><div class="left-container"><a href="single-product.html?id=${_id}"><img src="${imageUrl}"></a><a href="single-product.html?id=${_id}"><span>${name}</span></a></div><div class="cart-info"><span>${formattedPrice(price)}</span>
    ${optionsTemplate(lenses, data.selectedOption)}<button value="${_id}" class="delete">delete</button></div></div><hr>`
}
const totalTemplate = () => {
    return `<div class="totalBox"><span>order summary</span><hr><div><span>Total</span><span class="total-price">${totalPrice()}</span></div><hr><button>order now</button></div>`
}
const totalPrice = () => {
    let data = JSON.parse(localStorage.getItem('cart'))
    data = data.map(item => {
        return item.product.price
    })
    const totalPrice = data.reduce((a, b) => a + b, 0)
    return formattedPrice(totalPrice)
}
createTemplate()
document.querySelectorAll('.option').forEach((opt, index) => {
    opt.addEventListener('change', (e) => {
        let parsedData = JSON.parse(localStorage.getItem('cart'))
        if (parsedData) {
            opt = opt.options[opt.selectedIndex].text
            parsedData[index].selectedOption = opt
            localStorage.setItem('cart', JSON.stringify(parsedData))
        }
    })
})
document.querySelectorAll('.product-container').forEach(elm => {
    elm.querySelector('.cart-info .delete').addEventListener('click', (e) => {
        let data = JSON.parse(localStorage.getItem('cart'))
        data = data.filter(elm => {
            if (elm.product._id != e.target.value) {
                return elm
            }
        })
        localStorage.setItem('cart', JSON.stringify(data))
        document.querySelector('.total-price').innerHTML = totalPrice()
        cartNumber()
        elm.remove()
        if (data.length == 0) {
            document.querySelector('.cart-active').style.display = 'none'
            document.querySelector('.cart-empty').style.display = 'flex'
        }
    })
})
cartNumber()