/*
     Modules dependencies
*/
const app = require('../config/app');
const debug = require('debug')('crud-mysql:server');
const http = require('http');
const { normalize } = require('path');
const { type } = require('os');

/* 
    Get Port from emvioroment and store in express
*/
let port = normalizePort(process.env.PORT || 4000);
app.set('port', port);

/*
    Create http server
*/
let server = http.createServer(app);

/*
    Listen on provided port, on all network interface
*/
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/*
    Normalized a port into number, string, or false
*/
function normalizePort(val){
    let port = parseInt(val, 10);

    if(isNaN(port)){
        // named pipe
        return val
    }

    if(port >= 0){
        // Port number
        return port;
    }
    return false;
}

/*
    OnError
*/
function onError(error){
    if(error.syscall != 'listen'){
        throw error;
    }

    let blid = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    
    /*
      Handle specific listen error with friledy message
    */
    switch(error.code){
        case 'EACCES':
            console.error(blid + ' require elevated privileges');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(blid + ' is ready in use');
            process.exit(1);
            break;

        default:
            throw error;
    }
}

/**
 * Event listener for http server "Listening" event
 */
function onListening(){
    console.log('Server runing in port ' + port);
    let addr = server.address();
    let blid = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + blid);
}