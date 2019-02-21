import { validationResult, body } from 'express-validator/check'
import Project from '../models/project'

class ProjectRoute {
    constructor(options) {
        this.projectService = options.projectService
    }

    async create(request, response) {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response.status(422).json(errors.array())
        }
        try {
            const projectOptions = {
                name: request.body.name,
                issueTracking: request.body.issueTracking,
                backlogList: request.body.backlogList,
                workingList: request.body.workingList,
                waitList: request.body.waitList,
                doneList: request.body.doneList
            }
            const project = await this.projectService.create(new Project(projectOptions))
            response.status(201).send(project)
        } catch (e) {
            return response.status(400).json([{
                msg: e.message
            }])
        }
    }

    validate() {
        return [
            body('name').not().isEmpty().withMessage('it is mandatory'),
            body('issueTracking').not().isEmpty().withMessage('it is mandatory'),
            body('backlogList').not().isEmpty().withMessage('it is mandatory'),
            body('workingList').not().isEmpty().withMessage('it is mandatory'),
            body('doneList').not().isEmpty().withMessage('it is mandatory')
        ]
    }
}
export default ProjectRoute