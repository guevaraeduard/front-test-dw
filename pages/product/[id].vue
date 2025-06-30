<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="mb-8">
        <div class="flex items-center space-x-2 text-sm">
          <NuxtLink to="/" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors font-medium">
            Inicio
          </NuxtLink>
          <span class="text-gray-400">→</span>
          <NuxtLink :to="`/category/${product?.category?.slug}`" class="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            {{ product?.category?.name }}
          </NuxtLink>
          <span class="text-gray-400">→</span>
          <span class="px-3 py-1 bg-blue-600 text-white rounded-lg font-medium">{{ product?.name }}</span>
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
          <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center overflow-hidden">
            <img 
              :src="product.image || '/images/placeholder-product.svg'" 
              :alt="product.name"
              class="w-full h-full object-cover"
              @error="$event.target.src = '/images/placeholder-product.svg'"
            />
          </div>
          
          <!-- Miniaturas (simuladas) -->
          <div class="grid grid-cols-4 gap-2">
            <div 
              v-for="i in 4" 
              :key="i"
              class="bg-gray-200 rounded-lg h-20 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden"
            >
              <img 
                :src="product.image || '/images/placeholder-product.svg'" 
                :alt="product.name"
                class="w-full h-full object-cover"
                @error="$event.target.src = '/images/placeholder-product.svg'"
              />
            </div>
          </div>
        </div>

        <!-- Información del producto -->
        <div class="space-y-6">
          <!-- Título y categoría -->
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {{ product?.category?.name }}
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
            <span v-if="product.price_original" class="text-2xl text-gray-500 line-through">${{ product.price_original }}</span>
            <span v-if="product.price_original" class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              -{{ Math.round(((product.price_original - product.price) / product.price_original) * 100) }}%
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
              <div v-for="feature in product.characteristics" :key="feature" class="flex items-center space-x-2">
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
                <span class="text-gray-700">Garantía {{product.warranty}}</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="text-blue-500">↩️</div>
                <span class="text-gray-700">Devolución 30 días</span>
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
            <div class="bg-gray-200 h-32 flex items-center justify-center overflow-hidden">
              <img 
                :src="relatedProduct.image || '/images/placeholder-product.svg'" 
                :alt="relatedProduct.name"
                class="w-full h-full object-cover"
                @error="$event.target.src = '/images/placeholder-product.svg'"
              />
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2">{{ relatedProduct.name }}</h3>
              <p class="text-sm text-gray-600 mb-3">{{ relatedProduct.description }}</p>
              <div class="flex items-center justify-between">
                <span class="font-bold text-blue-600">${{ relatedProduct.price }}</span>
                <NuxtLink 
                  :to="`/product/${relatedProduct._id}`"
                  class="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
const cartNotification = inject('cartNotification', null)
const { getResultDataGet } = useApi()

// Estado local
const quantity = ref(1)


// Computed properties

const product = ref({})

const relatedProducts = ref({})


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



const getProducts = async () => {

const response = await getResultDataGet({
  end_point: 'frontend/product/'+route.params.id,
})
console.log(response)
if (response.operation) {
  product.value = response.data.product
  relatedProducts.value = response.data.relations
}
}


onMounted(async () => {
await getProducts()
})
</script> 