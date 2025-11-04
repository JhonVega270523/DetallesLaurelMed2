// ============================================
// BASE DE DATOS DE PRODUCTOS - DETALLES LAUREL MEDELLÍN
// ============================================
// Instrucciones para agregar/editar productos:
// 1. Busca la categoría correspondiente
// 2. Copia un producto existente como plantilla
// 3. Actualiza: name, price, description, image (si tienes foto específica)
// 4. Guarda el archivo y recarga la página
// ============================================

const PRODUCTOS_LAUREL = {
    // ============================================
    // CATEGORÍA: 15 AÑOS
    // ============================================
    "15-anos": [
        {
            name: "Arreglo Quinceañera Elegante",
            price: "$150.000",
            description: "Hermoso arreglo floral con rosas rosadas, blancas y detalles dorados, perfecto para celebrar sus 15 años. Incluye globo personalizado.",
            image: "images/15 años.jpeg"
        },
        {
            name: "Bouquet Princesa",
            price: "$180.000",
            description: "Ramo especial para quinceañera con rosas premium, lirios y follaje decorativo. Presentación de lujo en papel metálico.",
            image: "images/15 años.jpeg"
        },
        {
            name: "Set Quinceañera Completo",
            price: "$250.000",
            description: "Paquete completo: arreglo floral grande, corona de flores, bouquet de mano y peluche conmemorativo.",
            image: "images/15 años.jpeg"
        },
        {
            name: "Arreglo Quinceañera Clásico",
            price: "$120.000",
            description: "Diseño clásico con rosas blancas y rosadas, ideal para la celebración de sus 15 años. Incluye tarjeta personalizada.",
            image: "images/15 años.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: ANCHETAS (con subcategorías)
    // ============================================
    "anchetas": {
        hasSubcategories: true,
        subcategories: {
            "dama": [
                {
                    name: "Ancheta Dama Elegante",
                    price: "$120.000",
                    description: "Selección especial para dama: chocolates finos, vino espumoso, productos de belleza, velas aromáticas y tarjeta personalizada.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "dama"
                },
                {
                    name: "Ancheta Dama Premium",
                    price: "$150.000",
                    description: "Ancheta de lujo para dama: perfumes, cosméticos premium, chocolates belgas, vino tinto y productos de spa.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "dama"
                },
                {
                    name: "Ancheta Dama Romántica",
                    price: "$110.000",
                    description: "Vino espumoso, chocolates finos, fresas cubiertas, velas aromáticas y productos de relajación para dama.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "dama"
                },
                {
                    name: "Ancheta Dama Gourmet",
                    price: "$130.000",
                    description: "Selección gourmet para dama: quesos finos, vino premium, chocolates artesanales y productos gourmet.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "dama"
                }
            ],
            "caballero": [
                {
                    name: "Ancheta Caballero Ejecutiva",
                    price: "$140.000",
                    description: "Ideal para caballeros: whisky, productos de cuidado personal, chocolates finos, frutos secos y accesorios.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "caballero"
                },
                {
                    name: "Ancheta Caballero Premium",
                    price: "$160.000",
                    description: "Ancheta de lujo para caballero: whisky premium, productos de cuidado masculino, chocolates finos y accesorios.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "caballero"
                },
                {
                    name: "Ancheta Caballero Deportiva",
                    price: "$100.000",
                    description: "Productos deportivos, bebidas energéticas, snacks saludables y accesorios para el caballero activo.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "caballero"
                },
                {
                    name: "Ancheta Caballero Gourmet",
                    price: "$150.000",
                    description: "Whisky, quesos finos, jamón serrano, frutos secos premium y productos gourmet para caballero.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "caballero"
                }
            ],
            "ninos": [
                {
                    name: "Ancheta Niños Fiesta",
                    price: "$85.000",
                    description: "Dulces variados, juguetes pequeños, globos, confites y sorpresas para los más pequeños.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "ninos"
                },
                {
                    name: "Ancheta Niños Educativa",
                    price: "$95.000",
                    description: "Juguetes educativos, libros, materiales creativos, dulces y productos para estimular el aprendizaje.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "ninos"
                },
                {
                    name: "Ancheta Niños Premium",
                    price: "$110.000",
                    description: "Juguetes de calidad, libros, dulces gourmet, accesorios y sorpresas especiales para niños.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "ninos"
                },
                {
                    name: "Ancheta Niños Cumpleaños",
                    price: "$100.000",
                    description: "Dulces, juguetes, globos temáticos, decoración y sorpresas para celebrar el cumpleaños.",
                    image: "images/Anchetas.jpeg",
                    subcategory: "ninos"
                }
            ]
        },
        // Productos generales de anchetas (sin subcategoría específica)
        general: [
            {
                name: "Ancheta Gourmet Premium",
                price: "$120.000",
                description: "Selección premium con queso importado, jamón serrano, vino tinto, chocolates finos, galletas gourmet y frutos secos en presentación de lujo.",
                image: "images/Anchetas.jpeg"
            },
            {
                name: "Ancheta Dulce Sorpresa",
                price: "$85.000",
                description: "Para los amantes de lo dulce: chocolates variados, gomitas, galletas, brownies artesanales y dulces típicos colombianos.",
                image: "images/Anchetas.jpeg"
            },
            {
                name: "Ancheta Ejecutiva",
                price: "$150.000",
                description: "Ideal para empresas: whisky, queso, chocolates finos, frutos secos, galletas importadas y taza personalizable.",
                image: "images/Anchetas.jpeg"
            }
        ]
    },

    // ============================================
    // CATEGORÍA: ANIVERSARIO
    // ============================================
    "aniversario": [
        {
            name: "Arreglo Amor Eterno",
            price: "$130.000",
            description: "Rosas rojas premium en caja elegante con chocolates y tarjeta personalizada. El regalo perfecto para celebrar su amor.",
            image: "images/Aniversario.jpeg"
        },
        {
            name: "Combo Romántico Deluxe",
            price: "$200.000",
            description: "Ramo de 24 rosas rojas, vino espumoso, chocolates finos, velas aromáticas y globo con mensaje de amor.",
            image: "images/Aniversario.jpeg"
        },
        {
            name: "Caja de Amor",
            price: "$150.000",
            description: "Elegante caja con rosas preservadas, chocolates belgas, perfume miniatura y carta de amor personalizada.",
            image: "images/Aniversario.jpeg"
        },
        {
            name: "Celebración de Años Juntos",
            price: "$180.000",
            description: "Arreglo floral mixto con rosas, lirios y orquídeas, champagne, chocolates y álbum de fotos personalizado.",
            image: "images/Aniversario.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: ARREGLOS CON PELUCHES
    // ============================================
    "arreglos-con-peluches": [
        {
            name: "Osito con Rosas",
            price: "$95.000",
            description: "Tierno osito de peluche acompañado de 12 rosas rojas frescas en presentación elegante. Ideal para cualquier ocasión.",
            image: "images/Arreglos con Peluches.jpeg"
        },
        {
            name: "Peluche Gigante con Flores",
            price: "$180.000",
            description: "Peluche de 80cm con ramo de flores mixtas, chocolates y globo. Un regalo que no pasará desapercibido.",
            image: "images/Arreglos con Peluches.jpeg"
        },
        {
            name: "Canasta Ternura",
            price: "$110.000",
            description: "Canasta decorativa con peluche mediano, flores variadas, chocolates y tarjeta personalizada.",
            image: "images/Arreglos con Peluches.jpeg"
        },
        {
            name: "Peluche Unicornio Mágico",
            price: "$125.000",
            description: "Unicornio de peluche con flores coloridas, dulces y brillantina. Perfecto para niñas y jóvenes.",
            image: "images/Arreglos con Peluches.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: BOUQUET (con subcategorías)
    // ============================================
    "bouquet": {
        hasSubcategories: true,
        subcategories: {
            "grados": [
                {
                    name: "Bouquet Clásico de Rosas",
                    price: "$85.000",
                    description: "12 rosas rojas frescas con follaje verde y envoltura elegante. El clásico que nunca falla.",
                    image: "images/Bouquet.jpeg",
                    subcategory: "grados"
                },
                {
                    name: "Bouquet Mixto Primavera",
                    price: "$95.000",
                    description: "Combinación de rosas, girasoles, margaritas y flores de temporada en colores vibrantes.",
                    image: "images/Bouquet.jpeg",
                    subcategory: "grados"
                },
                {
                    name: "Bouquet Premium Rosas Blancas",
                    price: "$120.000",
                    description: "24 rosas blancas premium con eucalipto y envoltura de lujo. Elegancia pura.",
                    image: "images/Bouquet.jpeg",
                    subcategory: "grados"
                },
                {
                    name: "Bouquet Tropical",
                    price: "$140.000",
                    description: "Exóticas flores tropicales: aves del paraíso, heliconias y anturios en arreglo espectacular.",
                    image: "images/Bouquet.jpeg",
                    subcategory: "grados"
                },
                {
                    name: "Bouquet Campestre",
                    price: "$75.000",
                    description: "Flores silvestres y de campo en estilo rústico. Natural y encantador.",
                    image: "images/Bouquet.jpeg",
                    subcategory: "grados"
                }
            ]
        },
        // Productos generales de bouquet (sin subcategoría específica)
        general: []
    },

    // ============================================
    // CATEGORÍA: CAJAS DE DULCES
    // ============================================
    "cajas-de-dulces": [
        {
            name: "Caja Dulce Tradicional",
            price: "$60.000",
            description: "Variedad de dulces colombianos: arequipe, bocadillo, cocadas, brevas y dulce de leche en caja decorada.",
            image: "images/Cajas de Dulces.jpeg"
        },
        {
            name: "Caja Chocolates Premium",
            price: "$90.000",
            description: "Selección de chocolates finos: Ferrero Rocher, Lindt, Toblerone y chocolates artesanales.",
            image: "images/Cajas de Dulces.jpeg"
        },
        {
            name: "Caja Mixta Dulce y Salado",
            price: "$75.000",
            description: "Combinación perfecta: chocolates, gomitas, galletas, nueces, almendras y snacks salados.",
            image: "images/Cajas de Dulces.jpeg"
        },
        {
            name: "Caja Infantil Colorida",
            price: "$55.000",
            description: "Dulces y golosinas favoritas de los niños: chupetas, chocolatinas, gomitas y sorpresa de juguete.",
            image: "images/Cajas de Dulces.jpeg"
        },
        {
            name: "Caja Gourmet de Dulces",
            price: "$100.000",
            description: "Dulces artesanales, trufas, macarons, chocolates belgas y confites de alta calidad.",
            image: "images/Cajas de Dulces.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: CAJAS DE LUJO
    // ============================================
    "cajas-de-lujo": [
        {
            name: "Caja de Lujo Elegancia",
            price: "$200.000",
            description: "Caja premium con rosas preservadas, chocolates belgas, perfume de marca y joyería fina en presentación de lujo.",
            image: "images/Cajas de Lujo.jpeg"
        },
        {
            name: "Caja VIP Empresarial",
            price: "$250.000",
            description: "Whisky premium, chocolates finos, queso importado, copas de cristal y tarjeta personalizada.",
            image: "images/Cajas de Lujo.jpeg"
        },
        {
            name: "Caja Romántica Deluxe",
            price: "$180.000",
            description: "Champagne, rosas preservadas, chocolates, velas aromáticas y spa kit en caja elegante.",
            image: "images/Cajas de Lujo.jpeg"
        },
        {
            name: "Caja de Lujo Celebración",
            price: "$220.000",
            description: "Vino premium, flores exóticas, chocolates gourmet, copa grabada y decoración de lujo.",
            image: "images/Cajas de Lujo.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: DECORACIÓN DE FIESTAS
    // ============================================
    "decoracion-de-fiestas": [
        {
            name: "Decoración Cumpleaños Básica",
            price: "$150.000",
            description: "Globos, banderines, mantel temático, centros de mesa básicos para fiesta de hasta 20 personas.",
            image: "images/Decoración de Fiestas.jpeg"
        },
        {
            name: "Decoración Cumpleaños Premium",
            price: "$300.000",
            description: "Decoración completa: arco de globos, backdrop, centros de mesa elegantes, letras gigantes, piñata y accesorios.",
            image: "images/Decoración de Fiestas.jpeg"
        },
        {
            name: "Decoración Temática Infantil",
            price: "$250.000",
            description: "Decoración personalizada del personaje favorito: globos, figuras, backdrop, mesa dulce decorada y sorpresas.",
            image: "images/Decoración de Fiestas.jpeg"
        },
        {
            name: "Decoración Baby Shower",
            price: "$200.000",
            description: "Decoración tierna y elegante: globos pastel, centros florales, letras decorativas y accesorios temáticos.",
            image: "images/Decoración de Fiestas.jpeg"
        },
        {
            name: "Decoración Evento Corporativo",
            price: "$400.000",
            description: "Montaje profesional para eventos empresariales: backdrop corporativo, centros de mesa elegantes y señalización.",
            image: "images/Decoración de Fiestas.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: DECORACIÓN DE HABITACIONES
    // ============================================
    "decoracion-de-habitaciones": [
        {
            name: "Decoración Romántica Básica",
            price: "$120.000",
            description: "Pétalos de rosa, velas, globos y letras luminosas para crear un ambiente romántico especial.",
            image: "images/Decoración de Habitaciones.jpeg"
        },
        {
            name: "Decoración Sorpresa Cumpleaños",
            price: "$150.000",
            description: "Globos, banderines, luces LED, póster personalizado y detalles decorativos para sorprender.",
            image: "images/Decoración de Habitaciones.jpeg"
        },
        {
            name: "Decoración Premium Aniversario",
            price: "$200.000",
            description: "Pétalos, velas aromáticas, globos metálicos, luces LED, champagne, chocolates y música romántica.",
            image: "images/Decoración de Habitaciones.jpeg"
        },
        {
            name: "Decoración Pedida de Mano",
            price: "$250.000",
            description: "Montaje especial con velas, pétalos, globos con mensaje, luces, fotografía profesional y champagne.",
            image: "images/Decoración de Habitaciones.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: DESAYUNOS SORPRESA (con subcategorías)
    // ============================================
    "desayunos-sorpresa": {
        hasSubcategories: true,
        subcategories: {
            "dama": [
                {
                    name: "Desayuno Romántico",
                    price: "$95.000",
                    description: "Café gourmet, croissants, fresas con chocolate, jugo natural, rosa roja y tarjeta de amor.",
                    image: "images/Desayunos Sorpresa.jpeg",
                    subcategory: "dama"
                },
                {
                    name: "Desayuno Premium",
                    price: "$120.000",
                    description: "Champagne, frutas exóticas, quesos, jamón, pan artesanal, jugos naturales, chocolates y flores.",
                    image: "images/Desayunos Sorpresa.jpeg",
                    subcategory: "dama"
                },
                {
                    name: "Desayuno Saludable",
                    price: "$85.000",
                    description: "Smoothie bowl, frutas orgánicas, granola, pan integral, yogurt griego, miel y frutos secos.",
                    image: "images/Desayunos Sorpresa.jpeg",
                    subcategory: "dama"
                }
            ],
            "caballero": [
                {
                    name: "Desayuno Ejecutivo",
                    price: "$100.000",
                    description: "Café premium, croissants, sándwich gourmet, frutas, jugo natural y periódico del día.",
                    image: "images/Desayunos Sorpresa.jpeg",
                    subcategory: "caballero"
                },
                {
                    name: "Desayuno Sorpresa Básico",
                    price: "$70.000",
                    description: "Café, jugo, sándwich, fruta, yogurt, galletas y tarjeta personalizada en bandeja decorada.",
                    image: "images/Desayunos Sorpresa.jpeg",
                    subcategory: "caballero"
                }
            ],
            "ninos": [
                {
                    name: "Desayuno Cumpleaños",
                    price: "$110.000",
                    description: "Desayuno completo con mini torta, globo de cumpleaños, café, jugos, frutas y sorpresa especial.",
                    image: "images/Desayunos Sorpresa.jpeg",
                    subcategory: "ninos"
                }
            ]
        },
        // Productos generales de desayunos (sin subcategoría específica)
        general: []
    },

    // ============================================
    // CATEGORÍA: DETALLES CON VÍRGENES
    // ============================================
    "detalles-con-virgenes": [
        {
            name: "Arreglo Virgen María",
            price: "$80.000",
            description: "Imagen de la Virgen María con flores blancas, velas y base decorativa. Ideal para altares.",
            image: "images/Detalles con Virgenes.jpeg"
        },
        {
            name: "Set Virgen del Carmen",
            price: "$95.000",
            description: "Figura de la Virgen del Carmen con arreglo floral, rosario y tarjeta de oración.",
            image: "images/Detalles con Virgenes.jpeg"
        },
        {
            name: "Arreglo Virgen de Guadalupe",
            price: "$90.000",
            description: "Imagen de la Virgen de Guadalupe con rosas y velas en presentación especial.",
            image: "images/Detalles con Virgenes.jpeg"
        },
        {
            name: "Set Primera Comunión",
            price: "$120.000",
            description: "Virgen con flores blancas, rosario, biblia miniatura y recuerdo de primera comunión.",
            image: "images/Detalles con Virgenes.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: DETALLES EMPRESARIALES
    // ============================================
    "detalles-empresariales": [
        {
            name: "Set Corporativo Básico",
            price: "$80.000",
            description: "Libreta personalizada, bolígrafo premium, taza corporativa y tarjeta empresarial.",
            image: "images/Detalles Empresariales.jpeg"
        },
        {
            name: "Kit Bienvenida Empleado",
            price: "$120.000",
            description: "Mochila corporativa, termo, libreta, bolígrafos, USB personalizado y kit de escritorio.",
            image: "images/Detalles Empresariales.jpeg"
        },
        {
            name: "Ancheta Empresarial Premium",
            price: "$150.000",
            description: "Vino, chocolates finos, taza premium, libreta de cuero, bolígrafo Parker y tarjeta corporativa.",
            image: "images/Detalles Empresariales.jpeg"
        },
        {
            name: "Regalo Ejecutivo VIP",
            price: "$200.000",
            description: "Whisky premium, set de copas, maletín ejecutivo, reloj de escritorio y tarjeta personalizada.",
            image: "images/Detalles Empresariales.jpeg"
        },
        {
            name: "Kit Trabajo Remoto",
            price: "$110.000",
            description: "Mouse inalámbrico, teclado, audífonos, soporte para laptop y café gourmet.",
            image: "images/Detalles Empresariales.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: DETALLES PREMIUM
    // ============================================
    "detalles-premium": [
        {
            name: "Caja Premium Elegance",
            price: "$250.000",
            description: "Rosas preservadas en caja de lujo, perfume de marca, joyería fina y chocolates belgas.",
            image: "images/Detalles Premium.jpeg"
        },
        {
            name: "Set Luxury Romance",
            price: "$300.000",
            description: "Champagne Moët, rosas eternas, reloj de marca, chocolates Godiva y carta personalizada.",
            image: "images/Detalles Premium.jpeg"
        },
        {
            name: "Experience Premium",
            price: "$400.000",
            description: "Cena romántica, flores de lujo, vino premium, spa para dos y fotografía profesional.",
            image: "images/Detalles Premium.jpeg"
        },
        {
            name: "Joyería y Flores",
            price: "$350.000",
            description: "Collar o pulsera de oro, rosas preservadas en caja acrílica y champagne.",
            image: "images/Detalles Premium.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: FÚNEBRES
    // ============================================
    "funebres": [
        {
            name: "Corona Fúnebre Clásica",
            price: "$120.000",
            description: "Corona tradicional con flores blancas y verdes, cinta personalizada con mensaje de condolencias.",
            image: "images/Fúnebres.webp"
        },
        {
            name: "Arreglo Fúnebre Elegante",
            price: "$150.000",
            description: "Arreglo floral blanco con lirios, rosas y claveles en base elegante con tarjeta.",
            image: "images/Fúnebres.webp"
        },
        {
            name: "Ramo Condolencias",
            price: "$100.000",
            description: "Ramo de flores blancas y pasteles para expresar condolencias en momentos difíciles.",
            image: "images/Fúnebres.webp"
        },
        {
            name: "Corona Premium Grande",
            price: "$200.000",
            description: "Corona de gran tamaño con flores premium, listón personalizado y presentación impecable.",
            image: "images/Fúnebres.webp"
        }
    ],

    // ============================================
    // CATEGORÍA: NACIMIENTO
    // ============================================
    "nacimiento": [
        {
            name: "Arreglo Baby Shower Niña",
            price: "$95.000",
            description: "Flores rosadas, globo de bebé, peluche, pañales decorativos y tarjeta de felicitación.",
            image: "images/Nacimiento.jpeg"
        },
        {
            name: "Arreglo Baby Shower Niño",
            price: "$95.000",
            description: "Flores azules, globo de bebé, peluche, canasta decorativa y productos para bebé.",
            image: "images/Nacimiento.jpeg"
        },
        {
            name: "Canasta Recién Nacido Completa",
            price: "$150.000",
            description: "Ropa de bebé, pañales, toallitas, cremas, juguetes, peluche y flores decorativas.",
            image: "images/Nacimiento.jpeg"
        },
        {
            name: "Set Bienvenida Bebé Premium",
            price: "$180.000",
            description: "Canasta de lujo con ropa premium, productos de cuidado, manta suave, peluche y flores.",
            image: "images/Nacimiento.jpeg"
        },
        {
            name: "Arreglo Neutral Baby",
            price: "$100.000",
            description: "Flores en tonos neutros (blanco, amarillo, verde) con globo y detalles para bebé.",
            image: "images/Nacimiento.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: OSO TEDDY
    // ============================================
    "oso-teddy": [
        {
            name: "Oso Teddy Mediano",
            price: "$60.000",
            description: "Oso de peluche clásico de 40cm, suave y abrazable. Perfecto para regalar en cualquier ocasión.",
            image: "images/Oso Teddy.jpeg"
        },
        {
            name: "Oso Teddy Gigante",
            price: "$120.000",
            description: "Impresionante oso de peluche de 1 metro de altura. Un regalo que dejará sin palabras.",
            image: "images/Oso Teddy.jpeg"
        },
        {
            name: "Oso con Corazón",
            price: "$75.000",
            description: "Oso tierno sosteniendo un corazón con mensaje de amor. Ideal para San Valentín.",
            image: "images/Oso Teddy.jpeg"
        },
        {
            name: "Oso Teddy Premium con Accesorios",
            price: "$95.000",
            description: "Oso de peluche de alta calidad con moño, caja de regalo y tarjeta personalizada.",
            image: "images/Oso Teddy.jpeg"
        },
        {
            name: "Pareja de Ositos",
            price: "$100.000",
            description: "Dos ositos adorables (rosa y azul) perfectos para parejas o gemelos.",
            image: "images/Oso Teddy.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: PLANTAS DE ORQUÍDEA
    // ============================================
    "plantas-de-orquidea": [
        {
            name: "Orquídea Phalaenopsis Blanca",
            price: "$80.000",
            description: "Elegante orquídea blanca en maceta decorativa. Floración duradera y fácil cuidado.",
            image: "images/Plantas de Orquídea.webp"
        },
        {
            name: "Orquídea Phalaenopsis Rosada",
            price: "$85.000",
            description: "Hermosa orquídea en tonos rosados con maceta elegante. Regalo sofisticado y duradero.",
            image: "images/Plantas de Orquídea.webp"
        },
        {
            name: "Orquídea Morada Premium",
            price: "$95.000",
            description: "Orquídea en tonos morados intensos, maceta de cerámica premium y guía de cuidados.",
            image: "images/Plantas de Orquídea.webp"
        },
        {
            name: "Set Doble Orquídeas",
            price: "$150.000",
            description: "Dos orquídeas complementarias en macetas decorativas. Ideal para decoración de hogar u oficina.",
            image: "images/Plantas de Orquídea.webp"
        },
        {
            name: "Orquídea Multicolor",
            price: "$100.000",
            description: "Orquídea con flores de colores variados, maceta decorativa premium y substrato especial.",
            image: "images/Plantas de Orquídea.webp"
        }
    ],

    // ============================================
    // CATEGORÍA: RAMOS
    // ============================================
    "ramos": [
        {
            name: "Ramo 12 Rosas Rojas",
            price: "$75.000",
            description: "Clásico ramo de 12 rosas rojas frescas con follaje verde. El símbolo del amor eterno.",
            image: "images/Ramos.jpeg"
        },
        {
            name: "Ramo 24 Rosas Premium",
            price: "$140.000",
            description: "Impresionante ramo de 24 rosas rojas premium con envoltura de lujo y lazo elegante.",
            image: "images/Ramos.jpeg"
        },
        {
            name: "Ramo Mixto Colorido",
            price: "$90.000",
            description: "Alegre combinación de rosas, girasoles, margaritas y flores de temporada en colores vibrantes.",
            image: "images/Ramos.jpeg"
        },
        {
            name: "Ramo Rosas Blancas",
            price: "$80.000",
            description: "Elegante ramo de rosas blancas con eucalipto y envoltura clásica. Pureza y elegancia.",
            image: "images/Ramos.jpeg"
        },
        {
            name: "Ramo de Girasoles",
            price: "$70.000",
            description: "Radiante ramo de girasoles frescos que iluminará cualquier espacio. Alegría pura.",
            image: "images/Ramos.jpeg"
        },
        {
            name: "Ramo Premium Rosas Rosadas",
            price: "$95.000",
            description: "Delicado ramo de rosas rosadas con flores complementarias y presentación elegante.",
            image: "images/Ramos.jpeg"
        },
        {
            name: "Ramo Campestre",
            price: "$65.000",
            description: "Encantador ramo de flores silvestres y de campo en estilo rústico. Natural y auténtico.",
            image: "images/Ramos.jpeg"
        },
        {
            name: "Ramo de Lirios",
            price: "$85.000",
            description: "Sofisticado ramo de lirios blancos y rosados con aroma exquisito y presentación premium.",
            image: "images/Ramos.jpeg"
        }
    ],

    // ============================================
    // CATEGORÍA: RAMOS CON DINERO
    // ============================================
    "ramos-con-dinero": [
        {
            name: "Ramo Dinero Básico",
            price: "$50.000",
            description: "Ramo decorativo con billetes de diferentes denominaciones (dinero no incluido en el precio). Diseño creativo y llamativo.",
            image: "images/Ramos con Dinero.jpeg"
        },
        {
            name: "Ramo Dinero Premium",
            price: "$80.000",
            description: "Elaborado ramo con flores y espacio para billetes, incluye base decorativa y envoltura elegante (dinero no incluido).",
            image: "images/Ramos con Dinero.jpeg"
        },
        {
            name: "Bouquet Dinero Graduación",
            price: "$70.000",
            description: "Especial para graduados: ramo con flores, espacio para dinero y accesorios de graduación (dinero no incluido).",
            image: "images/Ramos con Dinero.jpeg"
        },
        {
            name: "Ramo Dinero XL",
            price: "$100.000",
            description: "Ramo de gran tamaño con diseño espectacular para billetes, flores decorativas y lazo premium (dinero no incluido).",
            image: "images/Ramos con Dinero.jpeg"
        }
    ]
};

// ============================================
// INFORMACIÓN ADICIONAL
// ============================================
// - Todos los precios están en pesos colombianos (COP)
// - Los productos pueden variar según disponibilidad de temporada
// - Hacemos entregas en toda Medellín y alrededores
// - Aceptamos personalizaciones (consultar por WhatsApp)
// ============================================

