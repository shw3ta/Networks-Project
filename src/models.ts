import { Record, Static, String } from 'runtypes'

export const RegistrationForm = Record({
    email: String,
    username: String,
    hash: String
})
export type RegistrationData = Static<typeof RegistrationForm>
export const LoginForm = Record({
    username: String,
    hash: String
})
export type LoginData = Static<typeof LoginForm>