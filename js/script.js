/* ==================================================
   SLY COMPANY
   SCRIPT.JS
================================================== */


/* ==================================================
   PRODUTOS
================================================== */

const products = [

    {
        id: 1,

        name: "Instinct Tee",

        price: 139.99,

        type: "tee",

        image: "images/Instinct001.png",

        back: "images/Instinct001Back.png",

        description:
            "A graphic tee built around instinct, reference and raw visual language."

    },


    {
        id: 2,

        name: "Signature Tee",

        price: 159.99,

        type: "tee",

        image: "images/Signature001.png",

        back: "images/Signature001Back.png",

        description:
            "The signature piece of Collection 001 — minimal from a distance, detailed up close."

    },


    {
        id: 3,

        name: "Waves Tee",

        price: 139.99,

        type: "tee",

        image: "images/Waves001.png",

        back: "images/Waves001Back.png",

        description:
            "A visual study inspired by movement, repetition and urban aesthetics."

    },


    {
        id: 4,

        name: "Topography Hoodie",

        price: 269.99,

        type: "hoodie",

        image: "images/Topography001.png",

        back: "images/Topography001Back.png",

        description:
            "A heavier statement piece combining topographic graphics with a clean silhouette."

    }

];


/* ==================================================
   FORMATAÇÃO DE PREÇO
================================================== */

function formatPrice(price) {

    return price.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ==================================================
   CRIAR CARD
================================================== */

function createProductCard(product) {

    return `

        <div class="col-12 col-sm-6 col-lg-3">

            <article class="product-card">


                <div
                    class="product-image"
                    data-product-id="${product.id}"
                >


                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="front-image"
                    >


                    <img
                        src="${product.back}"
                        alt="${product.name} back"
                        class="back-image"
                    >


                    <span class="product-overlay">

                        VIEW PRODUCT

                        <i class="bi bi-arrow-up-right"></i>

                    </span>


                </div>


                <div class="pt-3">


                    <div
                        class="d-flex justify-content-between gap-3"
                    >

                        <h3 class="product-name">

                            ${product.name}

                        </h3>


                        <p class="product-price">

                            ${formatPrice(product.price)}

                        </p>

                    </div>


                    <p class="product-meta">

                        ${
                            product.type === "tee"
                            ? "T-SHIRT"
                            : "HOODIE"
                        }

                        / ROOTS 001

                    </p>


                </div>

            </article>

        </div>

    `;

}


/* ==================================================
   RENDERIZAR PRODUTOS
================================================== */

function renderProducts(filter = "all") {

    const productGrid =
        document.getElementById(
            "products-grid"
        );


    const featuredGrid =
        document.getElementById(
            "featured-products"
        );


    /*
        Verificar qual página estamos
    */

    const target =
        productGrid || featuredGrid;


    if (!target) {

        return;

    }


    /*
        Filtrar produtos
    */

    let filteredProducts;


    if (filter === "all") {

        filteredProducts = products;

    } else {

        filteredProducts =
            products.filter(
                product =>
                    product.type === filter
            );

    }


    /*
        Gerar HTML
    */

    target.innerHTML =
        filteredProducts
            .map(createProductCard)
            .join("");


    /*
        Atualizar contador
    */

    const counter =
        document.getElementById(
            "product-count"
        );


    if (counter) {

        counter.textContent =
            filteredProducts.length;

    }


    /*
        Adicionar eventos
    */

    document
        .querySelectorAll(".product-image")
        .forEach(image => {

            image.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            image.dataset.productId
                        );


                    openProductModal(id);

                }
            );

        });

}


/* ==================================================
   MODAL DO PRODUTO
================================================== */

function openProductModal(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {

        return;

    }


    const container =
        document.getElementById(
            "product-modal-container"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div
            class="modal fade"
            id="productModal"
            tabindex="-1"
            aria-hidden="true"
        >


            <div
                class="modal-dialog modal-dialog-centered modal-xl"
            >


                <div class="modal-content border-0 rounded-0">


                    <div class="row g-0">


                        <!-- IMAGEM -->

                        <div
                            class="col-lg-7 product-modal-image"
                        >

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                            >

                        </div>


                        <!-- INFORMAÇÕES -->

                        <div
                            class="col-lg-5 p-4 p-lg-5 d-flex flex-column"
                        >


                            <button
                                type="button"
                                class="btn-close ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>


                            <p class="eyebrow mt-4">

                                ROOTS / 001

                            </p>


                            <h2 class="modal-product-title">

                                ${product.name}

                            </h2>


                            <p class="fs-5">

                                ${formatPrice(product.price)}

                            </p>


                            <p class="section-description">

                                ${product.description}

                            </p>


                            <!-- TAMANHO -->

                            <label
                                for="product-size"
                                class="form-label mt-4"
                            >

                                SIZE

                            </label>


                            <select
                                id="product-size"
                                class="form-select rounded-0"
                            >

                                <option value="P">
                                    P
                                </option>

                                <option
                                    value="M"
                                    selected
                                >
                                    M
                                </option>

                                <option value="G">
                                    G
                                </option>

                                <option value="GG">
                                    GG
                                </option>

                            </select>


                            <!-- BOTÃO -->

                            <button
                                id="add-to-cart"
                                class="sly-submit mt-auto"
                                type="button"
                            >

                                ADD TO BAG

                                <i
                                    class="bi bi-bag-plus"
                                ></i>

                            </button>


                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;


    /*
        Abrir modal
    */

    const modalElement =
        document.getElementById(
            "productModal"
        );


    const modal =
        new bootstrap.Modal(
            modalElement
        );


    modal.show();


    /*
        Adicionar produto
    */

    document
        .getElementById("add-to-cart")
        .addEventListener(
            "click",
            () => {

                const size =
                    document.getElementById(
                        "product-size"
                    ).value;


                addToCart(
                    product.id,
                    size
                );


                modal.hide();

            }
        );

}


/* ==================================================
   CARRINHO
================================================== */

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "slyCart"
            )
        ) || [];

    } catch {

        return [];

    }

}


/* ==================================================
   SALVAR CARRINHO
================================================== */

function saveCart(cart) {

    localStorage.setItem(
        "slyCart",
        JSON.stringify(cart)
    );


    updateCart();

}


/* ==================================================
   ADICIONAR
================================================== */

function addToCart(id, size) {

    const cart =
        getCart();


    const existing =
        cart.find(
            item =>
                item.id === id &&
                item.size === size
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            id: id,

            size: size,

            quantity: 1

        });

    }


    saveCart(cart);

}


/* ==================================================
   REMOVER
================================================== */

function removeFromCart(index) {

    const cart =
        getCart();


    cart.splice(
        index,
        1
    );


    saveCart(cart);

}


/* ==================================================
   ALTERAR QUANTIDADE
================================================== */

function changeQuantity(index, amount) {

    const cart =
        getCart();


    if (!cart[index]) {

        return;

    }


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(
            index,
            1
        );

    }


    saveCart(cart);

}


/* ==================================================
   ATUALIZAR CARRINHO
================================================== */

function updateCart() {

    const cart =
        getCart();


    /*
        Quantidade total
    */

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    /*
        Atualizar contador
    */

    document
        .querySelectorAll(".cart-count")
        .forEach(element => {

            element.textContent =
                totalItems;

        });


    /*
        Container
    */

    const container =
        document.getElementById(
            "cart-container"
        );


    if (!container) {

        return;

    }


    /*
        Calcular preço
    */

    let totalPrice = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    product.id === item.id
            );


        if (product) {

            totalPrice +=
                product.price *
                item.quantity;

        }

    });


    /*
        Produtos
    */

    let cartHTML = "";


    if (cart.length === 0) {

        cartHTML = `

            <div class="empty-cart text-center py-5">

                <i
                    class="bi bi-bag fs-1"
                ></i>

                <p class="mt-3">

                    Your bag is empty.

                </p>


                <a
                    href="items.html"
                    class="btn btn-dark rounded-pill px-4"
                >

                    EXPLORE COLLECTION

                </a>

            </div>

        `;

    } else {


        cartHTML =
            cart.map(
                (item, index) => {

                    const product =
                        products.find(
                            product =>
                                product.id === item.id
                        );


                    if (!product) {

                        return "";

                    }


                    return `

                        <div class="cart-item d-flex gap-3 mb-4">


                            <img
                                src="${product.image}"
                                alt="${product.name}"
                            >


                            <div class="flex-grow-1">


                                <div
                                    class="d-flex justify-content-between"
                                >

                                    <strong
                                        class="cart-item-name"
                                    >

                                        ${product.name}

                                    </strong>


                                    <button
                                        type="button"
                                        class="btn btn-sm remove-cart"
                                        data-index="${index}"
                                    >

                                        <i
                                            class="bi bi-x-lg"
                                        ></i>

                                    </button>

                                </div>


                                <p class="cart-item-info mb-2">

                                    SIZE: ${item.size}

                                </p>


                                <div
                                    class="d-flex align-items-center justify-content-between"
                                >


                                    <!-- QUANTIDADE -->

                                    <div class="quantity-control">


                                        <button
                                            type="button"
                                            class="quantity-button"
                                            data-index="${index}"
                                            data-action="decrease"
                                        >

                                            −

                                        </button>


                                        <span>

                                            ${item.quantity}

                                        </span>


                                        <button
                                            type="button"
                                            class="quantity-button"
                                            data-index="${index}"
                                            data-action="increase"
                                        >

                                            +

                                        </button>


                                    </div>


                                    <strong>

                                        ${formatPrice(
                                            product.price *
                                            item.quantity
                                        )}

                                    </strong>


                                </div>

                            </div>

                        </div>

                    `;

                }
            ).join("");

    }


    /*
        Offcanvas
    */

    container.innerHTML = `

        <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="cartCanvas"
        >


            <div
                class="offcanvas-header border-bottom"
            >

                <h5 class="offcanvas-title">

                    YOUR BAG

                    <span class="text-secondary">

                        (${totalItems})

                    </span>

                </h5>


                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                ></button>

            </div>


            <div class="offcanvas-body d-flex flex-column">


                <div>

                    ${cartHTML}

                </div>


                ${
                    cart.length > 0

                    ?

                    `

                        <div
                            class="mt-auto border-top pt-4"
                        >


                            <div
                                class="d-flex justify-content-between mb-4"
                            >

                                <strong>
                                    TOTAL
                                </strong>


                                <strong>

                                    ${formatPrice(
                                        totalPrice
                                    )}

                                </strong>

                            </div>


                            <button
                                type="button"
                                class="sly-submit w-100 justify-content-center"
                                id="checkout-button"
                            >

                                CHECKOUT

                            </button>


                            <p
                                class="text-secondary text-center mt-3 mb-0"
                                style="font-size: 10px;"
                            >

                                Demo checkout.

                            </p>


                        </div>

                    `

                    : ""

                }


            </div>

        </div>

    `;


    /*
        Remover
    */

    document
        .querySelectorAll(".remove-cart")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        Number(
                            button.dataset.index
                        )
                    );

                }
            );

        });


    /*
        Quantidade
    */

    document
        .querySelectorAll(".quantity-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    const action =
                        button.dataset.action;


                    const amount =
                        action === "increase"
                        ? 1
                        : -1;


                    changeQuantity(
                        index,
                        amount
                    );

                }
            );

        });

}


/* ==================================================
   FILTROS
================================================== */

function setupFilters() {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {


                /*
                    Remover active
                */

                buttons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                /*
                    Adicionar active
                */

                button.classList.add(
                    "active"
                );


                /*
                    Renderizar
                */

                renderProducts(
                    button.dataset.filter
                );

            }
        );

    });

}


/* ==================================================
   FORMULÁRIO
================================================== */

function setupContactForm() {

    const form =
        document.getElementById(
            "contact-form"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            /*
                Validação
            */

            if (!form.checkValidity()) {

                event.stopPropagation();

                form.classList.add(
                    "was-validated"
                );

                return;

            }


            /*
                Mostrar mensagem
            */

            const feedback =
                document.getElementById(
                    "contact-feedback"
                );


            feedback.style.display =
                "block";


            /*
                Limpar formulário
            */

            form.reset();


            form.classList.remove(
                "was-validated"
            );

        }
    );

}


/* ==================================================
   FOOTER
================================================== */

function createFooter() {

    const footer =
        document.getElementById(
            "site-footer"
        );


    if (!footer) {

        return;

    }


    footer.innerHTML = `

        <div class="footer-container">


            <div class="container-fluid px-4 px-lg-5">


                <div class="row g-5 align-items-end">


                    <div class="col-lg-4">


                        <p class="footer-location">

                            EST. 2025 —
                            SÃO PAULO, BRAZIL

                        </p>


                    </div>


                    <div class="col-lg-4">


                        <p class="footer-description">

                            SPREADING CULTURE
                            AND AESTHETICS.

                        </p>

                    </div>


                    <div class="col-lg-4">


                        <div class="footer-links">


                            <a
                                href="https://www.instagram.com/slycompanyy/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                                Instagram

                            </a>


                            <a
                                href="https://www.tiktok.com/@sly.company"
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                                TikTok

                            </a>


                            <a
                                href="mailto:slycompanyy@gmail.com"
                            >

                                E-mail

                            </a>


                        </div>

                    </div>


                </div>


                <div class="footer-bottom">


                    <span>

                        © 2025 SLY Company

                    </span>


                    <span>

                        ALL RIGHTS RESERVED.

                    </span>


                </div>


            </div>

        </div>

    `;

}


/* ==================================================
   INICIALIZAÇÃO
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /*
            Footer
        */

        createFooter();


        /*
            Carrinho
        */

        updateCart();


        /*
            Produtos
        */

        renderProducts();


        /*
            Filtros
        */

        setupFilters();


        /*
            Formulário
        */

        setupContactForm();

    }
);