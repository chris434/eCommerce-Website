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
    let { name, price, description, imageUrl } = data
    return `<div class="item-holder"><a href="#"><img class="item-holder-img" src="${imageUrl}"></a><h2><a href="#">${name}</a></h2>
        <span>${formattedPrice(price)}</span><p>${description}</p></div>
        `
}
const formattedPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}
createTemplate(getAll())