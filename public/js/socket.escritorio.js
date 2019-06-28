var socket = io();
var searchParams = new URLSearchParams(window.location.search);
var label = $('small');
socket.on('connect', function() {

    console.log('Conectado al servidor');
});
// on para escuchar
socket.on('disconnect', function() {
    console.log('El servidor se ha desconectado');
})

//console.log(searchParams);

if (!searchParams.has('escritorio')) // si no se envio el paramatro escritorio
{
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}


var escritorio = searchParams.get('escritorio')
console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay ticket') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);

        console.log(resp);
    })

})