import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

const fastify = Fastify({
    logger: true,
})

const root = path.join(__dirname, '../../public') //import.meta.url;

fastify.register(fastifyStatic, {
    root,
    prefix: '/public/', // optional: default '/'
    // constraints: { host: "example.com" }, // optional: default {}
})

// Declare a route
fastify.get('/', (_request, reply) => {
    reply.send({ hello: 'world' })
})

fastify.get('/password-manager', (_request, reply) => {
    reply.sendFile('index.html')
})

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log('Server is listening on http://localhost:3000')
})
