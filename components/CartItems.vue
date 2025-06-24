<template>
  <div class="bg-white rounded-lg shadow-sm border">
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Productos en el carrito</h2>
      
      <!-- Lista de productos -->
      <div v-if="cartItems.length > 0" class="space-y-6">
        <div v-for="item in cartItems" :key="item.id" class="flex items-center space-x-4 p-4 border rounded-lg">
          <!-- Imagen del producto -->
          <div class="flex-shrink-0">
            <div class="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
              <div class="text-2xl">{{ item.icon }}</div>
            </div>
          </div>
          
          <!-- Información del producto -->
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
            <div class="flex items-center mt-2">
              <span class="text-lg font-bold text-blue-600">${{ item.price }}</span>
              <span v-if="item.originalPrice" class="text-sm text-gray-500 line-through ml-2">${{ item.originalPrice }}</span>
            </div>
          </div>
          
          <!-- Controles de cantidad -->
          <div class="flex items-center space-x-2">
            <button 
              @click="decreaseQuantity(item.id)"
              class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <span class="w-12 text-center font-medium">{{ item.quantity }}</span>
            <button 
              @click="increaseQuantity(item.id)"
              class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
          
          <!-- Precio total del item -->
          <div class="text-right">
            <div class="text-lg font-bold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</div>
          </div>
          
          <!-- Botón eliminar -->
          <button 
            @click="removeFromCart(item.id)"
            class="text-red-500 hover:text-red-700 transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <!-- Carrito vacío -->
      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">🛒</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h3>
        <p class="text-gray-600 mb-6">Agrega algunos productos para comenzar a comprar</p>
        <NuxtLink to="/" class="btn-primary">
          Continuar Comprando
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
</script> 