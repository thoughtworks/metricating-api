import ThroughputRepository from './throughput.repository'

it('throughputRepository is defined', async () => {
    const throughputRepository = new ThroughputRepository()

    expect(throughputRepository).toBeDefined()
})

it('find method is defined', async () => {
    const throughputRepository = new ThroughputRepository()

    const result = throughputRepository.find()

    expect(result).toBeDefined()
})