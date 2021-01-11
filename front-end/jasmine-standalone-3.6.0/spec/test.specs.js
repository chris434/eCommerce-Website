const getAll = async() => {
    try {
        let response = await fetch('http://localhost:3000/api/cameras')
        let data = await response.json()
        return data
    } catch (e) {
        console.log(new Error(e))
    }
}
const getUrl = () => {
    const url = new URL('http://127.0.0.1:8080/single-product.html?id=5be1ed3f1c9d44000030b06')
    return url.searchParams.getAll('id')
}




describe('fetch data', () => {
    let data
    beforeEach(async() => {
        data = await getAll()
    })
    it('should return all the entrees', () => {
        expect(data.length).toBeGreaterThan(0)
    })
})

describe('fetch product by id', () => {
    it('should get id from url', () => {
        expect(getUrl()).toEqual(['5be1ed3f1c9d44000030b06'])
    })
})