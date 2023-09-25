const productsData = [
    {
        id: 1,
        name: "Aegis Pod",
        precio: 13900,
        category: "pod_recarg",
        cardImg: "./Imagenes/pods/aegispod.png",
    },
    {
        id: 2,
        name: "Caliburn A2",
        precio: 19200,
        category: "pod_recarg",
        cardImg: "./Imagenes/pods/caliburnA2.png",
    },
    {
        id: 3,
        name: "Doric",
        precio: 19200,
        category: "pod_recarg",
        cardImg: "./Imagenes/pods/doric.png",
    },
    {
        id: 4,
        name: "Smok",
        precio: 30000,
        category: "pod_recarg",
        cardImg: "./Imagenes/pods/smok.png",
    },

    {
        id: 5,
        name: "Aeglos",
        precio: 20000,
        category: "vaper_recarg",
        cardImg: "./Imagenes/vapers/aeglos.p1.png",
    },
    {
        id: 6,
        name: "Doric 60",
        precio: 23800,
        category: "vaper_recarg",
        cardImg: "./Imagenes/vapers/voopo.doric.png",
    },
    {
        id: 7,
        name: "Luxe 80s",
        precio: 28800,
        category: "vaper_recarg",
        cardImg: "./Imagenes/vapers/luxe80s.png",
    },
    {
        id: 8,
        name: "Vaporesso",
        precio: 40000,
        category: "vaper_recarg",
        cardImg: "./Imagenes/vapers/vaporeso.genx.png",
    },
    {
        id: 9,
        name: "Yoop Plus",
        precio: 2800,
        category: "pod_descart",
        cardImg: "./Imagenes/Podsdescartables/yoop.plus.png", 
    },
    {
        id: 10,
        name: "Maskking",
        precio: 4700,
        category: "pod_descart",
        cardImg: "./Imagenes/Podsdescartables/massking.png",  
    },
    {
        id: 11,
        name: "Party Mesh",
        precio: 5800,
        category: "pod_descart",
        cardImg: "./Imagenes/Podsdescartables/party.mesh.png",  
    },
    {
        id: 12,
        name: "Supreme",
        precio: 8200,
        category: "pod_descart",
        cardImg: "./Imagenes/Podsdescartables/supreme.png",  
    }

];

// funcion para dividir los productos en arrays de productos

const divideProductsInParts = (size) => {
    let productsList = [];
    for (let i = 0; i < productsData.length; i+= size)
        productsList.push(productsData.slice(i, i + size))
        return productsList;
};

//concepto de estado 
const appState = {
    products: divideProductsInParts(4),
    currentProductsIndex: 0,
    productsLimit: divideProductsInParts(4).length,
    activeFilter: null
};