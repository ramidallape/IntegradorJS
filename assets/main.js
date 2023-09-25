//contenedor de productos

const productsContainer = document.querySelector(".cards");
const showMoreBtn = document.querySelector(".btn_load");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");

//carrito

const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const menuBtn = document.querySelector(".menu_label");
const barsMenu = document.querySelector(".navbar_list");
const overlay = document.querySelector(".overlay");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const successModal = document.querySelector(".add-modal");
const buyBtn = document.querySelector(".btn-buy");
const deleteBtn = document.querySelector(".btn-delete");
const cartBubble = document.querySelector(".cart-bubble");

//funcion para renderizar lista de productos

const createProductTemplate = (product) => {
    const { id, name, precio, cardImg } = product;
    return `
    <div class="container">
        <div class="card">
            <img src="${cardImg}" class="card_img" alt=${name}>
            <div class="card_info">
                <div class="card_user">
                    <div class="user_text">
                        <h4 class="user_title">${name}</h4>
                        <p class="user_desc">$${precio}</p>
                    </div>
                </div>
                <div class="card_btn">
                    <button class="btn_buy"
                    data-id= '${id}'
                    data-name= '${name}'
                    data-precio='${precio}'
                    data-img='${cardImg}'>Comprar</button>
                </div>
            </div>
        </div>
    </div>`;
};

//funcion para el indice renderizado de la lista es igual al limite de productos 

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit -1;
};

//funcion para mostrar mas productos en el boton ver mas

const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }
};

//funcion que me permite el primer renderizado de mi aplicacion sin necesidad de escuchar el evento

const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList.map(createProductTemplate).join("");
};

//funcion de filtrar por categoria

const applyFilter = ({ target}) => {
    if(!isInactiveFilterBtn(target)) return;
    changeFilterState(target);
    //limpiar el div para mostrar cosas filtradas
    productsContainer.innerHTML = '';
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};

//renderizar productos filtrados

const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
}

//chequeo si el boton que se apreto no es un boton de categoria o ya esta activo asi no hace nada 

const isInactiveFilterBtn = (element) => {
    return ( 
        element.classList.contains("category") &&
        !element.classList.contains("active")
        );
};

//cambio el estado del filtro

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState (appState.activeFilter);
    setShowMoreVisibility();
};

//funcion para cambiar el estado de los botones de categorias

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    })
};

//funcion para mostrar u ocultar el boton ver mas 

const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden")
        return
    }
    showMoreBtn.classList.add("hidden")
};

//togglea el cart y si el menú está abierto, lo cierra. Finalmente, muestra el overlay si no había nada abierto y se está abriendo el carrito.
const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");

    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return; 
    }
    
    overlay.classList.toggle("show-overlay");

};

//función para mostrar u ocultar el menú hamburguesa y el overlay, según corresponda
const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return; //si ya había algo abierto, no se togglea el overlay, por eso el return
    }
    overlay.classList.toggle("show-overlay");
};

//hacemos una función para cerrar el menú hamburguesa o el carrito y ocultar el overlay cuando el usuario scrolee
const closeOnScroll = () => {
    if (
        !barsMenu.classList.contains("open-menu") &&
        !cartMenu.classList.contains("open-cart")
    ) {
        return
    };
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

//función para cerrar el menú hamburguesa y el overlay cuando se hace click en un link
const closeOnClick = (e) => {
    //chequeo que sea un click en el link
    if (!e.target.classList.contains("navbar_list-item")) {
        return
    };
    //si estoy efectivamente haciendo click en una etiqueta a
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
};

//función para cerrar el menú hamburguesa o el carrito y ocultar el overlay cuando el usuario hace clik en el overlay
const closeOnOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
}


//RENDERIZAR EL CARRITO

//setear el carrito vacío o lo que esté en LS
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// función para renderizar los productos del carrito o enviar el mensaje "no hay productos"
const renderCart = () => {
    //lugar para mostrar el carrito
    if (!cart.length) {
        productsCart.innerHTML = `
        <p class="empty-msg">No hay productos en el carrito</p>
        `;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

//función para crear el template de un producto del carrito
const createCartProductTemplate = (cartProduct) => {
    const { id, name, precio, img, quantity } = cartProduct;
    return `
    <div class="cart-item">
      <img src=${img} alt="" />
      <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <p class="item-precio">Precio</p>
        <span class="item-price">$ ${precio}</span>
      </div>
      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>
    `
};

//función para mostrar el total de la compra
const showCartTotal = () => {
    total.innerHTML = `$ ${getCartTotal().toFixed(2)}`;
};

//función para obtener el total de la compra
const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0)
};

//Función para crear un objeto con la info del producto que quiero agregar al carrito.

const addProduct = (e) => {
    if (!e.target.classList.contains("btn_buy")) 
    { return };
    
    //llamo a la función para desestructurar lo que necesito utilizar 
    const product = createProductData(e.target.dataset);
    //comprobar si el producto ya está en el carro
    if (isExistingCartProduct(product)) {
        addUnitToProduct(product);
        //mostrar un feedback
        showSuccessModal("Se agregó una unidad del producto al carrito");
    } else {
        //creamos el producto en el carrito y dar feedback al usuario
        createCartProduct(product);
        showSuccessModal("El producto se ha agregado al carrito")
    };

    updateCartState();

};

// función desestructuradora
const createProductData = (product) => {
    const { id, name, precio, img } = product;
    return { id, name, precio, img };
};

//función que comprueba si el producto ya fue agregado al carrito
const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
};

//función para agregar una unidad al producto que ya tengo en el carrito

const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) =>
        cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
    );
};

//función para darle una devolución al usuario
const showSuccessModal = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
        successModal.classList.remove("active-modal")
    }, 1500);
};

//creamos un objeto con la info del producto que queremos agregar
const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
};

//habilitar o deshabilitar un botón según corresponda
//La lógica la comparten, si el carro está vacío, los saco a ambos, si hay algo en el cart los habilito
const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add("disabled");
    } else {
        btn.classList.remove("disabled");
    }
};

//Función para actualizar la cantidad de productos que el usuario va guardando en el carrito
const renderCartBubble = () => {
    //acá tenemos que mostrar la suma de los quantitis, por lo tanto aplico un método que se llama reduce
    cartBubble.textContent = cart.reduce((acc, cur) => {
        return acc + cur.quantity;
    }, 0);
};

//función de actualización del carro
const updateCartState = () => {
    //guardar carrito en LS
    saveCart();
    //renderizo el carro
    renderCart();
    //mostrar el total
    showCartTotal();

    //usamos la misma funcion para ambos botones
    disableBtn(buyBtn);
    disableBtn(deleteBtn);

    renderCartBubble();

};

/**
 * Función para manejar el evento click del botón de más de cada producto del carrito.
 */
const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(existingCartProduct);
  };

/**
 * Función para manejar el evento click del botón de menos de cada producto del carrito.
 */
const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
  
    // Si se toco en un item con uno solo de cantidad
    if (existingCartProduct.quantity === 1) {
      if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
        removeProductFromCart(existingCartProduct);
      }
      return; // Si no termino confirmando la eliminación, no hace nada, ya que sino la cantidad quedaría en 0, así que cortamos la ejecución.
    }
    substractProductUnit(existingCartProduct);
  };

// Función para quitar una unidad de producto.

const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
      return product.id === existingProduct.id
        ? { ...product, quantity: Number(product.quantity) - 1 }
        : product;
    });
  };

/**
 * Función para eliminar un producto del carrito.
 */
const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    updateCartState();
  };

/**
 * Función que maneja los eventos de apretar el botón de más o de menos según corresponda.
 */
const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
      handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
      handlePlusBtnEvent(e.target.dataset.id);
    }
    //Para todos los casos
    updateCartState();
  };
  

/**
 * Función para vaciar el carrito.
 */
const resetCartItems = () => {
    cart = [];
    updateCartState();
  };

/**
 * Función para completar la compra o vaciar el carrito.
 */
const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return; //Si el carrito está vacío, no hace nada.
    if (window.confirm(confirmMsg)) {
      resetCartItems();
      alert(successMsg);
    }
  };

/**
 * Función para disparar el mensaje de compra exitosa y su posterior mensaje de exito en caso de darse la confirmación.
 */
const completeBuy = () => {
    completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
  };
  

/**
 * Función para disparar el mensaje de vaciado de carrito y su posterior mensaje de exito en caso de darse la confirmación.
 */
const deleteCart = () => {
    completeCartAction(
      "¿Desea vaciar el carrito?",
      "No hay productos en el carrito"
    );
  };




//funcion inicializadora 
const init = () => {
    renderProducts(appState.products[0]);
    showMoreBtn.addEventListener("click", showMoreProducts);
    categoriesContainer.addEventListener("click", applyFilter);
    cartBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeOnScroll);
    barsMenu.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    productsContainer.addEventListener("click", addProduct);
    productsCart.addEventListener("click", handleQuantity);
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble(cart);
    
};
init();