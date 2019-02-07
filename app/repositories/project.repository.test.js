import ProjectRepository from './project.repository'

const projectRepository = new ProjectRepository()

it('projectRepository is defined', async () => {
    expect(projectRepository).toBeDefined()
})

it('find method is defined', async () => {
    const result = projectRepository.find()

    expect(result).toBeDefined()
})

it('save method is defined', async () => {
    const result = projectRepository.save()

    expect(result).toBeDefined()
})