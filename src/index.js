const server = require('./server')

// se não houver outra porta configurada, assumirá a porta 3000
server.listen(process.env.PORT || 3000)
