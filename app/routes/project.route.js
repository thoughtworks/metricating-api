import { validationResult, body } from 'express-validator/check'
import ProjectFactory from '../models/projectFactory'

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
            const project = await this.projectService.create(ProjectFactory.instanceProject(request.body))
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