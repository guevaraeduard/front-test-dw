<template>
  <section id="productos" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Nuestros Productos</h2>
        <p class="text-xl text-gray-600">Encuentra todo lo que necesitas para tu setup</p>
      </div>

      <!-- Product Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <template v-for="category in categories" :key="category._id">
          <NuxtLink :to="'/category/' + category.slug"
            class="card p-6 text-center cursor-pointer hover:scale-105 transition-transform group">
            <div class="w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <img :src="category.image" :alt="category.name" class="w-full h-full object-cover" />
            </div>
            <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors capitalize">{{
              category.name }}</h3>
            <p class="text-gray-600 text-sm">{{ category.description }}</p>
          </NuxtLink>
        </template>

      </div>

      <!-- Featured Products -->
      <div class="text-center mb-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Productos Destacados</h3>
        <p class="text-gray-600">Nuestros productos más populares</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <template v-for="product in featuredProducts" :key="product._id">
          <div class="card overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            @click="navigateToProduct(product)">
            <div class="bg-gray-200 h-48 flex items-center justify-center overflow-hidden">
              <img  :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ product.name}}</h3>
              <p class="text-gray-600 mb-4">{{ product.description_short }}</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-blue-600">${{ product.price }}</span>
                <button @click.stop="handleAddToCart(product)" class="btn-primary">Agregar</button>
              </div>
            </div>
          </div>
        </template>


      </div>

      <!-- Ver todos los productos -->
      <div class="text-center mt-12">
        <NuxtLink to="/products" class="btn-primary">
          Ver Todos los Productos
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { addToCart } = useCart()
const cartNotification = inject('cartNotification', null)
const { getResultDataGet } = useApi()

// Datos de los productos destacados
const categories = ref([])
const featuredProducts = ref([])

// Función para manejar la adición al carrito
const handleAddToCart = (product) => {
  addToCart(product)

  // Mostrar notificación si está disponible
  if (cartNotification?.value) {
    cartNotification.value.showNotification(product.name)
  }
}

const navigateToProduct = (product) => {
  navigateTo(`/product/${product._id}`)
}


const getProducts = async () => {

  const response = await getResultDataGet({
    end_point: 'frontend/products-categories',
  })
  if (response.operation) {
    categories.value = response.data.categories
    featuredProducts.value = response.data.products
  }
}


onMounted(async () => {
  await getProducts()
})
</script>