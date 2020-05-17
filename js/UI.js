class UI {
    constructor() {

        // instanciar la API
        this.api = new API();

        // crear los markers con LayerGroup
        this.markers = new L.LayerGroup();

        // Iniciar el mapa
        this.mapa = this.inicializarMapa();
    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa
        // coordenadas de panama [8.9935999, -79.5197296]
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + enlaceMapa + ' Contributors',
            maxZoom: 18,
        }).addTo(map);
        return map;

    }
    mostrarEstablecimientos() {
        this.api.obtenerDatos()
            .then(datos => {
                const resultado = datos.respuestaJSON.results;

                // ejecutar la funcion para mostrar los pines
                this.mostrarPines(resultado);
            })
    }

    mostrarPines(datos) {
        // limpiar los markers [funcion de Lealet]
        this.markers.clearLayers();

        // recorrer los establecimientos
        datos.forEach(dato => {
            // destructuring
            const { latitude, longitude, calle, regular, premiun } = dato;

            // crear Popup
            const opcionesPopup = L.popup().setContent(`
                <p>Calle ${calle}</p>
                <p><b>Regular:</b> $ ${regular}</p>
                <p><b>Premiun:</b> $ ${premiun}</p>
            `)

            // agregar el pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopup);

            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }

    // buscador
    obtenerSugerencias(busquedad) {
        this.api.obtenerDatos()
            .then(datos => {
                // obtener los datos
                const resultados = datos.respuestaJSON.results;

                // Enviar el json y la busquedad para el filtrado
                this.filtrarSugerencias(resultados, busquedad);
            })
    }

    // filtra las sugerencias en base al input
    filtrarSugerencias(resultado, busquedad) {
        // filtrar con .filter
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busquedad) !== -1);
        console.log(filtro);
        // mostrar los pines
        this.mostrarPines(filtro);
    }
}