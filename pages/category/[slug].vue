<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header de la categoría -->
      <div class="mb-8">
        <div class="flex items-center space-x-4 mb-4">
          <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 transition-colors">
            ← Volver a Inicio
          </NuxtLink>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ categoryInfo.title }}</h1>
        <p class="text-gray-600">{{ categoryInfo.description }}</p>
      </div>

      <!-- Filtros y ordenamiento -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">Ordenar por:</span>
          <select 
            v-model="sortBy" 
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Nombre</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="popular">Más Populares</option>
          </select>
        </div>
        
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">{{ filteredProducts.length }} productos</span>
        </div>
      </div>

      <!-- Grid de productos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="card overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          @click="navigateToProduct(product)"
        >
          <div class="bg-gray-200 h-48 flex items-center justify-center">
            <div class="text-6xl">{{ product.icon }}</div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
            <div class="flex items-center justify-between mb-4">
              <div>
                <span class="text-xl font-bold text-blue-600">${{ product.price }}</span>
                <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through ml-2">${{ product.originalPrice }}</span>
              </div>
              <span v-if="product.stock < 5" class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                Solo {{ product.stock }} disponibles
              </span>
            </div>
            <button 
              @click.stop="handleAddToCart(product)"
              class="w-full btn-primary"
              :disabled="product.stock === 0"
            >
              {{ product.stock === 0 ? 'Agotado' : 'Agregar al Carrito' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay productos -->
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
        <p class="text-gray-600 mb-6">Intenta con otros filtros o vuelve más tarde</p>
        <NuxtLink to="/" class="btn-primary">
          Volver a Inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { addToCart } = useCart()
const cartNotification = inject('cartNotification')

// Estado para ordenamiento
const sortBy = ref('name')

// Información de las categorías
const categories = {
  'pcs-completas': {
    title: 'PCs Completas',
    description: 'Computadoras completas para gaming, oficina y diseño',
    icon: '💻'
  },
  'monitores': {
    title: 'Monitores',
    description: 'Monitores 4K, gaming, curvos y profesionales',
    icon: '🖥️'
  },
  'componentes': {
    title: 'Componentes',
    description: 'CPU, GPU, RAM, SSD y más componentes',
    icon: '⚡'
  },
  'perifericos': {
    title: 'Periféricos',
    description: 'Teclados, mouse, audio y accesorios',
    icon: '🎮'
  }
}

// Productos por categoría
const productsByCategory = {
  'pcs-completas': [
    {
      id: 1,
      name: 'PC Gaming Elite',
      description: 'RTX 4080 • i9-13900K • 64GB RAM • 2TB NVMe',
      price: 2499,
      originalPrice: 2799,
      stock: 5,
      icon: '💻'
    },
    {
      id: 2,
      name: 'PC Gaming Pro',
      description: 'RTX 4070 • Ryzen 7 7700X • 32GB RAM • 1TB NVMe',
      price: 1299,
      originalPrice: null,
      stock: 8,
      icon: '💻'
    },
    {
      id: 3,
      name: 'PC Oficina',
      description: 'Intel i5 • 16GB RAM • 512GB SSD • Sin GPU',
      price: 599,
      originalPrice: 699,
      stock: 12,
      icon: '💻'
    },
    {
      id: 4,
      name: 'PC Diseño',
      description: 'RTX 4060 • i7-13700K • 32GB RAM • 2TB NVMe',
      price: 1499,
      originalPrice: null,
      stock: 3,
      icon: '💻'
    }
  ],
  'monitores': [
    {
      id: 5,
      name: 'Monitor 4K Gaming',
      description: '32" • 4K • 144Hz • HDR • G-Sync',
      price: 899,
      originalPrice: null,
      stock: 7,
      icon: '🖥️'
    },
    {
      id: 6,
      name: 'Monitor Curvo Gaming',
      description: '27" • 1440p • 165Hz • Curvo • FreeSync',
      price: 399,
      originalPrice: 499,
      stock: 15,
      icon: '🖥️'
    },
    {
      id: 7,
      name: 'Monitor Profesional',
      description: '27" • 4K • 60Hz • Color Calibrated',
      price: 699,
      originalPrice: null,
      stock: 4,
      icon: '🖥️'
    },
    {
      id: 8,
      name: 'Monitor Ultrawide',
      description: '34" • 1440p • 100Hz • 21:9 • HDR',
      price: 599,
      originalPrice: 749,
      stock: 6,
      icon: '🖥️'
    }
  ],
  'componentes': [
    {
      id: 9,
      name: 'RTX 4070 Ti',
      description: '12GB GDDR6X • Ray Tracing • DLSS 3.0',
      price: 799,
      originalPrice: 899,
      stock: 10,
      icon: '⚡'
    },
    {
      id: 10,
      name: 'Ryzen 7 7700X',
      description: '8 Cores • 16 Threads • 4.5GHz • AM5',
      price: 349,
      originalPrice: null,
      stock: 20,
      icon: '⚡'
    },
    {
      id: 11,
      name: 'RAM DDR5 32GB',
      description: '32GB • 6000MHz • CL36 • Dual Channel',
      price: 129,
      originalPrice: 159,
      stock: 25,
      icon: '⚡'
    },
    {
      id: 12,
      name: 'SSD NVMe 2TB',
      description: '2TB • PCIe 4.0 • 7000MB/s • NVMe',
      price: 149,
      originalPrice: null,
      stock: 18,
      icon: '⚡'
    }
  ],
  'perifericos': [
    {
      id: 13,
      name: 'Teclado Mecánico RGB',
      description: 'Switches Cherry MX • RGB • Wrist Rest',
      price: 129,
      originalPrice: 159,
      stock: 30,
      icon: '🎮'
    },
    {
      id: 14,
      name: 'Mouse Gaming',
      description: '25K DPI • RGB • 7 Botones • Wireless',
      price: 79,
      originalPrice: null,
      stock: 22,
      icon: '🎮'
    },
    {
      id: 15,
      name: 'Headset Gaming',
      description: '7.1 Surround • Mic • RGB • Comfort',
      price: 89,
      originalPrice: 119,
      stock: 16,
      icon: '🎮'
    },
    {
      id: 16,
      name: 'Mousepad RGB',
      description: 'XXL • RGB • Anti-slip • Gaming',
      price: 39,
      originalPrice: null,
      stock: 35,
      icon: '🎮'
    }
  ]
}

// Computed properties
const categorySlug = computed(() => route.params.slug)
const categoryInfo = computed(() => categories[categorySlug.value] || { title: 'Categoría no encontrada', description: '' })
const products = computed(() => productsByCategory[categorySlug.value] || [])

const filteredProducts = computed(() => {
  let sorted = [...products.value]
  
  switch (sortBy.value) {
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'price-low':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'popular':
      // Simular popularidad por stock (menos stock = más popular)
      sorted.sort((a, b) => a.stock - b.stock)
      break
  }
  
  return sorted
})

// Función para manejar la adición al carrito
const handleAddToCart = (product) => {
  addToCart(product)
  
  // Mostrar notificación
  if (cartNotification.value) {
    cartNotification.value.showNotification(product.name)
  }
}

const navigateToProduct = (product) => {
  navigateTo(`/product/${product.id}`)
}

// Meta tags dinámicos
useHead({
  title: `${categoryInfo.value.title} - TechStore`,
  meta: [
    { name: 'description', content: categoryInfo.value.description }
  ]
})
</script> 