class ThroughputService {
    constructor(options){
        this.throughputRepository = options.throughputRepository
    }

    async calculate (startPeriod, endPeriod){
        return await this.throughputRepository.find(startPeriod, endPeriod).then(tasks =>{
            return {
                startPeriod: startPeriod,
                endPeriod: endPeriod,
                tasks: tasks
            }
        })
    }
}
export default ThroughputService