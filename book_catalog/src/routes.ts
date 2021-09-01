import {Router, Request, Response} from 'express'

const routes = Router();
import {getAllUsers, getUser, createUser, updateUser, deleteUser} from './controllers/UserController'

routes.get('/', (request: Request, response: Response) => {
    return response.json({message: 'hello world!'})
})

routes.get('/users', getAllUsers)
routes.get('/users/:id',getUser)
routes.post('/users', createUser)
routes.put('/users/:id', updateUser)
routes.delete('/users/:id', deleteUser)


export default routes;