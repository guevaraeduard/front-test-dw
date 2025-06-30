<template>
  <div class="bg-white rounded-lg shadow-sm border">
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Resumen de la compra</h2>
      
      <!-- Detalles del pedido -->
      <div class="space-y-4 mb-6">
        <div class="flex justify-between">
          <span class="text-gray-600">Subtotal ({{ totalItems }} productos)</span>
          <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
        </div>
        
        <div v-if="savings > 0" class="flex justify-between text-green-600">
          <span>Ahorro</span>
          <span class="font-medium">-${{ savings.toFixed(2) }}</span>
        </div>
        
        <div class="flex justify-between">
          <span class="text-gray-600">Envío</span>
          <span class="font-medium">{{ shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}` }}</span>
        </div>
        
        <div class="flex justify-between">
          <span class="text-gray-600">Impuestos</span>
          <span class="font-medium">${{ taxes.toFixed(2) }}</span>
        </div>
        
        <div class="border-t pt-4">
          <div class="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span class="text-blue-600">${{ total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      
      <!-- Cupón de descuento -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Cupón de descuento</label>
        <div class="flex space-x-2">
          <input 
            v-model="couponCode"
            type="text" 
            placeholder="Ingresa tu código"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
          <button disabled
            @click="applyCoupon"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Aplicar
          </button>
        </div>
      </div>
      
      <!-- Botón de checkout -->
      <button 
        @click="proceedToCheckout"
        class="w-full btn-primary text-lg py-4"
        :disabled="cartItems.length === 0"
      >
        Proceder al Pago
      </button>
      
      <!-- Información adicional -->
      <div class="mt-6 space-y-3 text-sm text-gray-600">
        <div class="flex items-center">
          <div class="text-green-500 mr-2">✓</div>
          <span>Envío gratis en pedidos superiores a $500</span>
        </div>
        <div class="flex items-center">
          <div class="text-green-500 mr-2">✓</div>
          <span>Garantía de 30 días</span>
        </div>
        <div class="flex items-center">
          <div class="text-green-500 mr-2">✓</div>
          <span>Devolución gratuita</span>
        </div>
      </div>
      
      <!-- Métodos de pago -->
      <div class="mt-6">
        <h3 class="text-sm font-medium text-gray-700 mb-3">Métodos de pago aceptados</h3>
        <div class="flex space-x-2">
          <div class="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs">💳</div>
          <div class="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs">🏦</div>
          <div class="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs">📱</div>
          <div class="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs">💸</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { cartItems, totalItems, subtotal, savings, shippingCost, taxes, total } = useCart()
const { user } = useAuth()

const { showError } = useGlobalNotification()
const router = useRouter()

const couponCode = ref('')

// Funciones
const applyCoupon = () => {
  if (couponCode.value.trim()) {
    // Aquí se aplicaría la lógica del cupón
    alert(`Cupón "${couponCode.value}" aplicado`)
  }
}

const proceedToCheckout = () => {
  if (cartItems.length === 0) {
    showError({
      title: 'Carrito vacío',
      message: 'Agrega productos al carrito antes de proceder al pago'
    })
    return
  }

  if (!user.value) {
    showError({
      title: 'Inicia sesión',
      message: 'Necesitas estar logueado para continuar con la compra'
    })
    // Redirigir al login con returnUrl
    router.push('/login?returnUrl=/checkout')
    return
  }

  // Redirigir al checkout
  router.push('/checkout')
}
</script> 