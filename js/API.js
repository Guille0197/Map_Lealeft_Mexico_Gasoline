class API {
    async obtenerDatos() {

        const total = 1000;

        // obtener los datos desde la api
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);

        // retornor datos como json
        const respuestaJSON = await datos.json();

        return {
            respuestaJSON
        }
    }
}