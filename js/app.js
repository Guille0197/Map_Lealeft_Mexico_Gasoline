const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimientos();
})

// habilitar busquedad de establecimiento
const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
    if (buscador.value.length > 5) {
        // buscador en la api
        ui.obtenerSugerencias(buscador.value);
    } else {
        ui.mostrarEstablecimientos();
    }
})