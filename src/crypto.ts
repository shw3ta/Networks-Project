import { LoginData, RegistrationData } from "./models";
import { HTTPError } from "./utils";
import MD5 from 'md5'

/** in memory DB */
const registrations: { [k: string]: { md5: string } } = {}
const MD5_ROUNDS = 10
/**
 * Register a user
 * @param form 
 */
export const registerUser = ({ email, username, hash }: RegistrationData) => {
    // throw error if already registered
    if(registrations[username]) {
        throw new HTTPError('Username already registered', 409)
    }
    const salt = new Date().toISOString()
    
    let md5 = MD5(hash + salt)
    for (let i = 0; i <= MD5_ROUNDS; i++) {
        md5 = MD5(md5)
    }
    md5 = `${salt}$${MD5_ROUNDS}$${md5}` 
    registrations[username] = {
        md5
    }
    registrations[email] = registrations[username]
    console.log(`${username} successfully registered`)
}
/**
 * Login a user
 * @param form 
 */
export const loginUser = ({ username, hash }: LoginData) => {
    // throw error username not registered
    const registration = registrations[username]
    if (!registration) throw new HTTPError('Username not registered', 404)

    const { md5 } = registration
    const [ salt, rounds, rawMD5 ] = md5.split('$')

    let receivedMD5 = MD5(hash + salt)
    for (let i = 0; i <= +rounds; i++) {
        receivedMD5 = MD5(receivedMD5)
    }
    // if auth failed
    if (rawMD5 !== receivedMD5) {
        throw new HTTPError('Authentication failed', 401)
    }
    // success!
}