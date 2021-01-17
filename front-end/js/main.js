//formats the price into dollars
const formattedPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}
const optionsTemplate = (arry, selected) => {
    const options = (opt) => {
        let select = ''
        if (selected == opt) {
            select = 'selected'
        }
        return `<option ${select} value="${opt}">${opt}</option>`
    }
    return `<form><label for="option">options:</label><select class="option" name="option">${arry.map(options).join('')}</select></form>`
}


//updates the cart number when a item gets added or deleted from the cart
const cartNumber = () => {
        if (localStorage.getItem('cart')) {
            const cart = JSON.parse(localStorage.getItem('cart'))
            document.querySelector('#cart-status').innerHTML = cart.length
        }

    }
    //sets the cart buttons text, value and option dependent on if the item is in the cart or not
const localData = (id) => {
        let txt
        let parsedData = JSON.parse(localStorage.getItem('cart'))
        if (parsedData) {
            parsedData.forEach(item => {
                if (item.product._id == id) {
                    return txt = { text: 'remove from cart', value: true, selected: item.selectedOption }

                }

            })
        }
        return txt || { text: 'add to cart', value: false, selected: '' }
    }
    //removes or adds a item to the localStorage 
const updateCart = (option, bntValue, data) => {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '[]')
    }

    let cart = JSON.parse(localStorage.getItem('cart'))
    if (bntValue === 'false') {
        cart.push({ product: data, selectedOption: option })
        console.log(cart)
    } else {
        cart = cart.filter(item => {
            if (item.product._id != data._id) {
                return item
            }
        })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    const { text, value } = localData(data._id)
    cartNumber()
    return { text: `<i class="fas fa-shopping-cart"></i>${text}`, value: value }

}


export { formattedPrice, cartNumber, localData, updateCart, optionsTemplate }