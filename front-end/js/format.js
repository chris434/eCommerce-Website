const formattedPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}
const formattedDescription = (des) => {
    return des.substr(0, 40).padEnd(43, '.')
}
export { formattedPrice, formattedDescription }