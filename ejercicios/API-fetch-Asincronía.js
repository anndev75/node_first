module.exports = async (scan /*Función leer terminal*/)=>{
    async function imprimirProductosMenu(){
        console.log("MENU PRODUCTOS");
        console.log("1. Buscar por ID");
        console.log("2. Buscar por nombre");
        console.log("4. Buscar por categoría");
        console.log("0. Salir");
        return await scan("Elije una opción: ");
    };
    async function imprimirCatergoriasMenu() {
        console.log("MENU CATEGORÍAS");
        console.log("1. Ver todos las Categorías");
        console.log("2. Buscar Productos por NOMBRE de categoría");
        console.log("3. Buscar Productos por ID de categoría");
        console.log("0. Salir");
        return await scan("Elije una opción: ");
    };
    async function imprimirUsuariosMenu() {
        console.log("MENU USUARIOS");
        console.log("1. Ver información por nombre");
        console.log("2. Acceder a Email");
        console.log("3. Hackear");
        console.log("0. Salir");
        return await scan("Elije una opción: ");
    };

    async function barraDeCarga(msj,time,msj2, time2){
        return new Promise((resolve, reject) => {
            for(let i=0; i<101; i++){
                setTimeout(()=>{
                    console.clear();
                    console.log(msj);
                    console.log("["+"X".repeat(parseInt(i/2))+" ".repeat(50-parseInt(i/2))+"] "+i+"%")
                    
                },time*i)
            }
            setTimeout(()=>{
                console.clear();
                console.log(msj2);
                console.log("["+"X".repeat(100/2)+"] 100%");
                resolve(true);
            }, time*100+time2) 
        })
               
    };

    function buscarPor(field, data, uservalue) {
        return data.filter(element => {
            if (uservalue == ''){
                return false;
            }
            if (typeof element[field] === 'number') {
                return element[field] === parseInt(uservalue, 10);
            }
            if (typeof element[field] === 'string') {
                return element[field].toLowerCase().includes(uservalue.toLowerCase());
            }
            return false;
        });
    };

    async function rango(field, data, [min,max],callback){
        let valor = [];
        data.forEach((element)=>{
            if (element[field] >= parseInt(min) && element[field] <= parseInt(max)){
                valor.push(element);
            }
        });
        return await callback(valor);
    };

    async function lista_por_categoria(field, datos, uservalue) {
        console.log(uservalue);
        let valor = await datos.filter(({category})=>{
                return (typeof category[field] == 'number' && category[field] == parseInt(uservalue, 10) 
                || typeof category[field] == 'string' && category[field].toLowerCase().includes(uservalue.toLowerCase()));
                //validado
            })
        return valor;
    };

    async function buscarUserName(data) {
        console.log("CONSULTAR POR NOMBRE");
        console.log(data.length+" usuarios registrados en nuestra base.")
        let users = buscarPor('name',data, await scan("Ingrese el nombre del individuo: "));
        await users.forEach((user)=>{
            console.log("\tid: "+user.id+"\tname: "+user.name+"\temail:"+user.email);
        })     
    };
    
    async function accederEmail(data){
        let user;
        async function pedirPassword(user_object) {
            let i=0;
            do {
                console.info("Puedes acceder a la contraseña hackeando al individuo.\n")
                user_password = await scan("Introduce tu contraseña de "+user.email+": ");
                if (user_object.password === user_password){
                    return true;
                }else{
                    i++;
                    console.clear();
                    if(i == 5){
                        console.log("Consumidos 5/5 intentos.");
                        break;
                    }else{
                        console.log("Consumidos "+(i+1)+"/5 intentos.");
                        console.log("Contraseña incorrecta");
                    }
                    
                }
            } while (true);
            return false
        }
        async function login(){
            console.log("ACCDER A EMAIL");
            const list = await buscarPor('email', data, await scan("Escribe tu correo: "));
            if (list.length == 0){
                console.log("Correo no encontrado!");
                return false;
            }else{
                console.log("Encontré estas cuentas asociadas: ")
                list.forEach((account)=>{
                    console.log("id: "+account.id+"\tnombre: "+account.name+"\tcorreo: "+account.email);
                })
                do { //pedir id
                    let user_id = await scan("Introduce el ID del usuario: ")
                    if (Number.isNaN(user_id)) {
                            console.log("Introduce un valor válido");
                            continue;
                    } else {
                        user = buscarPor('id',list,parseInt(user_id))[0];
                        console.clear();
                        let autentication = await pedirPassword(user);
                        if (autentication == true){
                            return await barraDeCarga("Accediendo a "+user.email+".",95,"Bienvenido "+user.name+"!!!",2000);
                        }else{
                            console.log("No accediste a "+user.email);
                        }
                    }
                } while (true);
            }
        }
        async function menu(){
            console.clear();
            console.log("Información de "+user.name+":");
            console.log(user);

            const salir = await scan('Introduce "exit" para salir: ')

            if (salir == "exit"){
                return false; //log = false
            }else{
                return true; //log = true
            }
        }
        let log = await login();
        if (log == true){
            do {
                if (log == true){
                    log = await menu();
                    continue;
                }else{
                    log = !await barraDeCarga("saliendo...",15,"Saliste de"+user.email,10);
                    break;
                }
            } while (true);
        }
    }

    async function Hackear(data) {
        do {
            let user_id = await scan("Introduce un ID de usuario: ")
            if (Number.isNaN(user_id)) {
                console.log("Introduce un número válido.");
                continue;
            } else {
                const list = buscarPor('id', data, parseInt(user_id));

                if (list.length == 0) {
                    console.log("Usuario no encontrado.");
                    continue;
                }else{
                    let hack = await barraDeCarga("Hackeando",16,"Hackeo Completado!!",15);
                    if(hack == true){
                        return list[0];
                    };
                }
            }
        } while (true);
        
    };

    async function productos() {
        console.log("Haciendo Petición API... ");
        const data = await (await fetch("https://api.escuelajs.co/api/v1/products")).json();
        console.clear();
        let menu = 0;
        let info = '';
        do {
            menu = parseInt(await imprimirProductosMenu());
            switch (menu) {
                case 0:
                    info = "Muchas gracias por visitar\n";
                    break;
                case 1:
                    try {
                        info = await buscarPor('id',data,await scan("Escribe el ID: "));
                    } catch (error) {
                        console.error(error.message);
                        console.log("Inaccesible");
                    }
                    break;
                case 2:
                    try {
                        info = await buscarPor('title',data,await scan("Escribe el Nombre: "));
                    } catch (error) {
                        console.error(error.message);
                        console.log("Inaccesible");
                    }
                    break;
                case 3:
                    try {
                        info = await rango('price', data, [await scan("El Precio Mínimo: "),await scan("El Precio Máximo: ")],(lista)=>{
                            return lista;
                        });
                    } catch (error) {
                        console.error(error.message);
                        console.log("Inaccesible");
                    }
                    break;
                default:
                    info = "Dato incorrecto"
                    break;
            }
            console.log(info);
        } while (menu != 0);
    };

    async function categorias() {
        console.log("Haciendo Petición API... ");
        const data = await (await fetch("https://api.escuelajs.co/api/v1/categories")).json();
        const data2 = await (await fetch("https://api.escuelajs.co/api/v1/products")).json();
        console.clear();
        let menu = 0;
        let info = '';
        do {
            menu = parseInt(await imprimirCatergoriasMenu());
            console.clear();
            switch (menu) {
                case 0:
                    info = "Muchas gracias por visitar...\n";
                    break;
                case 1:
                    try {
                        info = data;
                    } catch (error) {
                        console.error(error.message);
                        console.log("Inaccesible");
                    }
                    break;
                case 2:
                    try {
                        console.log(await data.map(({name})=>name));
                        info = await lista_por_categoria('name', data2, await scan("Selecciona el nombre de la catégoría:"));
                    } catch (error) {
                        console.error(error.message);
                        console.log("Inaccesible");
                    }
                    break;
                case 3:
                    try {
                        console.log(data.map(({id})=>id));
                        info = await lista_por_categoria('id', data2, await scan("Selecciona un ID para ver la catégoría:"));
                    } catch (error) {
                        console.error(error.message);
                        console.log("Inaccesible");
                    }
                    break;
                case 4:
                    info = "Selecciona la opción 2 para buscar los productos por categorías....\n";
                    break;
                default:
                    info = "Dato incorrecto"
                    break;
            }
            console.log(info);
        } while (menu);
    };

    async function usuarios(){
        console.log("Haciendo Petición API... ");
        const data = await (await fetch("https://api.escuelajs.co/api/v1/users")).json();
        console.clear();
        let menu;
        do {
            menu = parseInt( await imprimirUsuariosMenu());
            console.clear();
            switch (menu) {
                case 0:
                    console.log("Gracias por Usar el servicio... ");
                    break;
                case 1:
                    try {
                        await buscarUserName(data);
                    } catch (error) {
                        console.log(error.message);
                    }
                    break;
                case 2:
                    try{
                        await accederEmail(data);
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case 3:
                    try{
                        let user_info = await Hackear(data);
                        console.log(user_info);
                    } catch (error) {
                        console.log(error.message);
                    }
                    break;
                default:
                    console.log("Opción incorrecta. ")
                    break;
            }
        } while (menu != 0);
    };

    let menu = 0;
    do {
        console.log("COSUMIR LA API FAKE STORE PLATZI (Just GET)");
        console.log("1. Ver productos");
        console.log("2. Ver Categorías");
        console.log("3. Ver Usuarios");
        console.log("0. Salir");
        menu = parseInt(await scan('Elije una opción: '));
        console.clear();
        switch (menu) {
            case 0:
                console.log("Regresamos al Selector de Archivos...\n");
                break;
            case 1:
                await productos();
                break;
            
            case 2:
                await categorias();
                break;
            case 3:
                await usuarios();
                break;
            default:
                console.log("Dato incorrecto")
                break;
        }
    } while (menu != 0);
}