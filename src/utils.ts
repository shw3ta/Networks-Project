import { Application } from "express";
import { Runtype, Static } from "runtypes";
import { STATUS_CODES } from 'http'

export type RouteParameters<T> = {
    app: Application
    method: 'get' | 'post'
    path: string
    type: Runtype<T>
    respond: (options: Static<Runtype<T>>) => Promise<any>
}
export class HTTPError extends Error {
    code: number
    constructor (message: string, code: number) {
        super (message)
        this.code = code
    }
}

export function route<T>({ app, method, type, path, respond }: RouteParameters<T>) {
    app[method](path, async (req, res) => {
        const startDate = new Date()
        const timeTakenS = () => Math.floor( (new Date().getTime() - startDate.getTime())/1000 )
        const descriptor = `${method} ${path}`
        // create a combined body from the request
        let body = req.body || {}
        
        try {
            if (req.query) body = { ...body, ...req.query } // include query in
            if (req.params) body = { ...body, ...req.params } // include params in

            // assert & throw bad request if not conforming
            try { 
                //@ts-ignore
                type?.assert (body) 
            } catch (err) { 
                throw new HTTPError(err.message, 400) 
            }
            
            const response = await respond (body)
            if (response?.redirect) res.redirect (response.redirect)
            else res.status (200).send (response)

            console.log({ path: descriptor, success: true, ip: req.ip, responseTime: timeTakenS() })
        } catch (error) {
            let code = error.code || error.status || 500
            if (typeof code !== 'number') code = 500
            res.status (code).send (
                { code, error: error.message || 'unknown', message: STATUS_CODES[code] }
            )
            const method = code >= 500 ? 'error' : 'log'
            console[method]({ 
                path: descriptor, 
                body, 
                error: error.message, 
                trace: error?.stack?.toString(), 
                ip: req.ip, 
                responseTime: timeTakenS() 
            })
        }
    })
}