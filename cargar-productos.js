import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
const productos = [

/* ========================= */
/* BASICAS */
/* ========================= */

{
    nombre: "ASUS Vivobook GO 15",
    precio: "4480 Bs",
    imagen: "imagenes/vivo.jpeg",
    categoria: "basica"
},

{
    nombre: "HP PORTATIL 15-FD0113DX",
    precio: "3890 Bs",
    imagen: "imagenes/aloja.jpeg",
    categoria: "basica"
},

{
    nombre: "Lenovo Ideapad Slim 3",
    precio: "6800 Bs",
    imagen: "imagenes/hola.jpeg",
    categoria: "basica"
},

{
    nombre: "ASUS VIVOBOOK 14",
    precio: "4980 Bs",
    imagen: "imagenes/dejavu.jpeg",
    categoria: "basica"
},

{
    nombre: "LENOVO IDEAPAD SLIM3",
    precio: "6500 Bs",
    imagen: "imagenes/eu.jpeg",
    categoria: "basica"
},

{
    nombre: "Dell Inspiron 2",
    precio: "3200 Bs",
    imagen: "imagenes/basica6.jpg",
    categoria: "basica"
},

{
    nombre: "Acer Aspire 1",
    precio: "2700 Bs",
    imagen: "imagenes/basica7.jpg",
    categoria: "basica"
},

{
    nombre: "Acer Aspire 2",
    precio: "2850 Bs",
    imagen: "imagenes/basica8.jpg",
    categoria: "basica"
},

{
    nombre: "ASUS VivoBook 1",
    precio: "3100 Bs",
    imagen: "imagenes/basica9.jpg",
    categoria: "basica"
},

{
    nombre: "ASUS VivoBook 2",
    precio: "3300 Bs",
    imagen: "imagenes/basica10.jpg",
    categoria: "basica"
},

/* ========================= */
/* GAMER */
/* ========================= */

{
    nombre: "ASUS STRIX G614PP-WH94",
    precio: "18.250 Bs",
    imagen: "imagenes/gamer1.jpeg",
    categoria: "gamer"
},

{
    nombre: "LENOVO LOQ GAMING",
    precio: "8990 Bs",
    imagen: "imagenes/gamer2.jpeg",
    categoria: "gamer"
},

{
    nombre: "LENOVO LOQ 15ARP10E",
    precio: "10.280 Bs",
    imagen: "imagenes/gamer3.jpeg",
    categoria: "gamer"
},

{
    nombre: "LENOVO LEGION 7",
    precio: "19.780 Bs",
    imagen: "imagenes/gamer4.jpeg",
    categoria: "gamer"
},

{
    nombre: "MSI CYBORG 15 B2RWFKG",
    precio: "13.300 Bs",
    imagen: "imagenes/gamer5.jpeg",
    categoria: "gamer"
},

{
    nombre: "LENOVO LEGION 5 15IRX10",
    precio: "15.980 Bs",
    imagen: "imagenes/gamer6.jpeg",
    categoria: "gamer"
},

{
    nombre: "Acer Nitro 1",
    precio: "5300 Bs",
    imagen: "imagenes/gamer7.jpg",
    categoria: "gamer"
},

{
    nombre: "Acer Nitro 2",
    precio: "5600 Bs",
    imagen: "imagenes/gamer8.jpg",
    categoria: "gamer"
},

{
    nombre: "HP Victus 1",
    precio: "5800 Bs",
    imagen: "imagenes/gamer9.jpg",
    categoria: "gamer"
},

{
    nombre: "HP Victus 2",
    precio: "6100 Bs",
    imagen: "imagenes/gamer10.jpg",
    categoria: "gamer"
},

/* ========================= */
/* X360 */
/* ========================= */

{
    nombre: "HP ENVY X360 15",
    precio: "5970 Bs",
    imagen: "imagenes/361.jpeg",
    categoria: "x360"
},

{
    nombre: "ASUS VIVOOK S16 FLIP TP3604",
    precio: "4900 Bs",
    imagen: "imagenes/362.jpeg",
    categoria: "x360"
},

{
    nombre: "HP SPECTRE X360 16",
    precio: "5300 Bs",
    imagen: "imagenes/363.jpeg",
    categoria: "x360"
},

{
    nombre: "Lenovo Yoga 2",
    precio: "5500 Bs",
    imagen: "imagenes/x3604.jpg",
    categoria: "x360"
},

{
    nombre: "Dell Inspiron X360 1",
    precio: "5200 Bs",
    imagen: "imagenes/x3605.jpg",
    categoria: "x360"
},

{
    nombre: "Dell Inspiron X360 2",
    precio: "5400 Bs",
    imagen: "imagenes/x3606.jpg",
    categoria: "x360"
},

{
    nombre: "ASUS Flip 1",
    precio: "5000 Bs",
    imagen: "imagenes/x3607.jpg",
    categoria: "x360"
},

{
    nombre: "ASUS Flip 2",
    precio: "5200 Bs",
    imagen: "imagenes/x3608.jpg",
    categoria: "x360"
},

{
    nombre: "Acer Spin 1",
    precio: "5100 Bs",
    imagen: "imagenes/x3609.jpg",
    categoria: "x360"
},

{
    nombre: "Acer Spin 2",
    precio: "5300 Bs",
    imagen: "imagenes/x36010.jpg",
    categoria: "x360"
},

/* ========================= */
/* PREMIUM */
/* ========================= */

{
    nombre: "HP PAVILION 16",
    precio: "6880 Bs",
    imagen: "imagenes/premium1.jpeg",
    categoria: "premium"
},

{
    nombre: "HP OMNBOOK",
    precio: "7500 Bs",
    imagen: "imagenes/premium2.jpeg",
    categoria: "premium"
},

{
    nombre: "ACER ASPIRE A14",
    precio: "10.890 Bs",
    imagen: "imagenes/premium3.jpeg",
    categoria: "premium"
},

{
    nombre: "HP ENVY 17",
    precio: "7000 Bs",
    imagen: "imagenes/premium4.jpeg",
    categoria: "premium"
},

{
    nombre: "HP OMNIBOOK 5 16",
    precio: "8.900 Bs",
    imagen: "imagenes/premium5.jpeg",
    categoria: "premium"
},

{
    nombre: "Razer Blade 2",
    precio: "11500 Bs",
    imagen: "imagenes/premium6.jpg",
    categoria: "premium"
},

{
    nombre: "ASUS ZenBook 1",
    precio: "8700 Bs",
    imagen: "imagenes/premium7.jpg",
    categoria: "premium"
},

{
    nombre: "ASUS ZenBook 2",
    precio: "8900 Bs",
    imagen: "imagenes/premium8.jpg",
    categoria: "premium"
},

{
    nombre: "Surface Laptop 1",
    precio: "9300 Bs",
    imagen: "imagenes/premium9.jpg",
    categoria: "premium"
},

{
    nombre: "Surface Laptop 2",
    precio: "9600 Bs",
    imagen: "imagenes/premium10.jpg",
    categoria: "premium"
}

];
async function cargarProductos() {

    for (const producto of productos) {

        await addDoc(
            collection(db, "productos"),
            {
                nombre: producto.nombre,
                precio: producto.precio,
                categoria: producto.categoria,
                imagen: producto.imagen,
                descripcion: ""
            }
        );

        console.log("Producto cargado:", producto.nombre);
    }

    console.log("TODOS LOS PRODUCTOS FUERON CARGADOS");
}

cargarProductos();