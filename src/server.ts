import Express from 'express'

const server = (port?: number) => {
    port = port || 8000

    const app = Express()
    app.use(Express.static('./static'))
    
    app.listen(port, () => (
        console.log(`Server is running at https://localhost:${port}`)
    ))
}
server()