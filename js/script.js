// Script para la funcionalidad de la página (modales, botones, etc.)

// ============================================
// LAZY LOADING DE IMÁGENES CON INTERSECTION OBSERVER
// ============================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.onload = () => {
                    img.classList.add('loaded');
                };
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px', // Comenzar a cargar 50px antes de que sea visible
    threshold: 0.01
});

// Función para observar una imagen con lazy loading
function observeImage(img) {
    if ('IntersectionObserver' in window) {
        imageObserver.observe(img);
    } else {
        // Fallback para navegadores antiguos
        const src = img.dataset.src;
        if (src) {
            img.src = src;
            img.classList.add('loaded');
        }
    }
}
// ============================================
// IMPORTAR PRODUCTOS DESDE EL ARCHIVO EXTERNO
// ============================================
// Nota: Los productos ahora se gestionan en el archivo productos.js
// Este objeto se llena automáticamente con los productos de ese archivo
const productsData = {};

// --- Lista completa de categorías (títulos visibles) ---
const categoryTitles = [
    '15 años',
    'Anchetas',
    'Aniversario',
    'Arreglos con Peluches',
    'Bouquet',
    'Cajas de Dulces',
    'Cajas de Lujo',
    'Decoración de Fiestas',
    'Decoración de Habitaciones',
    'Desayunos Sorpresa',
    'Detalles con Virgenes',
    'Detalles Empresariales',
    'Detalles Premium',
    'Fúnebres',
    'Nacimiento',
    'Oso Teddy',
    'Plantas de Orquídea',
    'Ramos',
    'Ramos con Dinero'
];

function slugify(text) {
    return text
        .toString()
        .normalize('NFD').replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

// Mapa de título de categoría -> archivo de imagen existente en /images
const categoryTitleToImage = {
    '15 años': '15 años.jpeg',
    'Anchetas': 'Anchetas.jpeg',
    'Aniversario': 'Aniversario.jpeg',
    'Arreglos con Peluches': 'Arreglos con Peluches.jpeg',
    'Bouquet': 'Bouquet.jpeg',
    'Cajas de Dulces': 'Cajas de Dulces.jpeg',
    'Cajas de Lujo': 'Cajas de Lujo.jpeg',
    'Decoración de Fiestas': 'Decoración de Fiestas.jpeg',
    'Decoración de Habitaciones': 'Decoración de Habitaciones.jpeg',
    'Desayunos Sorpresa': 'Desayunos Sorpresa.jpeg',
    'Detalles con Virgenes': 'Detalles con Virgenes.jpeg',
    'Detalles Empresariales': 'Detalles Empresariales.jpeg',
    'Detalles Premium': 'Detalles Premium.jpeg',
    'Fúnebres': 'Fúnebres.webp',
    'Nacimiento': 'Nacimiento.jpeg',
    'Oso Teddy': 'Oso Teddy.jpeg',
    'Plantas de Orquídea': 'Plantas de Orquídea.webp',
    'Ramos': 'Ramos.jpeg',
    'Ramos con Dinero': 'Ramos con Dinero.jpeg'
};

function resolveCategoryImageByTitle(title) {
    const file = categoryTitleToImage[title];
    return file ? `images/${file}` : undefined;
}

// Mapa por clave de categoría existente
const categoryKeyToImage = {
    anchetas: 'images/Anchetas.jpeg',
    ramos: 'images/Ramos.jpeg',
    peluches: 'images/Arreglos con Peluches.jpeg',
    cajas: 'images/Cajas de Dulces.jpeg',
    desayunos: 'images/Desayunos Sorpresa.jpeg',
    decoraciones: 'images/Decoración de Fiestas.jpeg'
};

// Establece la imagen de un elemento <img> usando varias rutas de respaldo con lazy loading
function setImageSrcWithFallback(imgEl, product, useLazyLoading = false) {
    const candidates = [];
    
    // Primero intentar con la imagen definida en el producto
    if (product && product.image) {
        candidates.push(product.image);
    }
    
    // Luego intentar con el mapeo de categorías por título
    if (product && product.categoryTitle) {
        const mapped = resolveCategoryImageByTitle(product.categoryTitle);
        if (mapped) candidates.push(mapped);
    }
    
    // Finalmente intentar con el mapeo de categorías por clave
    if (product && product.category && categoryKeyToImage[product.category]) {
        candidates.push(categoryKeyToImage[product.category]);
    }
    
    const uniqueCandidates = [...new Set(candidates.filter(Boolean))];
    let idx = 0;
    
    function loadNext() {
        if (idx >= uniqueCandidates.length) return;
        const src = uniqueCandidates[idx++];
        
        if (useLazyLoading) {
            // Usar data-src para lazy loading
            imgEl.dataset.src = src;
            imgEl.onerror = loadNext;
            observeImage(imgEl);
        } else {
            // Carga inmediata (para imágenes críticas)
            imgEl.onerror = loadNext;
            imgEl.src = src;
            imgEl.onload = () => {
                imgEl.classList.add('loaded');
            };
        }
    }
    loadNext();
}

// ============================================
// CARGAR PRODUCTOS DESDE EL ARCHIVO PRODUCTOS.JS
// ============================================
function loadProductsFromDatabase() {
    // Verificar si PRODUCTOS_LAUREL existe (importado de productos.js)
    if (typeof PRODUCTOS_LAUREL !== 'undefined') {
        // Copiar todos los productos desde PRODUCTOS_LAUREL a productsData
        Object.keys(PRODUCTOS_LAUREL).forEach(categoryKey => {
            const categoryData = PRODUCTOS_LAUREL[categoryKey];
            
            // Verificar si la categoría tiene subcategorías
            if (categoryData && typeof categoryData === 'object' && categoryData.hasSubcategories) {
                // Categoría con subcategorías
                let allProducts = [];
                
                // Agregar productos de cada subcategoría
                if (categoryData.subcategories) {
                    Object.keys(categoryData.subcategories).forEach(subcategoryKey => {
                        const subcategoryProducts = categoryData.subcategories[subcategoryKey];
                        subcategoryProducts.forEach(product => {
                            allProducts.push({
                                ...product,
                                category: categoryKey,
                                subcategory: subcategoryKey,
                                categoryTitle: categoryTitles.find(title => slugify(title) === categoryKey) || categoryKey,
                                subcategoryTitle: getSubcategoryTitle(subcategoryKey)
                            });
                        });
                    });
                }
                
                // Agregar productos generales si existen
                if (categoryData.general && Array.isArray(categoryData.general)) {
                    categoryData.general.forEach(product => {
                        allProducts.push({
                            ...product,
                            category: categoryKey,
                            categoryTitle: categoryTitles.find(title => slugify(title) === categoryKey) || categoryKey
                        });
                    });
                }
                
                productsData[categoryKey] = allProducts;
            } else if (Array.isArray(categoryData)) {
                // Categoría normal (array de productos)
                productsData[categoryKey] = categoryData.map(product => {
                    return {
                        ...product,
                        category: categoryKey,
                        categoryTitle: categoryTitles.find(title => slugify(title) === categoryKey) || categoryKey
                    };
                });
            }
        });
        console.log('✅ Productos cargados exitosamente desde productos.js');
    } else {
        console.warn('⚠️ No se encontró PRODUCTOS_LAUREL. Usando productos de respaldo.');
        // Generar productos de respaldo si no existe el archivo
        ensurePlaceholderProducts();
    }
}

// Función auxiliar para obtener el título de una subcategoría
function getSubcategoryTitle(subcategoryKey) {
    const subcategoryTitles = {
        'dama': 'Dama',
        'caballero': 'Caballero',
        'ninos': 'Niños'
    };
    return subcategoryTitles[subcategoryKey] || subcategoryKey;
}

// Función para verificar si una categoría tiene subcategorías
function hasSubcategories(categoryKey) {
    if (typeof PRODUCTOS_LAUREL === 'undefined') return false;
    const categoryData = PRODUCTOS_LAUREL[categoryKey];
    return categoryData && typeof categoryData === 'object' && categoryData.hasSubcategories === true;
}

// Función para obtener las subcategorías de una categoría
function getSubcategories(categoryKey) {
    if (typeof PRODUCTOS_LAUREL === 'undefined') return [];
    const categoryData = PRODUCTOS_LAUREL[categoryKey];
    if (categoryData && categoryData.hasSubcategories && categoryData.subcategories) {
        return Object.keys(categoryData.subcategories);
    }
    return [];
}

// Genera productos temporales para categorías que no existen aún (RESPALDO)
function ensurePlaceholderProducts() {
    categoryTitles.forEach((title) => {
        const key = slugify(title);
        if (!productsData[key]) {
            // Crear productos de prueba por categoría
            const basePrice = 50000; // COP
            productsData[key] = Array.from({ length: 4 }).map((_, idx) => {
                const priceValue = basePrice + idx * 10000;
                const priceStr = `$${priceValue.toLocaleString('es-CO')}`;
                return {
                    name: `${title} ${idx + 1}`,
                    price: priceStr,
                    description: `Hermoso detalle de la categoría ${title}. ¡Pregunta por disponibilidad y personalización!`,
                    category: key,
                    categoryTitle: title,
                    image: resolveCategoryImageByTitle(title)
                };
            });
        }
    });
}

// --- Variables DOM (se inicializan dentro de DOMContentLoaded) ---
let productContainer;
let categoryCards;
let paginationContainer;
const whatsappNumber = "573192523075"; // Tu número de WhatsApp

// --- Modal de Detalles del Producto ---
let productDetailModal;
let modalDetailImage;
let modalDetailName;
let modalDetailPrice;
let modalDetailDescription;
let modalDetailWhatsappBtn;
let closeModalButton;

// --- Modal de Zoom de Imagen ---
let imageZoomModal;
let zoomedImage;
let zoomCloseButton;

// --- Modal de Logo ---
let logoModal;
let logoModalImage;
let logoCloseButton;

// --- Modal de Bienvenida ---
let welcomeModal;
let welcomeCloseButton;
let welcomeStartBtn;

// --- Sistema de Favoritos ---
let favoritesModal;
let favoritesContainer;
let floatingFavoritesBtn;
let favoritesBadge;
let favorites = [];

// --- Funcionalidad Scroll To Top ---
let scrollToTopBtn;

// --- Variables de Paginación y Filtrado ---
const productsPerPage = 12; // Número de productos por página
let currentCategory = 'all'; // Categoría actualmente seleccionada
let currentPage = 1; // Página actual
let currentFilteredProducts = []; // Productos filtrados actuales

// --- Funcionalidad del Formulario de Contacto ---
let contactForm;

// --- Funcionalidad de Animación de Escritura ---
let typewriterTitle;

// --- Asignar imágenes a categorías por nombre exacto con lazy loading ---
function assignCategoryImagesByExactTitle() {
    const cards = document.querySelectorAll('.category-card');
    if (!cards || cards.length === 0) return;

    cards.forEach((card, cardIndex) => {
        const wrapper = card.querySelector('.category-card-image-wrapper');
        const titleEl = card.querySelector('h3');
        if (!wrapper || !titleEl) return;

        const exactTitle = titleEl.textContent.trim();
        if (!exactTitle) return;

        const extensionsToTry = ['.jpeg', '.jpg', '.png', '.webp'];
        let extIndex = 0;
        const probe = new Image();

        function tryLoad() {
            if (extIndex >= extensionsToTry.length) return; // No se encontró ninguna imagen
            const encodedName = encodeURIComponent(exactTitle);
            const candidateSrc = `images/${encodedName}${extensionsToTry[extIndex]}`;

            probe.onload = () => {
                let existingImg = wrapper.querySelector('img');
                if (existingImg) {
                    // Usar lazy loading solo para categorías después de las primeras 5
                    if (cardIndex >= 5) {
                        existingImg.dataset.src = candidateSrc;
                        existingImg.alt = exactTitle;
                        observeImage(existingImg);
                    } else {
                        existingImg.src = candidateSrc;
                        existingImg.alt = exactTitle;
                        existingImg.onload = () => {
                            existingImg.classList.add('loaded');
                        };
                    }
                } else {
                    const img = document.createElement('img');
                    img.alt = exactTitle;
                    // Usar lazy loading solo para categorías después de las primeras 5
                    if (cardIndex >= 5) {
                        img.dataset.src = candidateSrc;
                        observeImage(img);
                    } else {
                        img.src = candidateSrc;
                        img.onload = () => {
                            img.classList.add('loaded');
                        };
                    }
                    wrapper.appendChild(img);
                }
            };
            probe.onerror = () => {
                extIndex++;
                tryLoad();
            };
            probe.src = candidateSrc;
        }

        tryLoad();
    });
}

// --- Actualiza el texto de los botones de detalle según el ancho de la ventana ---
function updateDetailButtonLabels() {
    const isMobile = window.innerWidth <= 480;
    document.querySelectorAll('.product-card .btn-detail').forEach(btn => {
        const shouldBe = isMobile ? 'Ver' : 'Ver Detalles';
        if (btn.textContent !== shouldBe) {
            btn.textContent = shouldBe;
        }
    });
}

// --- Funciones de Carga y Filtrado ---
function getFilteredProducts(filter, subcategory = null) {
    if (filter === 'all') {
        let allProducts = [];
        for (const category in productsData) {
            allProducts = allProducts.concat(productsData[category]);
        }
        return allProducts;
    } else {
        let products = productsData[filter] || [];
        
        // Si se especifica una subcategoría, filtrar por ella
        if (subcategory) {
            products = products.filter(product => product.subcategory === subcategory);
        }
        
        return products;
    }
}

// Función para obtener productos de una subcategoría específica
function getSubcategoryProducts(categoryKey, subcategoryKey) {
    return getFilteredProducts(categoryKey, subcategoryKey);
}

// Función para actualizar el select2 de subcategorías
function updateSubcategoriesSelect(categoryKey) {
    const subcategoriesWrapper = document.getElementById('subcategoria-filtro-wrapper');
    const subcategoriesSelect = document.getElementById('subcategoria-filtro');
    
    if (!subcategoriesWrapper || !subcategoriesSelect) return;
    
    // Verificar si la categoría tiene subcategorías
    if (hasSubcategories(categoryKey)) {
        const subcategories = getSubcategories(categoryKey);
        
        // Limpiar el select
        subcategoriesSelect.innerHTML = '';
        
        // Agregar opción "Todas"
        const todasOption = document.createElement('option');
        todasOption.value = 'all';
        todasOption.textContent = '📦 Todas';
        subcategoriesSelect.appendChild(todasOption);
        
        // Agregar cada subcategoría
        subcategories.forEach(subcatKey => {
            const option = document.createElement('option');
            option.value = subcatKey;
            const subcatTitle = getSubcategoryTitle(subcatKey);
            const emoji = subcatKey === 'dama' ? '👩' : subcatKey === 'caballero' ? '👨' : '👶';
            option.textContent = `${emoji} ${subcatTitle}`;
            subcategoriesSelect.appendChild(option);
        });
        
        // Mostrar el contenedor
        subcategoriesWrapper.style.display = 'block';
        
        // Inicializar o actualizar Select2
        if (typeof jQuery !== 'undefined' && jQuery.fn.select2) {
            jQuery(function($) {
                // Si ya está inicializado, destruirlo primero
                if ($(subcategoriesSelect).hasClass('select2-hidden-accessible')) {
                    $(subcategoriesSelect).select2('destroy');
                }
                
                // Inicializar Select2 (solo una selección)
                $(subcategoriesSelect).select2({
                    placeholder: "Seleccionar subcategoría...",
                    allowClear: true,
                    language: "es",
                    width: '100%',
                    closeOnSelect: true,
                    minimumResultsForSearch: Infinity, // Deshabilitar búsqueda en subcategorías
                    templateResult: function(option) {
                        if (!option.id) return option.text;
                        return $(option.element).text();
                    },
                    templateSelection: function(option) {
                        if (!option.id) return option.text;
                        return $(option.element).text();
                    }
                });
                
                // Limpiar selección inicial
                $(subcategoriesSelect).val(null).trigger('change');
            });
        }
    } else {
        // Ocultar el contenedor si la categoría no tiene subcategorías
        subcategoriesWrapper.style.display = 'none';
        
        // Destruir Select2 si está inicializado
        if (typeof jQuery !== 'undefined' && jQuery.fn.select2) {
            jQuery(function($) {
                if ($(subcategoriesSelect).hasClass('select2-hidden-accessible')) {
                    $(subcategoriesSelect).select2('destroy');
                }
            });
        }
    }
}

function displayProducts(products, page) {
    if (!productContainer) {
        console.error("Error: productContainer no encontrado.");
        return;
    }

    // Guardar la altura actual del contenedor para mantenerla durante la transición
    const currentHeight = productContainer.offsetHeight;
    if (currentHeight > 0) {
        productContainer.style.minHeight = currentHeight + 'px';
    }

    productContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToDisplay = products.slice(startIndex, endIndex);

    productsToDisplay.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Imagen con estrategia de fallbacks robusta
        const imgEl = document.createElement('img');
        imgEl.alt = product.name;
        // Lazy loading para productos después de los primeros 4 (primera fila)
        const useLazyLoading = index >= 4;
        setImageSrcWithFallback(imgEl, product, useLazyLoading);

        // Título con botón de favoritos
        const titleEl = document.createElement('h3');
        const titleText = document.createElement('span');
        titleText.textContent = product.name;
        titleEl.appendChild(titleText);
        
        // Botón de favoritos dentro del título
        const favoriteBtn = createFavoriteButton(product);
        titleEl.appendChild(favoriteBtn);

        const pricePEl = document.createElement('p');
        pricePEl.className = 'product-price';
        pricePEl.style.display = 'none';
        pricePEl.textContent = product.price;

        const actionsEl = document.createElement('div');
        actionsEl.className = 'product-actions';

        const detailBtn = document.createElement('button');
        detailBtn.className = 'btn-detail';
        detailBtn.textContent = 'Ver Detalles';
        detailBtn.setAttribute('data-product-json', JSON.stringify(product));

        const waBtn = document.createElement('button');
        waBtn.className = 'whatsapp-icon-btn';
        waBtn.setAttribute('data-name', product.name);
        waBtn.setAttribute('data-price', product.price);
        const waImg = document.createElement('img');
        waImg.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg';
        waImg.alt = 'WhatsApp Icon';
        waBtn.appendChild(waImg);

        // Grupo izquierdo: botón y WhatsApp juntos
        const actionsLeft = document.createElement('div');
        actionsLeft.className = 'product-actions-left';
        actionsLeft.appendChild(detailBtn);
        actionsLeft.appendChild(waBtn);

        // Precio visible a la derecha de los botones
        const priceTagEl = document.createElement('span');
        priceTagEl.className = 'product-price-tag';
        const displayPrice = String(product.price || '').replace(/\s*COP\s*$/i, '');
        priceTagEl.textContent = displayPrice;

        actionsEl.appendChild(actionsLeft);
        actionsEl.appendChild(priceTagEl);

        productCard.appendChild(imgEl);
        productCard.appendChild(titleEl);
        productCard.appendChild(pricePEl);
        productCard.appendChild(actionsEl);

        productContainer.appendChild(productCard);
    });

    // Añadir listeners después de que los productos estén en el DOM
    addEventListenersToProductButtons();

    // Ajustar etiquetas de botones según el tamaño de pantalla
    updateDetailButtonLabels();

    // Remover la altura mínima después de que los productos se hayan renderizado
    setTimeout(() => {
        productContainer.style.minHeight = '';
    }, 100);
}

function setupPagination(products, selectedFilter) {
    if (!paginationContainer) {
        console.error("Error: paginationContainer no encontrado.");
        return;
    }

    // Guardar los productos filtrados actuales para usar en la paginación
    currentFilteredProducts = products;

    paginationContainer.innerHTML = ''; // Limpiar la paginación existente
    const totalPages = Math.ceil(products.length / productsPerPage);

    if (totalPages <= 1) return; // No mostrar paginación si solo hay una página

    // Configuración para mostrar 5 páginas en escritorio y 3 en móvil
    const isMobile = window.innerWidth <= 768;
    const maxVisiblePages = isMobile ? 3 : 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Ajustar startPage si estamos cerca del final
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botón "Primera página" si no estamos en la primera
    if (currentPage > 1) {
        const firstButton = document.createElement('button');
        firstButton.textContent = '«';
        firstButton.title = 'Primera página';
        firstButton.addEventListener('click', () => {
            currentPage = 1;
            displayProducts(currentFilteredProducts, currentPage);
            setupPagination(currentFilteredProducts, selectedFilter);
            scrollToProducts();
        }, { passive: true });
        paginationContainer.appendChild(firstButton);
    }

    // Botón "Anterior" si no estamos en la primera página
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = '‹';
        prevButton.title = 'Página anterior';
        prevButton.addEventListener('click', () => {
            currentPage--;
            displayProducts(currentFilteredProducts, currentPage);
            setupPagination(currentFilteredProducts, selectedFilter);
            scrollToProducts();
        }, { passive: true });
        paginationContainer.appendChild(prevButton);
    }

    // Botones de páginas (máximo 5)
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayProducts(currentFilteredProducts, currentPage);
            setupPagination(currentFilteredProducts, selectedFilter);
            scrollToProducts();
        }, { passive: true });
        paginationContainer.appendChild(pageButton);
    }

    // Botón "Siguiente" si no estamos en la última página
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = '›';
        nextButton.title = 'Página siguiente';
        nextButton.addEventListener('click', () => {
            currentPage++;
            displayProducts(currentFilteredProducts, currentPage);
            setupPagination(currentFilteredProducts, selectedFilter);
            scrollToProducts();
        }, { passive: true });
        paginationContainer.appendChild(nextButton);
    }

    // Botón "Última página" si no estamos en la última
    if (currentPage < totalPages) {
        const lastButton = document.createElement('button');
        lastButton.textContent = '»';
        lastButton.title = 'Última página';
        lastButton.addEventListener('click', () => {
            currentPage = totalPages;
            displayProducts(currentFilteredProducts, currentPage);
            setupPagination(currentFilteredProducts, selectedFilter);
            scrollToProducts();
        }, { passive: true });
        paginationContainer.appendChild(lastButton);
    }
}

// Función auxiliar para hacer scroll a la sección de productos
function scrollToProducts() {
    setTimeout(() => {
        const productsSection = document.querySelector('.products');
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 50);
}

function loadAndFilterProducts(filter, page = 1) {
    currentCategory = filter;
    currentPage = page;
    let filteredProducts = getFilteredProducts(filter);

    // Aplicar orden por precio si corresponde
    const sortSelect = document.getElementById('priceSort');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        if (sortValue === 'asc' || sortValue === 'desc') {
            filteredProducts = filteredProducts.slice().sort((a, b) => {
                const priceA = parseInt(String(a.price || '0').replace(/\D/g, '')) || 0;
                const priceB = parseInt(String(b.price || '0').replace(/\D/g, '')) || 0;
                return sortValue === 'asc' ? priceA - priceB : priceB - priceA;
            });
        }
    }
    displayProducts(filteredProducts, currentPage);
    setupPagination(filteredProducts, filter);
}

// --- Event Listeners para los botones de producto (WhatsApp y Detalles) ---
function addEventListenersToProductButtons() {
    // Selector actualizado para el icono de WhatsApp en las tarjetas de producto
    document.querySelectorAll('.product-card .whatsapp-icon-btn').forEach(button => {
        // Asegúrate de que no haya listeners duplicados
        button.removeEventListener('click', handleWhatsAppClick); 
        button.addEventListener('click', handleWhatsAppClick);
    });

    // Listener para el botón "Ver Detalles" en las tarjetas de producto
    document.querySelectorAll('.product-card .btn-detail').forEach(button => {
        // Asegúrate de que no haya listeners duplicados
        button.removeEventListener('click', handleDetailClick); 
        button.addEventListener('click', handleDetailClick);
    });

    // Listener para las imágenes de producto
    document.querySelectorAll('.product-card > img').forEach(img => {
        // Asegúrate de que no haya listeners duplicados
        img.removeEventListener('click', handleImageClick);
        img.addEventListener('click', handleImageClick);
    });
}

// Función para manejar el click en la imagen del producto
function handleImageClick() {
    // Buscar el botón de detalle dentro de la misma tarjeta
    const productCard = this.closest('.product-card');
    if (productCard) {
        const detailButton = productCard.querySelector('.btn-detail');
        if (detailButton) {
            detailButton.click();
        }
    }
}

// Funciones para manejar clics y evitar duplicados de listeners
function handleWhatsAppClick() {
    const productName = this.dataset.name;
    const productPrice = this.dataset.price;
    // En las tarjetas, también podemos obtener la categoría del producto
    const productCard = this.closest('.product-card');
    const productCategory = productCard ? productCard.dataset.category : null;
    sendToWhatsApp(productName, productPrice, null, productCategory);
}

function handleDetailClick() {
    // Parsear el JSON del dataset para obtener el objeto completo del producto
    try {
        const product = JSON.parse(this.dataset.productJson);
        openProductDetailModal(product);
    } catch (e) {
        console.error("Error al parsear el JSON del producto:", e);
    }
}

// Función mejorada para enviar mensajes a WhatsApp con más información del producto
function sendToWhatsApp(productName, productPrice, productImage = null, productCategory = null) {
    // Mensaje más completo y profesional
    let message = `¡Hola! 👋\n\nEstoy interesado/a en el siguiente producto de Detalles Laurel Medellín:\n\n`;
    message += `🌸 *${productName}*\n`;
    message += `💰 Precio: ${productPrice}\n`;
    
    // Agregar categoría si está disponible
    if (productCategory) {
        message += `🏷️ Categoría: ${productCategory}\n`;
    }
    
    message += `\n💬 Por favor, brindame más información sobre:\n`;
    message += `• Disponibilidad\n`;
    message += `• Tiempo de entrega\n`;
    message += `• Opciones de personalización\n\n`;
    message += `¡Gracias! 🙏\n`;
    message += `\n_Detalles Laurel Medellín_`;
    
    // Crear URL de WhatsApp con el mensaje
    let whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
}

function openProductDetailModal(product) {
    if (!modalDetailImage || !modalDetailName || !modalDetailPrice || !modalDetailDescription || !modalDetailWhatsappBtn || !productDetailModal) {
        console.error("Error: Elementos del modal no encontrados.");
        return;
    }
    // Fallbacks para la imagen del modal - carga inmediata sin lazy loading
    modalDetailImage.removeAttribute('src');
    modalDetailImage.classList.remove('loaded');
    modalDetailImage.alt = product.name;
    setImageSrcWithFallback(modalDetailImage, product, false); // false = carga inmediata
    modalDetailName.textContent = product.name;
    modalDetailPrice.textContent = product.price; 
    modalDetailDescription.textContent = product.description;
    
    // Actualizar los atributos data- para el botón de WhatsApp del modal con información completa
    modalDetailWhatsappBtn.setAttribute('data-name', product.name);
    modalDetailWhatsappBtn.setAttribute('data-price', product.price);
    modalDetailWhatsappBtn.setAttribute('data-image', product.image);
    modalDetailWhatsappBtn.setAttribute('data-category', product.categoryTitle || product.category || '');

    productDetailModal.style.display = "flex"; 
}

// --- Funciones para el Zoom de Imagen ---
function openImageZoom() {
    if (!imageZoomModal || !zoomedImage || !modalDetailImage) return;
    
    // Copiar la imagen actual del modal al modal de zoom
    zoomedImage.src = modalDetailImage.src;
    zoomedImage.alt = modalDetailImage.alt;
    
    // Mostrar el modal de zoom con animación
    imageZoomModal.classList.add('active');
    
    // Prevenir scroll en el body
    document.body.style.overflow = 'hidden';
}

function closeImageZoom() {
    if (!imageZoomModal) return;
    
    // Ocultar el modal de zoom
    imageZoomModal.classList.remove('active');
    
    // Restaurar scroll en el body
    document.body.style.overflow = '';
}

// --- Funciones para el Modal de Logo ---
function openLogoModal() {
    if (!logoModal) return;
    
    // Mostrar el modal de logo con animación
    logoModal.classList.add('active');
    
    // Prevenir scroll en el body
    document.body.style.overflow = 'hidden';
}

function closeLogoModal() {
    if (!logoModal) return;
    
    // Ocultar el modal de logo
    logoModal.classList.remove('active');
    
    // Restaurar scroll en el body
    document.body.style.overflow = '';
}

// --- Funciones para el Modal de Bienvenida ---
function openWelcomeModal() {
    if (!welcomeModal) return;
    
    // Mostrar el modal de bienvenida con animación
    welcomeModal.classList.add('active');
    
    // Prevenir scroll en el body
    document.body.style.overflow = 'hidden';
}

function closeWelcomeModal() {
    if (!welcomeModal) return;
    
    // Ocultar el modal de bienvenida
    welcomeModal.classList.remove('active');
    
    // Restaurar scroll en el body
    document.body.style.overflow = '';
}

// ============================================
// SISTEMA DE FAVORITOS
// ============================================

// Cargar favoritos del localStorage
function loadFavorites() {
    const saved = localStorage.getItem('detallesLaurelFavorites');
    if (saved) {
        try {
            favorites = JSON.parse(saved);
        } catch (e) {
            console.error('Error cargando favoritos:', e);
            favorites = [];
        }
    }
    updateFavoritesBadge();
}

// Guardar favoritos en localStorage
function saveFavorites() {
    try {
        localStorage.setItem('detallesLaurelFavorites', JSON.stringify(favorites));
        updateFavoritesBadge();
    } catch (e) {
        console.error('Error guardando favoritos:', e);
    }
}

// Actualizar badge contador
function updateFavoritesBadge() {
    if (!favoritesBadge) {
        console.warn('favoritesBadge element not found');
        return;
    }
    const count = favorites.length;
    if (count > 0) {
        favoritesBadge.textContent = count;
        favoritesBadge.style.display = 'block';
        favoritesBadge.style.visibility = 'visible';
        favoritesBadge.style.opacity = '1';
    } else {
        favoritesBadge.style.display = 'none';
        favoritesBadge.style.visibility = 'hidden';
        favoritesBadge.style.opacity = '0';
    }
}

// Verificar si un producto es favorito
function isFavorite(product) {
    return favorites.some(fav => fav.name === product.name && fav.category === product.category);
}

// Agregar/quitar favorito
function toggleFavorite(product, button) {
    const index = favorites.findIndex(fav => fav.name === product.name && fav.category === product.category);
    
    if (index > -1) {
        // Quitar de favoritos
        favorites.splice(index, 1);
        if (button) button.classList.remove('active');
        
        // Actualizar TODOS los botones de favoritos de este producto en la página
        updateAllFavoriteButtons(product, false);
    } else {
        // Agregar a favoritos
        favorites.push({
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            category: product.category,
            categoryTitle: product.categoryTitle
        });
        if (button) button.classList.add('active');
        
        // Actualizar TODOS los botones de favoritos de este producto en la página
        updateAllFavoriteButtons(product, true);
    }
    
    saveFavorites();
    
    // Forzar actualización del badge
    setTimeout(() => {
        updateFavoritesBadge();
    }, 50);
    
    // Si el modal de favoritos está abierto, actualizarlo
    if (favoritesModal && favoritesModal.classList.contains('active')) {
        renderFavorites();
    }
}

// Actualizar todos los botones de favoritos de un producto específico
function updateAllFavoriteButtons(product, isActive) {
    // Buscar todos los botones de favoritos en la página
    const allFavoriteButtons = document.querySelectorAll('.favorite-button');
    
    allFavoriteButtons.forEach(btn => {
        // Verificar si este botón corresponde al producto
        const btnProduct = btn.getAttribute('data-product-name');
        const btnCategory = btn.getAttribute('data-product-category');
        
        if (btnProduct === product.name && btnCategory === product.category) {
            if (isActive) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });
}

// Abrir modal de favoritos
function openFavoritesModal() {
    if (!favoritesModal) return;
    favoritesModal.classList.add('active');
    renderFavorites();
    document.body.style.overflow = 'hidden';
}

// Cerrar modal de favoritos
function closeFavoritesModal() {
    if (!favoritesModal) return;
    favoritesModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Renderizar favoritos en el modal
function renderFavorites() {
    if (!favoritesContainer) return;
    
    favoritesContainer.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-favorites">
                <svg viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <h3>No tienes favoritos aún</h3>
                <p>Haz clic en el corazón de los productos que te gusten para agregarlos aquí</p>
            </div>
        `;
        return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'favorites-grid';
    
    favorites.forEach((product, index) => {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        
        const img = document.createElement('img');
        img.alt = product.name;
        setImageSrcWithFallback(img, product, false);
        
        const info = document.createElement('div');
        info.className = 'favorite-item-info';
        
        const title = document.createElement('h4');
        title.textContent = product.name;
        
        const price = document.createElement('p');
        price.textContent = product.price;
        
        const actions = document.createElement('div');
        actions.className = 'favorite-item-actions';
        
        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn-view-favorite';
        viewBtn.textContent = 'Ver';
        viewBtn.addEventListener('click', () => {
            closeFavoritesModal();
            openProductDetailModal(product);
        });
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-remove-favorite';
        removeBtn.textContent = 'Quitar';
        removeBtn.addEventListener('click', () => {
            toggleFavorite(product, null);
        });
        
        actions.appendChild(viewBtn);
        actions.appendChild(removeBtn);
        
        info.appendChild(title);
        info.appendChild(price);
        info.appendChild(actions);
        
        item.appendChild(img);
        item.appendChild(info);
        grid.appendChild(item);
    });
    
    favoritesContainer.appendChild(grid);
}

// Crear botón de favorito para tarjeta de producto
function createFavoriteButton(product) {
    const button = document.createElement('button');
    button.className = 'favorite-button';
    button.title = 'Agregar a favoritos';
    button.type = 'button'; // Prevenir comportamiento de submit
    
    // Agregar atributos data para identificar el producto
    button.setAttribute('data-product-name', product.name);
    button.setAttribute('data-product-category', product.category);
    
    if (isFavorite(product)) {
        button.classList.add('active');
    }
    
    button.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;
    
    // Usar touchstart para mejor respuesta en móvil
    let touchStartTime = 0;
    
    button.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
    }, { passive: true });
    
    button.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration < 500) { // Solo si es un tap rápido
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product, button);
        }
    });
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product, button);
    });
    
    return button;
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Funcionalidad del Formulario de Contacto ---
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const submitButton = event.target.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;
    
    // Cambiar el texto del botón para mostrar que se está enviando
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Enviar el formulario usando fetch
    fetch('https://formspree.io/f/xdkdnjza', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Mostrar mensaje de éxito
            showFormMessage('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
            // Resetear el formulario
            event.target.reset();
        } else {
            throw new Error('Error en el envío');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormMessage('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
    })
    .finally(() => {
        // Restaurar el botón
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    });
}

function showFormMessage(message, type) {
    // Remover mensaje anterior si existe
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Crear el elemento del mensaje
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;
    
    // Insertar el mensaje después del formulario
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Remover el mensaje después de 5 segundos
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// --- Funcionalidad de Animación de Escritura ---
function initTypewriterAnimation() {
    if (!typewriterTitle) return;
    
    const text = typewriterTitle.textContent;
    typewriterTitle.textContent = '';
    
    let i = 0;
    const typeSpeed = 80; // Velocidad de escritura más rápida en milisegundos
    
    // Hacer visible el título antes de comenzar la animación
    typewriterTitle.style.opacity = '1';
    
    function typeChar() {
        if (i < text.length) {
            typewriterTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, typeSpeed);
        } else {
            // Cuando termina la escritura, ocultar el cursor después de un tiempo
            setTimeout(() => {
                typewriterTitle.style.setProperty('--cursor-opacity', '0');
            }, 2000);
        }
    }
    
    // Iniciar la animación inmediatamente
    setTimeout(typeChar, 100);
}

// ============================================
// HERO CAROUSEL FUNCTIONALITY
// ============================================

let currentSlide = 0;
let carouselInterval;
const slideDelay = 6000; // 6 segundos entre slides

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (!slides.length) return;

    function showSlide(index) {
        // Normalizar el índice
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Actualizar slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === currentSlide) {
                indicator.classList.add('active');
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        carouselInterval = setInterval(nextSlide, slideDelay);
    }

    function stopAutoPlay() {
        clearInterval(carouselInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Event Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });

    // Event listeners para los botones de CTA del carrusel
    const carouselButtons = document.querySelectorAll('.carousel-btn[data-category]');
    carouselButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Navegar a la sección de productos
            const productsSection = document.querySelector('#productos');
            if (productsSection) {
                productsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Esperar un poco para que el scroll termine y luego aplicar el filtro
            setTimeout(() => {
                // Si jQuery y Select2 están disponibles
                if (typeof jQuery !== 'undefined' && jQuery.fn.select2) {
                    jQuery('#categoria-filtro').val([category]).trigger('change');
                } else {
                    // Fallback sin Select2
                    loadAndFilterProducts(category);
                }
            }, 500);
        });
    });

    // Funcionalidad táctil (swipe) para dispositivos móviles
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe
            const horizontalDiff = touchEndX - touchStartX;
            const verticalDiff = Math.abs(touchEndY - touchStartY);
            
            // Solo hacer swipe horizontal si el movimiento vertical es menor
            if (verticalDiff < 50) {
                if (horizontalDiff > swipeThreshold) {
                    // Swipe derecha - ir a slide anterior
                    prevSlide();
                    resetAutoPlay();
                } else if (horizontalDiff < -swipeThreshold) {
                    // Swipe izquierda - ir a slide siguiente
                    nextSlide();
                    resetAutoPlay();
                }
            }
        }
    }

    // Iniciar autoplay - funcionará continuamente sin importar dónde esté el usuario
    startAutoPlay();
    
    // Asegurar que el autoplay continúe incluso después de interacciones
    // Solo reiniciar si el usuario hace clic manualmente en controles
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && !carouselInterval) {
            startAutoPlay();
        }
    });
}

// --- INICIALIZACIÓN DE TODO AL CARGAR EL DOM ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Eliminar el hash de la URL si existe
    if (window.location.hash) {
        window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
    // 2. Intentar forzar el scroll al inicio de la página con un pequeño retraso
    // Esto permite que el navegador primero aplique su propio scroll si lo tiene,
    // y luego nuestro script lo sobreescriba.
    setTimeout(() => {
        window.scrollTo(0, 0); 
        // También puedes probar con:
        // document.body.scrollIntoView({ behavior: 'auto', block: 'start' });
        // O si tienes un elemento con id="top" en la primera sección:
        // document.getElementById('top').scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 10); // Retraso de 10 milisegundos

    // 3. Inicializar referencias a elementos del DOM
    productContainer = document.getElementById("product-container");
    // filterButtons ya no se usa - se reemplazó por Select2
    categoryCards = document.querySelectorAll(".category-card"); 
    paginationContainer = document.getElementById("pagination-container");

    // Cargar imágenes de categorías por nombre exacto si no tienen imagen
    // assignCategoryImagesByExactTitle(); // Deshabilitado - las imágenes ya están definidas en el HTML

    // Cargar productos desde el archivo productos.js
    loadProductsFromDatabase();

    // Modal elements
    productDetailModal = document.getElementById("productModal"); 
    modalDetailImage = document.getElementById("modalDetailImage");
    modalDetailName = document.getElementById("modalDetailName");
    modalDetailPrice = document.getElementById("modalDetailPrice");
    modalDetailDescription = document.getElementById("modalDetailDescription");
    modalDetailWhatsappBtn = document.getElementById("modalDetailWhatsappBtn");
    closeModalButton = productDetailModal ? productDetailModal.querySelector(".close-button") : null;

    // Image Zoom Modal elements
    imageZoomModal = document.getElementById("imageZoomModal");
    zoomedImage = document.getElementById("zoomedImage");
    zoomCloseButton = imageZoomModal ? imageZoomModal.querySelector(".zoom-close-button") : null;

    // Logo Modal elements
    logoModal = document.getElementById("logoModal");
    logoModalImage = document.getElementById("logoModalImage");
    logoCloseButton = logoModal ? logoModal.querySelector(".logo-close-button") : null;

    // Welcome Modal elements
    welcomeModal = document.getElementById("welcomeModal");
    welcomeCloseButton = welcomeModal ? welcomeModal.querySelector(".welcome-close-button") : null;
    welcomeStartBtn = document.getElementById("welcomeStartBtn");

    // Favorites Modal elements
    favoritesModal = document.getElementById("favoritesModal");
    favoritesContainer = document.getElementById("favoritesContainer");
    floatingFavoritesBtn = document.getElementById("floatingFavoritesBtn");
    favoritesBadge = document.getElementById("favoritesBadge");

    // Validación de elementos del modal
    if (!productDetailModal) console.error("Error: productDetailModal no encontrado");
    if (!closeModalButton) console.error("Error: closeModalButton no encontrado");

    // Cargar favoritos guardados
    loadFavorites();

    // Scroll to top button
    scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', topFunction);
        window.onscroll = function() { scrollFunction() };
    }

    // Botón flotante de WhatsApp
    const floatingWhatsAppBtn = document.getElementById("floatingWhatsAppBtn");
    if (floatingWhatsAppBtn) {
        floatingWhatsAppBtn.addEventListener('click', function() {
            const message = "¡Hola! Me interesa obtener más información de Detalles Laurel Medellín.";
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // --- Event Listeners para el Sistema de Favoritos ---
    
    // Botón flotante de favoritos
    if (floatingFavoritesBtn) {
        floatingFavoritesBtn.addEventListener('click', openFavoritesModal);
    }
    
    // Detectar cuando el usuario llega a la sección de productos
    function setupProductsSectionObserver() {
        const productsSection = document.getElementById('productos');
        if (!productsSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Si la sección está visible en la pantalla
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    // Verificar si ya se mostró la alerta en esta sesión
                    const alertShown = sessionStorage.getItem('favoritesAlertShown');
                    if (!alertShown) {
                        showFavoritesInfoAlert();
                        sessionStorage.setItem('favoritesAlertShown', 'true');
                        // Dejar de observar después de mostrarla
                        observer.unobserve(productsSection);
                    }
                }
            });
        }, {
            threshold: 0.3, // Se activa cuando el 30% de la sección es visible
            rootMargin: '0px'
        });
        
        observer.observe(productsSection);
    }
    
    // Función para mostrar alerta informativa sobre favoritos
    function showFavoritesInfoAlert() {
        // Crear y mostrar la alerta informativa
        createFavoritesInfoAlert();
    }
    
    // Crear y mostrar la alerta informativa
    function createFavoritesInfoAlert() {
        // Eliminar alerta anterior si existe
        const existingAlert = document.getElementById('favoritesInfoAlert');
        const existingOverlay = document.querySelector('.favorites-info-overlay');
        if (existingAlert) {
            existingAlert.remove();
        }
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Crear overlay de fondo
        const overlay = document.createElement('div');
        overlay.className = 'favorites-info-overlay';
        
        const alert = document.createElement('div');
        alert.id = 'favoritesInfoAlert';
        alert.className = 'favorites-info-alert';
        
        alert.innerHTML = `
            <div class="favorites-info-alert-content">
                <div class="favorites-info-icon">💡</div>
                <div class="favorites-info-text">
                    <strong>¿Cómo agregar favoritos?</strong>
                    <p>Busca el corazón ♥️ en las tarjetas de productos y haz clic para guardar tus favoritos. ¡Así de fácil!</p>
                    <p style="margin-top: 8px; font-size: 0.85em; color: #e74c3c;"><strong>💖 Para ver tus favoritos:</strong> Busca el botón flotante con el corazón en la esquina inferior derecha de la pantalla.</p>
                </div>
                <button class="favorites-info-close" aria-label="Cerrar">&times;</button>
            </div>
        `;
        
        // Agregar overlay y alerta al body
        document.body.appendChild(overlay);
        document.body.appendChild(alert);
        
        // Animación de entrada
        setTimeout(() => {
            overlay.classList.add('show');
            alert.classList.add('show');
        }, 100);
        
        // Cerrar al hacer clic en el botón de cerrar
        const closeBtn = alert.querySelector('.favorites-info-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeFavoritesInfoAlert(overlay, alert);
            });
        }
        
        // Cerrar al hacer clic en el overlay (fondo oscuro)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeFavoritesInfoAlert(overlay, alert);
            }
        });
        
        // Prevenir que los clics dentro de la alerta cierren el modal
        const alertContent = alert.querySelector('.favorites-info-alert-content');
        if (alertContent) {
            alertContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Cerrar automáticamente después de 15 segundos (más tiempo para leer)
        setTimeout(() => {
            if (alert.parentNode && overlay.parentNode) {
                closeFavoritesInfoAlert(overlay, alert);
            }
        }, 15000);
    }
    
    // Cerrar la alerta con animación
    function closeFavoritesInfoAlert(overlay, alert) {
        if (alert) {
            alert.classList.remove('show');
        }
        if (overlay) {
            overlay.classList.remove('show');
        }
        setTimeout(() => {
            if (alert && alert.parentNode) {
                alert.remove();
            }
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
        }, 300);
    }
    
    // Inicializar el observer cuando se carga la página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupProductsSectionObserver);
    } else {
        setupProductsSectionObserver();
    }

    // Cerrar modal de favoritos
    if (favoritesModal) {
        const favoritesCloseBtn = favoritesModal.querySelector('.favorites-close-button');
        if (favoritesCloseBtn) {
            favoritesCloseBtn.addEventListener('click', closeFavoritesModal);
        }

        // Cerrar al hacer click fuera del modal
        favoritesModal.addEventListener('click', (e) => {
            if (e.target === favoritesModal) {
                closeFavoritesModal();
            }
        });
    }

    // Formulario de contacto
    contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Animación de escritura del título
    typewriterTitle = document.getElementById('typewriter-title');
    if (typewriterTitle) {
        initTypewriterAnimation();
    }

    // Ajustar etiquetas de "Ver"/"Ver Detalles" al cargar y al redimensionar
    updateDetailButtonLabels();
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateDetailButtonLabels, 100);
    });

    // 4. Añadir Event Listeners para el modal (una vez)
    if (productDetailModal && closeModalButton) {
        closeModalButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botón X clickeado'); // Para depuración
            productDetailModal.style.display = "none";
        }, false);

        window.addEventListener('click', (event) => {
            if (event.target == productDetailModal) {
                productDetailModal.style.display = "none";
            }
        });
    } else {
        console.error('No se pudieron configurar los listeners del modal');
    }

    // Listener para el botón de WhatsApp dentro del modal (una vez)
    if (modalDetailWhatsappBtn) {
        modalDetailWhatsappBtn.addEventListener('click', function() {
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            const productImage = this.dataset.image;
            const productCategory = this.dataset.category;
            sendToWhatsApp(productName, productPrice, productImage, productCategory);
        });
    }

    // --- Event Listeners para el Zoom de Imagen ---
    
    // Click en la imagen del modal de producto para abrir zoom
    if (modalDetailImage) {
        modalDetailImage.addEventListener('click', function() {
            // Solo abrir zoom si la imagen está cargada
            if (this.classList.contains('loaded')) {
                openImageZoom();
            }
        });
    }

    // Click en el botón de cerrar del modal de zoom
    if (zoomCloseButton) {
        zoomCloseButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeImageZoom();
        });
    }

    // Click en cualquier parte del modal de zoom para cerrarlo
    if (imageZoomModal) {
        imageZoomModal.addEventListener('click', function(e) {
            // Solo cerrar si se hace click en el fondo, no en la imagen
            if (e.target === imageZoomModal || e.target === zoomedImage) {
                closeImageZoom();
            }
        });
    }

    // Cerrar zoom con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (imageZoomModal && imageZoomModal.classList.contains('active')) {
                closeImageZoom();
            } else if (favoritesModal && favoritesModal.classList.contains('active')) {
                closeFavoritesModal();
            } else if (logoModal && logoModal.classList.contains('active')) {
                closeLogoModal();
            } else if (welcomeModal && welcomeModal.classList.contains('active')) {
                closeWelcomeModal();
            }
        }
    });

    // --- Event Listeners para el Modal de Logo ---
    
    // Click en el logo del header para abrir modal
    const headerLogo = document.querySelector('.header-logo');
    if (headerLogo) {
        headerLogo.addEventListener('click', function() {
            openLogoModal();
        });
    }

    // Click en el logo del footer para abrir modal
    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo) {
        footerLogo.addEventListener('click', function() {
            openLogoModal();
        });
    }

    // Click en el botón de cerrar del modal de logo
    if (logoCloseButton) {
        logoCloseButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeLogoModal();
        });
    }

    // Click en cualquier parte del modal de logo para cerrarlo
    if (logoModal) {
        logoModal.addEventListener('click', function(e) {
            // Cerrar si se hace click en el fondo o en la imagen
            if (e.target === logoModal || e.target === logoModalImage) {
                closeLogoModal();
            }
        });
    }

    // --- Event Listeners para el Modal de Bienvenida ---
    
    // Click en el botón de cerrar del modal de bienvenida
    if (welcomeCloseButton) {
        welcomeCloseButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeWelcomeModal();
        });
    }

    // Click en el botón "Comenzar a Explorar"
    if (welcomeStartBtn) {
        welcomeStartBtn.addEventListener('click', function() {
            closeWelcomeModal();
        });
    }

    // Click en cualquier parte del fondo del modal para cerrarlo
    if (welcomeModal) {
        welcomeModal.addEventListener('click', function(e) {
            // Solo cerrar si se hace click en el fondo, no en el contenido
            if (e.target === welcomeModal) {
                closeWelcomeModal();
            }
        });
    }

    // Mostrar el modal de bienvenida solo la primera vez en esta sesión
    // sessionStorage se borra cuando se cierra el navegador
    setTimeout(function() {
        // Verificar si el modal ya se mostró en esta sesión
        const welcomeShown = sessionStorage.getItem('welcomeModalShown');
        
        if (!welcomeShown) {
            // Si no se ha mostrado, mostrarlo
            openWelcomeModal();
            // Marcar como mostrado en esta sesión
            sessionStorage.setItem('welcomeModalShown', 'true');
        }
    }, 500);


    // 5. Código de botones de filtro removido - ahora se usa Select2

    // Listener de orden por precio (se inicializa después de Select2)
    // Se movió al bloque de inicialización de Select2 para usar jQuery


    // 6. Añadir Event Listeners para las tarjetas de categoría (una vez)
    if (categoryCards.length > 0) {
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.dataset.category;

                // Si jQuery y Select2 están disponibles, usar el select
                if (typeof jQuery !== 'undefined' && jQuery.fn.select2) {
                    jQuery(document).ready(function($) {
                        // Limpiar selección anterior y seleccionar solo esta categoría
                        $('#categoria-filtro').val(category).trigger('change');
                    });
                } else {
                    // Fallback: usar el método tradicional si Select2 no está disponible
                    loadAndFilterProducts(category);
                }
                
                // Hacer el scroll DESPUÉS de actualizar el contenido
                setTimeout(() => {
                    const productsSection = document.querySelector('.products');
                    if (productsSection) {
                        productsSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 50);
            });
        });
    }

    // 7. Cargar todos los productos al cargar la página inicialmente
    loadAndFilterProducts('all');

    // 8. Inicializar el carrusel hero
    initCarousel();

    // 9. Inicializar Select2 para el filtro de categorías y ordenamiento por precio
    if (typeof jQuery !== 'undefined' && jQuery.fn.select2) {
        jQuery(document).ready(function($) {
            // Función para formatear las opciones con emojis
            function formatOption(option) {
                if (!option.id) {
                    return option.text;
                }
                return $(option.element).text();
            }

            // Inicializar Select2 para categorías (solo una selección)
            $('#categoria-filtro').select2({
                placeholder: "Buscar o seleccionar categoría...",
                allowClear: true,
                language: "es",
                width: '100%',
                closeOnSelect: true,
                minimumResultsForSearch: 0, // Permitir búsqueda
                templateResult: formatOption,
                templateSelection: formatOption
            });

            // Inicializar Select2 para ordenar por precio
            $('#priceSort').select2({
                placeholder: "Seleccionar orden...",
                allowClear: true, // Permitir limpiar la selección
                language: "es",
                width: 'resolve', // Ancho basado en el contenido
                minimumResultsForSearch: Infinity, // Deshabilitar búsqueda
                templateResult: formatOption,
                templateSelection: formatOption
            });

            // Limpiar todos los filtros al cargar la página
            $('#categoria-filtro').val(null).trigger('change');
            $('#subcategoria-filtro').val(null).trigger('change');
            $('#priceSort').val(null).trigger('change');
            
            // Ocultar el select de subcategorías
            const subcategoriesWrapper = document.getElementById('subcategoria-filtro-wrapper');
            if (subcategoriesWrapper) {
                subcategoriesWrapper.style.display = 'none';
            }
            
            // Actualizar mensaje de información
            const infoElement = $('#info-seleccion');
            infoElement.text('Mostrando todas las categorías');
            infoElement.removeClass('active');

            // Evento cuando cambia el ordenamiento por precio
            $('#priceSort').on('change', function() {
                const categoriaSeleccionada = $('#categoria-filtro').val();
                const sortValue = $(this).val();
                
                if (categoriaSeleccionada) {
                    aplicarFiltroCategoria(categoriaSeleccionada);
                } else {
                    loadAndFilterProducts('all', 1);
                }
                
                // Cerrar el select después de limpiar
                if (!sortValue || sortValue === '' || sortValue === null) {
                    setTimeout(() => {
                        $('#priceSort').select2('close');
                    }, 10);
                }
            });

            // Evento cuando cambia la selección del select de categorías
            $('#categoria-filtro').on('change', function() {
                const categoriaSeleccionada = $(this).val();
                const infoElement = $('#info-seleccion');
                
                if (categoriaSeleccionada) {
                    // Actualizar mensaje de información
                    const categoriaTitle = categoryTitles.find(title => slugify(title) === categoriaSeleccionada) || categoriaSeleccionada;
                    infoElement.text(`Categoría: ${categoriaTitle}`);
                    infoElement.addClass('active');
                    
                    // Si la categoría tiene subcategorías, mostrar el select de subcategorías
                    updateSubcategoriesSelect(categoriaSeleccionada);
                    
                    // Aplicar filtro de categoría
                    aplicarFiltroCategoria(categoriaSeleccionada);
                } else {
                    // Mostrar todos los productos
                    infoElement.text('Mostrando todas las categorías');
                    infoElement.removeClass('active');
                    
                    // Ocultar el select de subcategorías
                    const subcategoriesWrapper = document.getElementById('subcategoria-filtro-wrapper');
                    if (subcategoriesWrapper) {
                        subcategoriesWrapper.style.display = 'none';
                    }
                    
                    loadAndFilterProducts('all');
                }
                
                // Cerrar el select después de limpiar
                if (!categoriaSeleccionada) {
                    setTimeout(() => {
                        $('#categoria-filtro').select2('close');
                    }, 10);
                }
            });
            
            // Evento cuando cambia la selección del select de subcategorías
            $(document).on('change', '#subcategoria-filtro', function() {
                const categoriaSeleccionada = $('#categoria-filtro').val();
                const subcategoriaSeleccionada = $(this).val();
                
                if (categoriaSeleccionada) {
                    aplicarFiltroConSubcategorias(categoriaSeleccionada);
                }
                
                // Cerrar el select después de limpiar
                if (!subcategoriaSeleccionada) {
                    setTimeout(() => {
                        $('#subcategoria-filtro').select2('close');
                    }, 10);
                }
            });

            // Función para aplicar filtro con subcategorías
            window.aplicarFiltroConSubcategorias = function(categoryKey) {
                const subcategoriaSeleccionada = $('#subcategoria-filtro').val();
                let productosFiltrados = [];
                
                if (!subcategoriaSeleccionada || subcategoriaSeleccionada === 'all') {
                    // Si no hay subcategoría seleccionada o se seleccionó "Todas", mostrar todos los productos de la categoría
                    productosFiltrados = productsData[categoryKey] || [];
                } else {
                    // Filtrar por subcategoría seleccionada
                    const productos = getSubcategoryProducts(categoryKey, subcategoriaSeleccionada);
                    productosFiltrados = productosFiltrados.concat(productos);
                }
                
                // Aplicar orden por precio si corresponde
                const sortSelect = document.getElementById('priceSort');
                if (sortSelect) {
                    const sortValue = sortSelect.value;
                    if (sortValue === 'asc' || sortValue === 'desc') {
                        productosFiltrados = productosFiltrados.sort((a, b) => {
                            const priceA = parseInt(String(a.price || '0').replace(/\D/g, '')) || 0;
                            const priceB = parseInt(String(b.price || '0').replace(/\D/g, '')) || 0;
                            return sortValue === 'asc' ? priceA - priceB : priceB - priceA;
                        });
                    }
                }
                
                // Resetear a página 1
                currentPage = 1;
                currentCategory = categoryKey;
                
                // Mostrar productos filtrados
                displayProducts(productosFiltrados, currentPage);
                setupPagination(productosFiltrados, categoryKey);
            };

            // Función para aplicar filtro de categoría
            window.aplicarFiltroCategoria = function(categoria) {
                if (!categoria) {
                    loadAndFilterProducts('all');
                    return;
                }

                // Verificar si hay subcategoría seleccionada
                const subcategoriaSeleccionada = $('#subcategoria-filtro').val();
                
                // Si hay subcategoría seleccionada y no es "Todas", usar la función de subcategorías
                if (subcategoriaSeleccionada && subcategoriaSeleccionada !== 'all') {
                    aplicarFiltroConSubcategorias(categoria);
                    return;
                }

                // Obtener productos de la categoría
                const productosDeCategoria = productsData[categoria] || [];

                // Aplicar orden por precio si corresponde
                const sortSelect = document.getElementById('priceSort');
                let productosFinales = productosDeCategoria;
                if (sortSelect) {
                    const sortValue = sortSelect.value;
                    if (sortValue === 'asc' || sortValue === 'desc') {
                        productosFinales = productosFinales.sort((a, b) => {
                            const priceA = parseInt(String(a.price || '0').replace(/\D/g, '')) || 0;
                            const priceB = parseInt(String(b.price || '0').replace(/\D/g, '')) || 0;
                            return sortValue === 'asc' ? priceA - priceB : priceB - priceA;
                        });
                    }
                }

                // Resetear a página 1
                currentPage = 1;
                currentCategory = categoria;
                
                // Mostrar productos filtrados
                displayProducts(productosFinales, currentPage);
                setupPagination(productosFinales, categoria);
            };

            // Función para limpiar selección
            window.limpiarFiltros = function() {
                $('#categoria-filtro').val(null).trigger('change');
                $('#subcategoria-filtro').val(null).trigger('change');
            };
        });
    }
});

// --- CONTADOR DE ESTADÍSTICAS CON ANIMACIÓN ---
function initStatsCounter() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    // Función para animar el conteo de un número
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        const suffix = element.getAttribute('data-suffix') || '';

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('es-CO') + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString('es-CO') + suffix;
            }
        }, 16);
    }

    // Usar IntersectionObserver para detectar cuando la sección es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                // Animar cada número
                statNumbers.forEach((statNumber, index) => {
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    const statItem = statNumber.closest('.stat-item');
                    
                    // Agregar clase de animación con delay
                    setTimeout(() => {
                        statItem.classList.add('animate');
                        animateCounter(statNumber, target);
                    }, index * 200); // Delay escalonado
                });
            }
        });
    }, {
        threshold: 0.3 // Se activa cuando el 30% de la sección es visible
    });

    observer.observe(statsSection);
}

// Inicializar el contador de estadísticas
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatsCounter);
} else {
    initStatsCounter();
}


// --- Deshabilitar herramientas de desarrollador (funcionalidad de protección) ---
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'J') ||
        (e.ctrlKey && e.key.toUpperCase() === 'U')) {
        e.preventDefault();
    }
});