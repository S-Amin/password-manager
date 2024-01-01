import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'
import fs from 'node:fs'

const fastify = Fastify({
    logger: true,
})

const root = path.join(__dirname, '../../public')

fastify.register(fastifyStatic, {
    root,
    prefix: '/public/', // https://github.com/fastify/fastify-static
})

// Declare a route
fastify.get('/', (_request, reply) => {
    reply.send({ hello: 'world' })
})

fastify.get('/password-manager', (_request, reply) => {
    const file = fs.readFileSync('./index.html')
    reply.type('text/html').send(file)
})

// Run the server!
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log('Server is listening on http://localhost:3000')
})
