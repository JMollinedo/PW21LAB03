var http = require('http')
const port = 3333

http.createServer(function (req, res) {
    const parts = req.url.split('/').slice(1)
    switch(parts[0]){
        case 'hello':
            if(parts[1]){
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.write(`{ "hello": "${parts[1]}"}`)
                res.end()
            }
            else{
                res.writeHead(406, {'Content-Type': 'text/html'})
                res.write(`
                <!doctype html>
                <html lang="es">
                    <head>
                        <meta charset="utf-8">
                        <title>Error</title>
                    </head>
                    <body>
                        El metodo requiere 1 parametro mediante url
                    <body>
                </html>
                `)
                res.end()    
            }
            break
        default:
            res.writeHead(406, {'Content-Type': 'text/html'})
            res.write(`
            <!doctype html>
            <html lang="es">
                <head>
                    <meta charset="utf-8">
                    <title>Error</title>
                </head>
                <body>
                    No se admite el metodo ${parts[0]}
                <body>
            </html>
            `)
            res.end()
            break
    }
}).listen(port);

console.log(`Port: ${port}`)