import Project from '../models/project'
import DataBase from './inmemory.database'

it('when define new dataBase then project and tasks array is empty', () => {
    const dataBase = new DataBase()

    expect(dataBase.getData().projects).toHaveLength(0)
    expect(dataBase.getData().tasks).toHaveLength(0)
})

it('when initilize with data then getData return this object', () => {
    const dataBase = new DataBase()

    dataBase.initialize({ projects: [], tasks: 'tasks' })

    expect(dataBase.getData()).toMatchObject({ projects: [], tasks: 'tasks' })
})
it('when initilize projects then set ids', () => {
    const dataBase = new DataBase()

    dataBase.initialize({ projects: [new Project('name', 'issue', 'done'), new Project('name1', 'issue', 'done')]})

    expect(dataBase.getData().projects[0].id).toBe(1)
    expect(dataBase.getData().projects[1].id).toBe(2)
})