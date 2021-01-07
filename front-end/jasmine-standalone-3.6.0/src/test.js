const getAll = async() => {
    let response = await fetch('http://localhost:3000/api/cameras')
    let data = await response.json()
    return data
}