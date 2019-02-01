import ProjectRepository from './project.repository'

it('projectRepository is defined', async () => {
    const projectRepository = new ProjectRepository()

    expect(projectRepository).toBeDefined()
})

it('find method is defined', async () => {
    const projectRepository = new ProjectRepository()

    const result = projectRepository.find()

    expect(result).toBeDefined()
})

it('save method is defined', async () => {
    const projectRepository = new ProjectRepository()

    const result = projectRepository.save()

    expect(result).toBeDefined()
})