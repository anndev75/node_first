const readline = require('readline');
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function leer(mensaje) {
    return new Promise((resolve) => {
        interface.question(mensaje, respuesta => resolve(respuesta));
    });
}

async function clasificar(list, type) {
    let clasificado;
    switch (type) {
        case 1:
            const userid = await leer('ID: ');
            clasificado = list.filter(({ id }) => id === parseInt(userid));
            break;
        case 2:
            const nombre = await leer('Nombre: ');
            clasificado = list.filter(({ name }) => 
                name.toLowerCase().includes(nombre.toLowerCase())
            );
            break;
        case 3:
            const rol = await leer('Rol: ');
            clasificado = list.filter(({ role }) => 
                role.toLowerCase().includes(rol.toLowerCase())
            );
            break;
        case 4:
            clasificado = list;
            break;
        case 5:
            clasificado = "Adiós, buenas noches :VV";
            break;
        default:
            clasificado = "Opción no válida";
            break;
    }
    return clasificado;
}

function imprimirMenu() {
    console.log("MENU MISTERIOSO KLK");
    console.log("1. Buscar por ID");
    console.log("2. Buscar por Nombre");
    console.log("3. Buscar por Rol");
    console.log("4. Mostrar todos");
    console.log("5. Salir\n");
}

(async function main() {
    let menu;
    do {
        imprimirMenu();
        menu = parseInt(await leer('Escoge una opción: '));
        if (menu === 5) {
            console.log("Adiós, buenas noches :VV");
            break;
        }

        if (![1, 2, 3, 4].includes(menu)) {
            console.log("Opción no válida\n");
            continue;
        }

        try {
            const resolve = await fetch('https://api.escuelajs.co/api/v1/users');
            if (!resolve.ok) throw new Error(`Error en la API: ${resolve.status}`);
            const data = await resolve.json();
            const resultado = await clasificar(data, menu);
            console.log(resultado);
        } catch (error) {
            console.error('Error al obtener datos:', error.message);
        }
    } while (menu !== 5);
    interface.close();
})();
