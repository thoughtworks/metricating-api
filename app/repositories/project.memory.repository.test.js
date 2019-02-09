import Project from '../models/project'
import ProjectInMemoryRepository from './project.memory.repository'
import DataBase from './inmemory.database'

const initializeRepository = function () {
    const dataBase = new DataBase()
    const projectRepository = new ProjectInMemoryRepository({ dataBase })
    dataBase.initialize({ projects: [
        new Project('name1', 'issueTracking1', 'done1'),
        new Project('name2', 'issueTracking2', 'done2'),
        new Project('name3', 'issueTracking3', 'done3'),
        new Project('name4', 'issueTracking4', 'done4'),
        new Project('name5', 'issueTracking5', 'done5')
    ]})
    return projectRepository
}

it('when save new project then stored and set id', async () => {
    const projectRepository = new ProjectInMemoryRepository({ dataBase: new DataBase() })

    await projectRepository.save(new Project('name', 'issueTracking', 'done'))

    const project = await projectRepository.find('name')

    expect(project).toBeDefined()
    expect(project.id).toBe(1)
})

it('when find project by name, when this exits then return project', async () => {
    const projectRepository = initializeRepository()

    const project = await projectRepository.find('name4')

    expect(project).toBeDefined()
    expect(project.id).toBe(4)
    expect(project.name).toBe('name4')
    expect(project.issueTracking).toBe('issueTracking4')
    expect(project.statusDone).toBe('done4')
})