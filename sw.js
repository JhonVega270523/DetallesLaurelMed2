// ============================================
// SERVICE WORKER - Detalles Laurel Medellín
// ============================================
// Este archivo permite que la PWA funcione offline
// Cachea recursos importantes para carga rápida
// ============================================

const CACHE_NAME = 'detalles-laurel-v1';
const RUNTIME_CACHE = 'detalles-laurel-runtime-v1';

// Archivos estáticos para cachear
const STATIC_CACHE_URLS = [
    '/DetallesLaurelMedLogo/',
    '/DetallesLaurelMedLogo/index.html',
    '/DetallesLaurelMedLogo/style.css',
    '/DetallesLaurelMedLogo/script.js',
    '/DetallesLaurelMedLogo/productos.js',
    '/DetallesLaurelMedLogo/manifest.json'
];

// ============================================
// INSTALL - Cachear recursos estáticos
// ============================================
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('✅ Service Worker: Cacheando archivos estáticos');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .catch((error) => {
                console.error('❌ Service Worker: Error al cachear:', error);
            })
    );
    
    // Activar el service worker inmediatamente
    self.skipWaiting();
});

// ============================================
// ACTIVATE - Limpiar caches antiguos
// ============================================
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker: Activando...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                            console.log('🗑️ Service Worker: Eliminando cache antiguo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
    
    // Tomar control de todas las páginas inmediatamente
    return self.clients.claim();
});

// ============================================
// FETCH - Servir desde cache cuando sea posible
// ============================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Solo cachear peticiones del mismo dominio
    if (url.origin !== location.origin) {
        return; // Dejar que pase la petición normalmente
    }
    
    // Estrategia: Cache First con fallback a Network
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('📦 Service Worker: Sirviendo desde cache:', request.url);
                    return cachedResponse;
                }
                
                // No está en cache, buscar en la red
                return fetch(request)
                    .then((response) => {
                        // Solo cachear respuestas exitosas
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clonar la respuesta para cachearla
                        const responseToCache = response.clone();
                        
                        caches.open(RUNTIME_CACHE)
                            .then((cache) => {
                                console.log('💾 Service Worker: Cacheando:', request.url);
                                cache.put(request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Si falla la red, devolver una página offline si está disponible
                        if (request.destination === 'document') {
                            return caches.match('/DetallesLaurelMedLogo/index.html');
                        }
                        return new Response('Contenido no disponible offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// ============================================
// SYNC - Sincronización en background
// ============================================
self.addEventListener('sync', (event) => {
    console.log('🔄 Service Worker: Sincronización en background');
    
    if (event.tag === 'sync-products') {
        event.waitUntil(
            // Aquí puedes sincronizar datos con el servidor
            console.log('📦 Sincronizando productos...')
        );
    }
});

// ============================================
// MESSAGE - Comunicación con la página
// ============================================
self.addEventListener('message', (event) => {
    console.log('💬 Service Worker: Mensaje recibido:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME);
        caches.delete(RUNTIME_CACHE);
        console.log('🗑️ Service Worker: Cache limpiado');
    }
});

console.log('✅ Service Worker: Cargado correctamente');

