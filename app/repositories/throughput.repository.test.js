import ThroughputRepository from './throughput.repository'
const throughputRepository = new ThroughputRepository()

it('throughputRepository is defined', async () => {
    expect(throughputRepository).toBeDefined()
})

it('find method is defined', async () => {
    const result = throughputRepository.find()

    expect(result).toBeDefined()
})