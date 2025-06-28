<template>
  <section id="productos" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Nuestros Productos</h2>
        <p class="text-xl text-gray-600">Encuentra todo lo que necesitas para tu setup</p>
      </div>
      
      <!-- Product Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <NuxtLink 
          to="/category/pcs-completas" 
          class="card p-6 text-center cursor-pointer hover:scale-105 transition-transform group"
        >
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">💻</div>
          <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">PCs Completas</h3>
          <p class="text-gray-600 text-sm">Gaming, Oficina, Diseño</p>
        </NuxtLink>
        
        <NuxtLink 
          to="/category/monitores" 
          class="card p-6 text-center cursor-pointer hover:scale-105 transition-transform group"
        >
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🖥️</div>
          <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">Monitores</h3>
          <p class="text-gray-600 text-sm">4K, Gaming, Curvos</p>
        </NuxtLink>
        
        <NuxtLink 
          to="/category/componentes" 
          class="card p-6 text-center cursor-pointer hover:scale-105 transition-transform group"
        >
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
          <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">Componentes</h3>
          <p class="text-gray-600 text-sm">CPU, GPU, RAM, SSD</p>
        </NuxtLink>
        
        <NuxtLink 
          to="/category/perifericos" 
          class="card p-6 text-center cursor-pointer hover:scale-105 transition-transform group"
        >
          <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🎮</div>
          <h3 class="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">Periféricos</h3>
          <p class="text-gray-600 text-sm">Teclados, Mouse, Audio</p>
        </NuxtLink>
      </div>

      <!-- Featured Products -->
      <div class="text-center mb-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Productos Destacados</h3>
        <p class="text-gray-600">Nuestros productos más populares</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="card overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" @click="navigateToProduct(featuredProducts[0])">
          <div class="bg-gray-200 h-48 flex items-center justify-center">
            <div class="text-6xl">💻</div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">PC Gaming Elite</h3>
            <p class="text-gray-600 mb-4">RTX 4080 • i9-13900K • 64GB RAM • 2TB NVMe</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-blue-600">$2,499</span>
              <button @click.stop="handleAddToCart(featuredProducts[0])" class="btn-primary">Agregar</button>
            </div>
          </div>
        </div>

        <div class="card overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" @click="navigateToProduct(featuredProducts[1])">
          <div class="bg-gray-200 h-48 flex items-center justify-center">
            <div class="text-6xl">🖥️</div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">Monitor 4K Gaming</h3>
            <p class="text-gray-600 mb-4">32" • 4K • 144Hz • HDR • G-Sync</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-blue-600">$899</span>
              <button @click.stop="handleAddToCart(featuredProducts[1])" class="btn-primary">Agregar</button>
            </div>
          </div>
        </div>

        <div class="card overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer" @click="navigateToProduct(featuredProducts[2])">
          <div class="bg-gray-200 h-48 flex items-center justify-center">
            <div class="text-6xl">⚡</div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">RTX 4070 Ti</h3>
            <p class="text-gray-600 mb-4">12GB GDDR6X • Ray Tracing • DLSS 3.0</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-blue-600">$799</span>
              <button @click.stop="handleAddToCart(featuredProducts[2])" class="btn-primary">Agregar</button>
            </div>
          </div>
        </div>
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

// Datos de los productos destacados
const featuredProducts = [
  {
    id: 1,
    name: 'PC Gaming Elite',
    description: 'RTX 4080 • i9-13900K • 64GB RAM • 2TB NVMe',
    price: 2499,
    originalPrice: 2799,
    icon: '💻'
  },
  {
    id: 5,
    name: 'Monitor 4K Gaming',
    description: '32" • 4K • 144Hz • HDR • G-Sync',
    price: 899,
    originalPrice: null,
    icon: '🖥️'
  },
  {
    id: 9,
    name: 'RTX 4070 Ti',
    description: '12GB GDDR6X • Ray Tracing • DLSS 3.0',
    price: 799,
    originalPrice: 899,
    icon: '⚡'
  }
]

// Función para manejar la adición al carrito
const handleAddToCart = (product) => {
  addToCart(product)
  
  // Mostrar notificación si está disponible
  if (cartNotification?.value) {
    cartNotification.value.showNotification(product.name)
  }
}

const navigateToProduct = (product) => {
  navigateTo(`/product/${product.id}`)
}
</script> 