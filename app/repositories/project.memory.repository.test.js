import { fail } from 'assert'
import Project from '../models/project'
import ProjectInMemoryRepository from './project.memory.repository'
import DataBase from './inmemory.database'

const initializeRepository = function () {
    const dataBase = new DataBase()
    const projectRepository = new ProjectInMemoryRepository({ dataBase })
    dataBase.initialize({ projects: [
        new Project({ name: 'name1', issueTracking: 'issueTracking1', backlogList: ['backlog1'], workingList: ['doing1'], waitList: ['ready to do1'], doneList: ['done1']}),
        new Project({ name: 'name2', issueTracking: 'issueTracking2', backlogList: ['backlog2'], workingList: ['doing2'], waitList: ['ready to do2'], doneList: ['done2']}),
        new Project({ name: 'name3', issueTracking: 'issueTracking3', backlogList: ['backlog3'], workingList: ['doing3'], waitList: ['ready to do3'], doneList: ['done3']}),
        new Project({ name: 'name4', issueTracking: 'issueTracking4', backlogList: ['backlog4'], workingList: ['doing4'], waitList: ['ready to do4'], doneList: ['done4']}),
        new Project({ name: 'name5', issueTracking: 'issueTracking5', backlogList: ['backlog5'], workingList: ['doing5'], waitList: ['ready to do5'], doneList: ['done5']})
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

    await projectRepository.save(new Project({ name: 'name', issueTracking: 'issueTracking', backlogList: ['backlog1'], workingList: ['doing1'], waitList: ['ready to do1'], doneList: ['done1']}))

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
    expect(project.doneList[0]).toBe('done4')
})

it('when find project by name, when not found then return undefined', async () => {
    const projectRepository = initializeRepository()

    const project = await projectRepository.find('name10')

    expect(project).not.toBeDefined()
    expect(project).toBe(undefined)
})