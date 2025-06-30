<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header de la categoría -->
      <div class="mb-8">
        <div class="flex items-center space-x-4 mb-4">
          <NuxtLink to="/" class="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Volver a Inicio
          </NuxtLink>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2 capitalize">{{ category.name }}</h1>
        <p class="text-gray-600">{{ category.description }}</p>
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
          :key="product._id"
          class="card overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          @click="navigateToProduct(product)"
        >
          <div class="bg-gray-200 h-48 flex items-center justify-center overflow-hidden">
            <img 
              :src="product.image" 
              :alt="product.name"
              class="w-full h-full object-cover"
            />
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
const { getResultDataGet } = useApi()
const route = useRoute()
const { addToCart } = useCart()
const cartNotification = inject('cartNotification', null)

// Estado para ordenamiento
const sortBy = ref('name')
const category = ref({})

// Computed properties


const products = ref([])

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
  navigateTo(`/product/${product._id}`)
}

// Meta tags dinámicos
useHead({
  title: `TechStore`,
  meta: [
    { name: 'description', content: 'categorias' }
  ]
})


const getProducts = async () => {

const response = await getResultDataGet({
  end_point: 'frontend/category/'+ route.params.slug,
})
console.log(response)
if (response.operation) {
  category.value = response.data.category
  products.value = response.data.products
}
}


onMounted(async () => {
  await getProducts()
})


</script> 