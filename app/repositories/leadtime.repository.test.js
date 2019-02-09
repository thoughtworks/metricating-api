import LeadtimeRepository from './leadtime.repository'

const leadtimeRepository = new LeadtimeRepository()

it('leadtimeRepository is defined', async () => {
    expect(leadtimeRepository).toBeDefined()
})

it('find method is defined', async () => {
    const result = leadtimeRepository.find()

    expect(result).toBeDefined()
})