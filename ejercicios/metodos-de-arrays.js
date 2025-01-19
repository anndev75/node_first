const readline = require('readline');
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function read(){
    return new Promise((resolve, reject) => {
        interface.question('Opción: ', (opcion)=>{
            resolve(parseInt(opcion));
        })
    })
}



//code vvv
const usuarios = [
    { nombre: "Ana Gómez", edad: 25, email: "ana.gomez@example.com" },
    { nombre: "Luis Hernández", edad: 10, email: "luis.hernandez@example.com" },
    { nombre: "María López", edad: 20, email: "maria.lopez@example.com" },
    { nombre: "Carlos Ramírez", edad: 12, email: "carlos.ramirez@example.com" },
    { nombre: "Sofía Torres", edad: 15, email: "sofia.torres@example.com" },
    { nombre: "Diego Sánchez", edad: 33, email: "diego.sanchez@example.com" },
    { nombre: "Lucía Fernández", edad: 15, email: "lucia.fernandez@example.com" },
    { nombre: "Jorge Martínez", edad: 29, email: "jorge.martinez@example.com" },
    { nombre: "Camila Morales", edad: 16, email: "camila.morales@example.com" },
    { nombre: "Andrés Pérez", edad: 31, email: "andres.perez@example.com" },
    { nombre: "Laura Vargas", edad: 23, email: "laura.vargas@example.com" },
    { nombre: "Santiago Ruiz", edad: 11, email: "santiago.ruiz@example.com" },
    { nombre: "Valeria Castillo", edad: 21, email: "valeria.castillo@example.com" },
    { nombre: "Fernando Ríos", edad: 34, email: "fernando.rios@example.com" },
    { nombre: "Paula Guzmán", edad: 25, email: "paula.guzman@example.com" },
    { nombre: "Matías Ortega", edad: 19, email: "matias.ortega@example.com" },
    { nombre: "Elena Delgado", edad: 28, email: "elena.delgado@example.com" },
    { nombre: "Iván Romero", edad: 27, email: "ivan.romero@example.com" },
    { nombre: "Natalia Navarro", edad: 24, email: "natalia.navarro@example.com" },
    { nombre: "Miguel Castro", edad: 7, email: "miguel.castro@example.com" }
];

//FILTRAR mayores de 18 años
//array solo nombres
//edad promedio

function mayoresDe18(users){
    return users.filter(({edad})=> edad >= 18);
}
function arrayNombres(users){
    return users.map(user => user.nombre);
}
function edadPromedio(users){
    return users.reduce((suma, {edad})=> suma + edad, 0) / users.length;
}


(async function main(){
        console.log('Escoje una opción: ');
        console.log('1. Mayores de 18');
        console.log('2. Solo Nombres')
        console.log('3. Edad Promedio');
        opcion = await read()
        switch (parseInt(opcion)) {
            case 1:
                console.log(mayoresDe18(usuarios));
                break;
            case 2:
                console.log(arrayNombres(usuarios));
                break;
            case 3:
                console.log(edadPromedio(usuarios));
                break;
            default:
                console.log("Opción Inválida")
                break;
        }
        interface.close();
    }
)();


