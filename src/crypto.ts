import { LoginData, RegistrationData } from "./models";
import { HTTPError } from "./utils";

/**
 * Register a user
 * @param form 
 */
export const registerUser = ({ email, username, hash }: RegistrationData) => {
    // TODO @jahnavi
    const registrationSuccess = false
    if (!registrationSuccess) {
        throw new HTTPError('Oh no reg failed!', 401)
    }
}
/**
 * Login a user
 * @param form 
 */
export const loginUser = ({ username, hash }: LoginData) => {
    // TODO @jahnavi
    throw new HTTPError('not implemented', 404)
}