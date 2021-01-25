import { formattedPrice, optionsTemplate, cartNumber } from './main.js'
let parsedData = JSON.parse(localStorage.getItem('cart'))

const createTemplate = () => {
    if (parsedData && parsedData.length > 0) {
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
    return `<div class="totalBox"><span>order summary</span><hr><div><span>Total</span><span class="total-price">${totalPrice()}</span></div><hr><button class="orange-button">order now</button></div>`
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
document.querySelectorAll('.collapse').forEach(section => {
    section.addEventListener('click', (e) => {
        let header = section.parentNode.querySelector('.collapse-body')
        console.log(header)
        if (header.classList.contains('hidden')) {
            return header.classList.remove('hidden')
        }
        header.classList.add('hidden')

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
    //form

const validEmail = (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
}
const validator = (field) => {
    const input = field.querySelector('input')
    const ok = field.querySelector('#ok')
    const error = field.querySelector('#error')
    const errorText = field.querySelector('small')

    const isValid = () => {
        input.style.borderColor = 'yellowGreen'
        ok.style.visibility = 'visible'
        error.style.visibility = 'hidden'
        errorText.style.visibility = 'hidden'
    }

    if (input.id == 'email' && validEmail(input.value)) {
        isValid()
        return true
    } else if (input.value != '' && input.id != 'email') {
        isValid()
        return true
    } else {
        input.style.borderColor = 'red'
        ok.style.visibility = 'hidden'
        error.style.visibility = 'visible'
        errorText.style.visibility = 'visible'
        return false
    }

}


document.querySelectorAll('#order-form div').forEach(elm => {
    elm.addEventListener('change', (e) => {
        validator(elm)
    })

})
document.querySelector('#order-form').addEventListener('submit', async(e) => {
    e.preventDefault()
    let isTrue = true
    const formDAta = new FormData(e.target)
    const contact = Object.fromEntries(formDAta.entries())

    let productIds = JSON.parse(localStorage.getItem('cart'))
    productIds = productIds.map(item => {
        return item.product._id
    })
    let bodyData = { contact: contact, products: productIds }
    console.log(bodyData)

    document.querySelectorAll('#order-form div').forEach(elm => {
        if (!validator(elm)) {
            isTrue = false
        }
    })
    if (isTrue) {
        try {
            const response = await fetch('http://localhost:3000/api/cameras/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData)
            })
            const data = await response.json()
            const { products, orderId } = data
            localStorage.setItem('orderConfirmed', JSON.stringify({ products, orderId, totalPrice: totalPrice() }))
            location.href = 'order-response.html'
        } catch (e) {
            console.log(e)
        }

    }
})


cartNumber()