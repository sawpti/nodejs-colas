// Comando para establcer la conexión
var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', function() {

    console.log('Conectado al servidor');
});
// on para escuchar
socket.on('disconnect', function() {
    console.log('El servidor se ha desconectado');
})

socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual)
})

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);

    })

})


/*
h = () => {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);


    })
}

$('#btn_t').on('click', h)*/