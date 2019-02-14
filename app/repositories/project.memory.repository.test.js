import { fail } from 'assert'
import Project from '../models/project'
import ProjectInMemoryRepository from './project.memory.repository'
import DataBase from './inmemory.database'

const initializeRepository = function () {
    const dataBase = new DataBase()
    const projectRepository = new ProjectInMemoryRepository({ dataBase })
    dataBase.initialize({ projects: [
        new Project({ name: 'name1', issueTracking: 'issueTracking1', statusDone: 'done1' }),
        new Project({ name: 'name2', issueTracking: 'issueTracking2', statusDone: 'done2' }),
        new Project({ name: 'name3', issueTracking: 'issueTracking3', statusDone: 'done3' }),
        new Project({ name: 'name4', issueTracking: 'issueTracking4', statusDone: 'done4' }),
        new Project({ name: 'name5', issueTracking: 'issueTracking5', statusDone: 'done5' })
    ]})
    return projectRepository
}
it('when constructor is emtpy parameters then error', async () => {
    try {
        new ProjectInMemoryRepository()
        fail()
    } catch (error) {
        expect(error).toMatchObject(new Error('DataBase is not defined'))
    }
})

it('when constructor is undefined parameters then error', async () => {
    try {
        new ProjectInMemoryRepository(undefined)
        fail()
    } catch (error) {
        expect(error).toMatchObject(new Error('DataBase is not defined'))
    }
})

it('when database is undefined parameters then error', async () => {
    try {
        new ProjectInMemoryRepository({ database: undefined })
        fail()
    } catch (error) {
        expect(error).toMatchObject(new Error('DataBase is not defined'))
    }
})

it('when save new project then stored and set id', async () => {
    const projectRepository = new ProjectInMemoryRepository({ dataBase: new DataBase() })

    await projectRepository.save(new Project({ name: 'name', issueTracking: 'issueTracking', statusDone: 'done' }))

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