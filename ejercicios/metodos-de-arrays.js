module.exports = async (scan /*Función leer terminal*/)=>{
    //se recomienda usar una única interfaz de entrada y salida
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

    const mayoresDe18 = (users)=>{
        return users.filter(({edad})=>edad>=18);
    }
    const soloNombres = (users)=>{
        return users.map(user => user.nombre);
    }
    const soloPromedio = (users)=>{
        return users.reduce((i, {edad})=> i+edad, 0) / users.length;
    }
    let opcion;
    do {
        console.log("VISOR DE USUARIOS");
        console.log("1. Ver mayores de 18");
        console.log("2. Ver solo los nombres");
        console.log("3. El promedio de todos los alumnos");
        console.log("0. Salir")
        try {
            opcion = parseInt( await scan("Escoje una opción: "), 10);
            if (typeof opcion !== "number" || isNaN(opcion)){
                throw new Error("Falló al usar la interfaz:Dato incorrecto");
            }
        } catch (error) {
            console.log(error.message)
        }
        console.clear();
        switch (opcion) {
            case 0:
                console.log("Regresamos al menu... \n")
                break;
            case 1:
                console.log("Mayores de 18 años:");
                console.log(mayoresDe18(usuarios));
                break;
            case 2:
                console.log("Nombres:");
                console.log(soloNombres(usuarios));
                break;
            case 3:
                console.log("Promedio de edad:");
                console.log(soloPromedio(usuarios).toFixed(2)); //just 2 numbers to right  y.xx
                break;
            default:
                console.log("Dato incorrecto.\n")
                break;
        };
    } while (opcion != 0);
}; //end module

