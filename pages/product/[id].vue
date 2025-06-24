<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="mb-8">
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <NuxtLink to="/" class="hover:text-blue-600 transition-colors">Inicio</NuxtLink>
          <span>→</span>
          <NuxtLink :to="`/category/${product?.category}`" class="hover:text-blue-600 transition-colors">
            {{ getCategoryName(product?.category) }}
          </NuxtLink>
          <span>→</span>
          <span class="text-gray-900">{{ product?.name }}</span>
        </div>
      </div>

      <!-- Producto no encontrado -->
      <div v-if="!product" class="text-center py-12">
        <div class="text-6xl mb-4">❌</div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Producto no encontrado</h1>
        <p class="text-gray-600 mb-6">El producto que buscas no existe o ha sido removido.</p>
        <NuxtLink to="/products" class="btn-primary">
          Ver Todos los Productos
        </NuxtLink>
      </div>

      <!-- Detalle del producto -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Galería de imágenes -->
        <div class="space-y-4">
          <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div class="text-8xl">{{ product.icon }}</div>
          </div>
          
          <!-- Miniaturas (simuladas) -->
          <div class="grid grid-cols-4 gap-2">
            <div 
              v-for="i in 4" 
              :key="i"
              class="bg-gray-200 rounded-lg h-20 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <div class="text-2xl">{{ product.icon }}</div>
            </div>
          </div>
        </div>

        <!-- Información del producto -->
        <div class="space-y-6">
          <!-- Título y categoría -->
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {{ getCategoryName(product.category) }}
              </span>
              <span v-if="product.stock < 5" class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                Solo {{ product.stock }} disponibles
              </span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
            <p class="text-gray-600">{{ product.description }}</p>
          </div>

          <!-- Precio -->
          <div class="flex items-center space-x-4">
            <span class="text-4xl font-bold text-blue-600">${{ product.price }}</span>
            <span v-if="product.originalPrice" class="text-2xl text-gray-500 line-through">${{ product.originalPrice }}</span>
            <span v-if="product.originalPrice" class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
            </span>
          </div>

          <!-- Stock -->
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 rounded-full" :class="product.stock > 0 ? 'bg-green-500' : 'bg-red-500'"></div>
            <span class="text-sm" :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
              {{ product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado' }}
            </span>
          </div>

          <!-- Cantidad y agregar al carrito -->
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <label class="text-sm font-medium text-gray-700">Cantidad:</label>
              <div class="flex items-center space-x-2">
                <button 
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  -
                </button>
                <span class="w-12 text-center font-medium">{{ quantity }}</span>
                <button 
                  @click="increaseQuantity"
                  :disabled="quantity >= product.stock"
                  class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            <div class="flex space-x-4">
              <button 
                @click="handleAddToCart"
                :disabled="product.stock === 0"
                class="flex-1 btn-primary text-lg py-4"
              >
                {{ product.stock === 0 ? 'Agotado' : 'Agregar al Carrito' }}
              </button>
              <button 
                @click="buyNow"
                :disabled="product.stock === 0"
                class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                Comprar Ahora
              </button>
            </div>
          </div>

          <!-- Características principales -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Características principales</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="feature in product.features" :key="feature" class="flex items-center space-x-2">
                <div class="text-green-500">✓</div>
                <span class="text-sm text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Información adicional -->
          <div class="border-t pt-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div class="flex items-center space-x-2">
                <div class="text-blue-500">🚚</div>
                <span class="text-gray-700">Envío gratis</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="text-blue-500">🛡️</div>
                <span class="text-gray-700">Garantía 2 años</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="text-blue-500">↩️</div>
                <span class="text-gray-700">Devolución 30 días</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Especificaciones técnicas -->
      <div v-if="product.specifications" class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Especificaciones técnicas</h2>
        <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div 
              v-for="(specs, category) in product.specifications" 
              :key="category"
              class="border-b md:border-b-0 md:border-r border-gray-200 last:border-b-0 last:border-r-0"
            >
              <div class="bg-gray-50 px-6 py-4">
                <h3 class="font-semibold text-gray-900">{{ category }}</h3>
              </div>
              <div class="p-6">
                <dl class="space-y-3">
                  <div v-for="(value, key) in specs" :key="key" class="flex justify-between">
                    <dt class="text-sm text-gray-600">{{ key }}</dt>
                    <dd class="text-sm font-medium text-gray-900">{{ value }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Productos relacionados -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Productos relacionados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id"
            class="card overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div class="bg-gray-200 h-32 flex items-center justify-center">
              <div class="text-4xl">{{ relatedProduct.icon }}</div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2">{{ relatedProduct.name }}</h3>
              <p class="text-sm text-gray-600 mb-3">{{ relatedProduct.description }}</p>
              <div class="flex items-center justify-between">
                <span class="font-bold text-blue-600">${{ relatedProduct.price }}</span>
                <NuxtLink 
                  :to="`/product/${relatedProduct.id}`"
                  class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Ver →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { addToCart } = useCart()
const cartNotification = inject('cartNotification')

// Estado local
const quantity = ref(1)

// Base de datos de productos con detalles completos
const productsDatabase = {
  1: {
    id: 1,
    name: 'PC Gaming Elite',
    description: 'La PC gaming definitiva para los jugadores más exigentes. Rendimiento excepcional para juegos en 4K y streaming.',
    price: 2499,
    originalPrice: 2799,
    stock: 5,
    icon: '💻',
    category: 'pcs-completas',
    features: [
      'RTX 4080 16GB GDDR6X',
      'Intel Core i9-13900K',
      '64GB RAM DDR5 6000MHz',
      '2TB NVMe SSD PCIe 4.0',
      'Fuente 850W 80+ Gold',
      'Líquido refrigeración AIO'
    ],
    specifications: {
      'Procesador': {
        'Modelo': 'Intel Core i9-13900K',
        'Núcleos': '24 (8P + 16E)',
        'Frecuencia': 'Hasta 5.8 GHz',
        'Socket': 'LGA 1700'
      },
      'Tarjeta Gráfica': {
        'Modelo': 'NVIDIA RTX 4080',
        'Memoria': '16GB GDDR6X',
        'Ray Tracing': 'Sí',
        'DLSS': '3.0'
      },
      'Memoria': {
        'Capacidad': '64GB',
        'Tipo': 'DDR5',
        'Velocidad': '6000MHz',
        'Configuración': 'Dual Channel'
      },
      'Almacenamiento': {
        'Capacidad': '2TB',
        'Tipo': 'NVMe SSD',
        'Interfaz': 'PCIe 4.0',
        'Velocidad': '7000 MB/s'
      }
    }
  },
  2: {
    id: 2,
    name: 'PC Gaming Pro',
    description: 'PC gaming de alto rendimiento perfecta para juegos en 1440p y 4K. Excelente relación calidad-precio.',
    price: 1299,
    originalPrice: null,
    stock: 8,
    icon: '💻',
    category: 'pcs-completas',
    features: [
      'RTX 4070 12GB GDDR6X',
      'AMD Ryzen 7 7700X',
      '32GB RAM DDR5 5600MHz',
      '1TB NVMe SSD PCIe 4.0',
      'Fuente 750W 80+ Gold',
      'Refrigeración por aire premium'
    ],
    specifications: {
      'Procesador': {
        'Modelo': 'AMD Ryzen 7 7700X',
        'Núcleos': '8 Cores / 16 Threads',
        'Frecuencia': 'Hasta 5.4 GHz',
        'Socket': 'AM5'
      },
      'Tarjeta Gráfica': {
        'Modelo': 'NVIDIA RTX 4070',
        'Memoria': '12GB GDDR6X',
        'Ray Tracing': 'Sí',
        'DLSS': '3.0'
      },
      'Memoria': {
        'Capacidad': '32GB',
        'Tipo': 'DDR5',
        'Velocidad': '5600MHz',
        'Configuración': 'Dual Channel'
      },
      'Almacenamiento': {
        'Capacidad': '1TB',
        'Tipo': 'NVMe SSD',
        'Interfaz': 'PCIe 4.0',
        'Velocidad': '5000 MB/s'
      }
    }
  },
  5: {
    id: 5,
    name: 'Monitor 4K Gaming',
    description: 'Monitor gaming de 32 pulgadas con resolución 4K, alta frecuencia de refresco y tecnología HDR.',
    price: 899,
    originalPrice: null,
    stock: 7,
    icon: '🖥️',
    category: 'monitores',
    features: [
      '32" 4K UHD (3840x2160)',
      '144Hz Refresh Rate',
      'HDR 400',
      'G-Sync Compatible',
      '1ms Response Time',
      'DisplayPort 1.4'
    ],
    specifications: {
      'Pantalla': {
        'Tamaño': '32 pulgadas',
        'Resolución': '3840 x 2160 (4K)',
        'Tipo': 'IPS',
        'Aspect Ratio': '16:9'
      },
      'Rendimiento': {
        'Refresh Rate': '144Hz',
        'Response Time': '1ms (GtG)',
        'HDR': 'HDR 400',
        'Color Gamut': '95% DCI-P3'
      },
      'Conectividad': {
        'DisplayPort': '1.4 x 1',
        'HDMI': '2.1 x 2',
        'USB Hub': '3.0 x 4',
        'Audio': '3.5mm Jack'
      },
      'Características': {
        'G-Sync': 'Compatible',
        'FreeSync': 'Premium Pro',
        'VESA Mount': '100x100mm',
        'Inclinación': '-5° a +20°'
      }
    }
  },
  9: {
    id: 9,
    name: 'RTX 4070 Ti',
    description: 'Tarjeta gráfica de alto rendimiento con tecnología de ray tracing y DLSS 3.0 para gaming en 4K.',
    price: 799,
    originalPrice: 899,
    stock: 10,
    icon: '⚡',
    category: 'componentes',
    features: [
      '12GB GDDR6X',
      'Ray Tracing Cores',
      'DLSS 3.0',
      'PCIe 4.0',
      '3 Ventiladores',
      'RGB Lighting'
    ],
    specifications: {
      'Especificaciones': {
        'GPU': 'AD104-400',
        'CUDA Cores': '7680',
        'RT Cores': '60',
        'Tensor Cores': '240'
      },
      'Memoria': {
        'Capacidad': '12GB',
        'Tipo': 'GDDR6X',
        'Bus Width': '192-bit',
        'Velocidad': '21 Gbps'
      },
      'Rendimiento': {
        'Boost Clock': '2610 MHz',
        'Base Clock': '2310 MHz',
        'TDP': '285W',
        'PSU Requerida': '750W'
      },
      'Conectividad': {
        'DisplayPort': '1.4a x 3',
        'HDMI': '2.1 x 1',
        'PCIe': '4.0 x16',
        'Power Connector': '8-pin + 8-pin'
      }
    }
  }
}

// Computed properties
const productId = computed(() => parseInt(route.params.id))
const product = computed(() => productsDatabase[productId.value])

const relatedProducts = computed(() => {
  if (!product.value) return []
  
  // Obtener productos de la misma categoría
  const sameCategory = Object.values(productsDatabase).filter(p => 
    p.category === product.value.category && p.id !== product.value.id
  )
  
  // Obtener productos de otras categorías
  const otherCategories = Object.values(productsDatabase).filter(p => 
    p.category !== product.value.category
  )
  
  // Combinar y limitar a 4 productos
  return [...sameCategory, ...otherCategories].slice(0, 4)
})

// Funciones
const getCategoryName = (categorySlug) => {
  const categories = {
    'pcs-completas': 'PCs Completas',
    'monitores': 'Monitores',
    'componentes': 'Componentes',
    'perifericos': 'Periféricos'
  }
  return categories[categorySlug] || categorySlug
}

const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const handleAddToCart = () => {
  if (product.value && product.value.stock > 0) {
    // Agregar la cantidad seleccionada
    for (let i = 0; i < quantity.value; i++) {
      addToCart(product.value)
    }
    
    // Mostrar notificación
    if (cartNotification.value) {
      cartNotification.value.showNotification(`${quantity.value}x ${product.value.name}`)
    }
    
    // Resetear cantidad
    quantity.value = 1
  }
}

const buyNow = () => {
  if (product.value && product.value.stock > 0) {
    // Agregar al carrito y redirigir al checkout
    handleAddToCart()
    navigateTo('/cart')
  }
}

// Meta tags dinámicos
useHead(() => ({
  title: product.value ? `${product.value.name} - TechStore` : 'Producto no encontrado - TechStore',
  meta: [
    { 
      name: 'description', 
      content: product.value ? product.value.description : 'Producto no encontrado' 
    }
  ]
}))
</script> 