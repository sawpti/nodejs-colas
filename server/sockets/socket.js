const { io } = require('../server');
const { TicketCotrol } = require('../classes/ticket-control');

let ticketCtl = new TicketCotrol();
io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {

        let siguiente = ticketCtl.siguiente();
        console.log('Siguiente ticket :' + siguiente);
        callback(siguiente);
    })

    // Emitir estado actual

    client.emit('estadoActual', {
        actual: ticketCtl.getUltimoTicket(),
        ultimos4: ticketCtl.getUltimosCuatroTkt()

    });


    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketCtl.antenderTicket(data.escritorio);

        callback(atenderTicket);

        // Notificar para actualizar la pantalla con el ultimo ticket que se está atendiendo
        // broadcas para que el mensaje le llegue a todos los usuarios
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketCtl.getUltimosCuatroTkt()
        });

    })








});