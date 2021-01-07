const getAll = async() => {
    try {
        let response = await fetch('http://localhost:3000/api/cameras')
        let data = await response.json()
        return data
    } catch (e) {
        console.log(new Error(e))
    }
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