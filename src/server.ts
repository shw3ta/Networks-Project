import Express from 'express'
import { loginUser, registerUser } from './crypto'
import { LoginForm, RegistrationForm } from './models'
import { route } from './utils'

const server = (port?: number) => {
    port = port || 8000

    const app = Express()
    app.use(Express.static('./static'))
    app.use (Express.json())
    app.use (Express.urlencoded({ extended: true }))

    route({
        app,
        method: 'post',
        path: '/register',
        type: RegistrationForm,
        respond: async body => {
            const result = await registerUser(body)
            if (typeof result === 'undefined') return { success: true }
        }
    })
    route({
        app,
        method: 'post',
        path: '/login',
        type: LoginForm,
        respond: async body => {
            const result = await loginUser(body)
            if (typeof result === 'undefined') return { success: true }
        }
    })
    
    app.listen(port, () => (
        console.log(`Server is running at https://localhost:${port}`)
    ))
}
server()