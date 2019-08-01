class DataBase {
    constructor() {
        this.__dataBase = { projects: [], cards: []}
    }
    initialize(data) {
        if (data.projects !== undefined) {
            for (let i = 0; i < data.projects.length; i++) {
                // eslint-disable-next-line security/detect-object-injection
                data.projects[i].id = i + 1
            }
        }
        this.__dataBase = data
    }

    getData() {
        return this.__dataBase
    }
}
export default DataBase