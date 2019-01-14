import Period from "../models/period";
import ThroughputService from "./throughput.sevice";
import ThroughputRepository from '../repositories/throughput.repository';

describe('when calculate throughput', () => {
    it('given start period and end period then throughput is defined', async () => {
        let throughputRepository = new ThroughputRepository()
        const throughputService = new ThroughputService({throughputRepository})
        const periodStart = new Period('2018W50')
        const periodEnd = new Period('2019W01')

        let throughput = await throughputService.calculate(periodStart, periodEnd)

        expect(throughput).toBeDefined()
    })

    it('given only one card done in period then return 1', async () => {
        let throughputRepository = new ThroughputRepository()
        const periodStart = new Period('2018W50')
        const periodEnd = new Period('2019W01')
        const throughputService = new ThroughputService({throughputRepository})
        jest.spyOn(throughputRepository, "find").mockImplementation(async (periodStart, periodEnd) => {
            return [{issueType:'User Story', throughput: 2}, {issueType:'Bug', throughput: 1}]
        });

        let throughput = await throughputService.calculate(periodStart, periodEnd)

        expect(throughput.tasks.length).toBe(2)
        expect(throughput.tasks.find(task => task.issueType === 'User Story').throughput).toBe(2)
        expect(throughput.tasks.find(task => task.issueType === 'Bug').throughput).toBe(1)
    })
})