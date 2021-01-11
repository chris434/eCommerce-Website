const optionsTemplate = (arry) => {
    return `<form><label for="options">options:</label><select id="options">${arry.map(options).join('')}</select></form>`
}
const options = (opt) => {
    return `<option value=${opt}>${opt}</option>`
}
export { optionsTemplate }