<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-4 mb-4">
          <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 transition-colors">
            ← Volver a Inicio
          </NuxtLink>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Todos los Productos</h1>
        <p class="text-gray-600">Encuentra exactamente lo que necesitas</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filtros laterales -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
            
            <!-- Filtro por categoría -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Categoría</h3>
              <div class="space-y-2">
                <label v-for="category in categories" :key="category.slug" class="flex items-center">
                  <input 
                    type="checkbox" 
                    :value="category.slug"
                    v-model="selectedCategories"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                </label>
              </div>
            </div>

            <!-- Filtro por precio -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Rango de Precio</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    value="0-500"
                    v-model="priceRange"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">$0 - $500</span>
                </label>
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    value="500-1000"
                    v-model="priceRange"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">$500 - $1,000</span>
                </label>
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    value="1000-2000"
                    v-model="priceRange"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">$1,000 - $2,000</span>
                </label>
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    value="2000+"
                    v-model="priceRange"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">$2,000+</span>
                </label>
              </div>
            </div>

            <!-- Filtro por disponibilidad -->
            <div class="mb-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Disponibilidad</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input 
                    type="checkbox" 
                    v-model="inStockOnly"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">Solo en stock</span>
                </label>
              </div>
            </div>

            <!-- Botón limpiar filtros -->
            <button 
              @click="clearFilters"
              class="w-full btn-secondary text-sm"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        <!-- Lista de productos -->
        <div class="lg:col-span-3">
          <!-- Controles superiores -->
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div class="flex items-center space-x-4">
              <span class="text-gray-700">{{ filteredProducts.length }} productos encontrados</span>
            </div>
            
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
          </div>

          <!-- Grid de productos -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {{ getCategoryName(product.category) }}
                  </span>
                  <span v-if="product.stock < 5" class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    Solo {{ product.stock }}
                  </span>
                </div>
                <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
                <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <span class="text-xl font-bold text-blue-600">${{ product.price }}</span>
                    <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through ml-2">${{ product.originalPrice }}</span>
                  </div>
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
            <p class="text-gray-600 mb-6">Intenta ajustar los filtros o vuelve más tarde</p>
            <button @click="clearFilters" class="btn-primary">
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { addToCart } = useCart()
const cartNotification = inject('cartNotification')

// Estados para filtros
const selectedCategories = ref([])
const priceRange = ref('')
const inStockOnly = ref(false)
const sortBy = ref('name')

// Categorías disponibles
const categories = [
  { slug: 'pcs-completas', name: 'PCs Completas' },
  { slug: 'monitores', name: 'Monitores' },
  { slug: 'componentes', name: 'Componentes' },
  { slug: 'perifericos', name: 'Periféricos' }
]

// Todos los productos
const allProducts = [
  // PCs Completas
  {
    id: 1,
    name: 'PC Gaming Elite',
    description: 'RTX 4080 • i9-13900K • 64GB RAM • 2TB NVMe',
    price: 2499,
    originalPrice: 2799,
    stock: 5,
    icon: '💻',
    category: 'pcs-completas'
  },
  {
    id: 2,
    name: 'PC Gaming Pro',
    description: 'RTX 4070 • Ryzen 7 7700X • 32GB RAM • 1TB NVMe',
    price: 1299,
    originalPrice: null,
    stock: 8,
    icon: '💻',
    category: 'pcs-completas'
  },
  {
    id: 3,
    name: 'PC Oficina',
    description: 'Intel i5 • 16GB RAM • 512GB SSD • Sin GPU',
    price: 599,
    originalPrice: 699,
    stock: 12,
    icon: '💻',
    category: 'pcs-completas'
  },
  {
    id: 4,
    name: 'PC Diseño',
    description: 'RTX 4060 • i7-13700K • 32GB RAM • 2TB NVMe',
    price: 1499,
    originalPrice: null,
    stock: 3,
    icon: '💻',
    category: 'pcs-completas'
  },
  // Monitores
  {
    id: 5,
    name: 'Monitor 4K Gaming',
    description: '32" • 4K • 144Hz • HDR • G-Sync',
    price: 899,
    originalPrice: null,
    stock: 7,
    icon: '🖥️',
    category: 'monitores'
  },
  {
    id: 6,
    name: 'Monitor Curvo Gaming',
    description: '27" • 1440p • 165Hz • Curvo • FreeSync',
    price: 399,
    originalPrice: 499,
    stock: 15,
    icon: '🖥️',
    category: 'monitores'
  },
  {
    id: 7,
    name: 'Monitor Profesional',
    description: '27" • 4K • 60Hz • Color Calibrated',
    price: 699,
    originalPrice: null,
    stock: 4,
    icon: '🖥️',
    category: 'monitores'
  },
  {
    id: 8,
    name: 'Monitor Ultrawide',
    description: '34" • 1440p • 100Hz • 21:9 • HDR',
    price: 599,
    originalPrice: 749,
    stock: 6,
    icon: '🖥️',
    category: 'monitores'
  },
  // Componentes
  {
    id: 9,
    name: 'RTX 4070 Ti',
    description: '12GB GDDR6X • Ray Tracing • DLSS 3.0',
    price: 799,
    originalPrice: 899,
    stock: 10,
    icon: '⚡',
    category: 'componentes'
  },
  {
    id: 10,
    name: 'Ryzen 7 7700X',
    description: '8 Cores • 16 Threads • 4.5GHz • AM5',
    price: 349,
    originalPrice: null,
    stock: 20,
    icon: '⚡',
    category: 'componentes'
  },
  {
    id: 11,
    name: 'RAM DDR5 32GB',
    description: '32GB • 6000MHz • CL36 • Dual Channel',
    price: 129,
    originalPrice: 159,
    stock: 25,
    icon: '⚡',
    category: 'componentes'
  },
  {
    id: 12,
    name: 'SSD NVMe 2TB',
    description: '2TB • PCIe 4.0 • 7000MB/s • NVMe',
    price: 149,
    originalPrice: null,
    stock: 18,
    icon: '⚡',
    category: 'componentes'
  },
  // Periféricos
  {
    id: 13,
    name: 'Teclado Mecánico RGB',
    description: 'Switches Cherry MX • RGB • Wrist Rest',
    price: 129,
    originalPrice: 159,
    stock: 30,
    icon: '🎮',
    category: 'perifericos'
  },
  {
    id: 14,
    name: 'Mouse Gaming',
    description: '25K DPI • RGB • 7 Botones • Wireless',
    price: 79,
    originalPrice: null,
    stock: 22,
    icon: '🎮',
    category: 'perifericos'
  },
  {
    id: 15,
    name: 'Headset Gaming',
    description: '7.1 Surround • Mic • RGB • Comfort',
    price: 89,
    originalPrice: 119,
    stock: 16,
    icon: '🎮',
    category: 'perifericos'
  },
  {
    id: 16,
    name: 'Mousepad RGB',
    description: 'XXL • RGB • Anti-slip • Gaming',
    price: 39,
    originalPrice: null,
    stock: 35,
    icon: '🎮',
    category: 'perifericos'
  }
]

// Computed properties
const filteredProducts = computed(() => {
  let filtered = [...allProducts]

  // Filtro por categoría
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(product => selectedCategories.value.includes(product.category))
  }

  // Filtro por precio
  if (priceRange.value) {
    const [min, max] = priceRange.value.split('-').map(Number)
    if (priceRange.value === '2000+') {
      filtered = filtered.filter(product => product.price >= 2000)
    } else {
      filtered = filtered.filter(product => product.price >= min && product.price <= max)
    }
  }

  // Filtro por stock
  if (inStockOnly.value) {
    filtered = filtered.filter(product => product.stock > 0)
  }

  // Ordenamiento
  switch (sortBy.value) {
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'popular':
      filtered.sort((a, b) => a.stock - b.stock)
      break
  }

  return filtered
})

// Funciones
const getCategoryName = (categorySlug) => {
  const category = categories.find(cat => cat.slug === categorySlug)
  return category ? category.name : categorySlug
}

const clearFilters = () => {
  selectedCategories.value = []
  priceRange.value = ''
  inStockOnly.value = false
  sortBy.value = 'name'
}

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

// Meta tags
useHead({
  title: 'Todos los Productos - TechStore',
  meta: [
    { name: 'description', content: 'Explora nuestra completa colección de productos de tecnología. PCs, monitores, componentes y periféricos.' }
  ]
})
</script> 