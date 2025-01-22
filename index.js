const readline = require('readline');
const main_interface = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

// interfaz global
const scan = (msj)=>{
    return new Promise((resolve) => {
        main_interface.question(msj, resolve);
    })
};


//modulos necesarios
const fs = require('fs');
const path = require('path');
const dir_ejercicios = path.join(__dirname, 'ejercicios');
const list_archivos = fs.readdirSync(dir_ejercicios).filter(archivo => archivo.endsWith('.js')); //all js

function imprimirMenu(){
    console.log("EJERCICIOS Y PROGRAMAS JS");
    list_archivos.forEach((archivo, numero)=>{
        console.log((numero+1)+". "+archivo);
    });
    console.log("0. Salir\n")
}

(async function main() {
    console.clear();
    let menu;
    do {
        imprimirMenu();
        menu = await scan("¿A qué archivo quieres acceder? (n°): ");
        console.clear();
        //importamos el modulo
        if(menu != 0){
            try {
                const ruta = path.join(dir_ejercicios,list_archivos[menu-1]);
                const modulo = require(ruta);
                console.log("Accediento a "+list_archivos[menu-1]+"\n");
                await modulo(scan)//pasamos la interfaz única stdin / stdout

            } catch (error) {
                console.log(error.message)
                console.error("Error en el archivo \n");
            }72+5
        }
        
    } while (menu != 0);
    main_interface.close();
})();
