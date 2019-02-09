class DataBase {
    constructor() {
        this.__dataBase = { projects: [], tasks: []}
    }
    initialize(data) {
        if (data.projects !== undefined) {
            for (let i = 0; i < data.projects.length; i++) {
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