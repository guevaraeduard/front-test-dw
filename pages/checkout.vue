<template>
  <div class="py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Verificación de autenticación -->
      <div v-if="!user" class="text-center py-12">
        <div class="mb-6">
          <div class="text-6xl mb-4">🔒</div>
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Inicia sesión para continuar</h1>
          <p class="text-gray-600 mb-8">Necesitas estar logueado para completar tu compra</p>
        </div>
        
        <div class="space-y-4">
          <button 
            @click="goToLogin"
            class="btn-primary text-lg px-8 py-3"
          >
            Iniciar Sesión
          </button>
          <div>
            <button 
              @click="goToRegister"
              class="text-blue-600 hover:text-blue-800 underline"
            >
              ¿No tienes cuenta? Regístrate aquí
            </button>
          </div>
        </div>
      </div>

      <!-- Checkout para usuarios autenticados -->
      <div v-else>
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>
          <p class="text-gray-600">Completa tu información para procesar el pedido</p>
        </div>

        <!-- Información del usuario -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 class="text-lg font-semibold text-blue-900 mb-4">👤 Información del Cliente</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input 
                v-model="checkoutData.name"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :placeholder="user.name"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                v-model="checkoutData.email"
                type="email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :placeholder="user.email"
              >
            </div>
          </div>
        </div>

        <!-- Información de envío -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">🚚 Información de Envío</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input 
                v-model="checkoutData.address"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Calle y número"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
              <input 
                v-model="checkoutData.city"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ciudad"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
              <input 
                v-model="checkoutData.zipCode"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Código postal"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input 
                v-model="checkoutData.phone"
                type="tel" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Número de teléfono"
              >
            </div>
          </div>
        </div>

        <!-- Información de pago -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">💳 Información de Pago</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
              <input 
                v-model="checkoutData.cardNumber"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234 5678 9012 3456"
                maxlength="19"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Titular</label>
              <input 
                v-model="checkoutData.cardHolder"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nombre del titular"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
              <input 
                v-model="checkoutData.expiryDate"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="MM/AA"
                maxlength="5"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input 
                v-model="checkoutData.cvv"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123"
                maxlength="4"
              >
            </div>
          </div>
        </div>

        <!-- Resumen de la compra -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">📋 Resumen de la Compra</h2>
          
          <!-- Productos -->
          <div class="space-y-3 mb-6">
            <div v-for="item in cartItems" :key="item.id" class="flex justify-between items-center py-2 border-b border-gray-100">
              <div class="flex items-center space-x-3">
                <span class="text-2xl">{{ item.icon }}</span>
                <div>
                  <div class="font-medium">{{ item.name }}</div>
                  <div class="text-sm text-gray-600">Cantidad: {{ item.quantity }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</div>
                <div class="text-sm text-gray-600">${{ item.price.toFixed(2) }} c/u</div>
              </div>
            </div>
          </div>

          <!-- Totales -->
          <div class="space-y-2 border-t pt-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
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
            <div class="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span class="text-blue-600">${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Botón de confirmar compra -->
        <div class="flex justify-between items-center">
          <button 
            @click="goBack"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Volver al Carrito
          </button>
          
          <button 
            @click="confirmOrder"
            :disabled="isProcessing || cartItems.length === 0"
            class="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isProcessing" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
            <span v-else>
              Confirmar Compra
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user } = useUserAuth()
const { cartItems, subtotal, savings, shippingCost, taxes, total, clearCart } = useCart()
const { createOrder, isProcessing } = useOrders()
const { showSuccess, showError } = useGlobalNotification()
const router = useRouter()

// Datos del checkout
const checkoutData = ref({
  name: '',
  email: '',
  address: '',
  city: '',
  zipCode: '',
  phone: '',
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: ''
})

// Llenar datos del usuario si está logueado
watchEffect(() => {
  if (user.value) {
    checkoutData.value.name = user.value.name
    checkoutData.value.email = user.value.email
  }
})

// Navegación
const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}

const goBack = () => {
  router.push('/cart')
}

// Confirmar orden
const confirmOrder = async () => {
  try {
    // Validaciones básicas
    if (!checkoutData.value.address || !checkoutData.value.city || !checkoutData.value.phone) {
      showError({
        title: 'Información incompleta',
        message: 'Por favor completa todos los campos requeridos'
      })
      return
    }

    if (!checkoutData.value.cardNumber || !checkoutData.value.cardHolder || !checkoutData.value.expiryDate || !checkoutData.value.cvv) {
      showError({
        title: 'Información de pago incompleta',
        message: 'Por favor completa todos los datos de la tarjeta'
      })
      return
    }

    // Crear la orden
    const orderData = {
      userEmail: user.value.email,
      userName: checkoutData.value.name,
      userEmail: checkoutData.value.email,
      shippingAddress: {
        address: checkoutData.value.address,
        city: checkoutData.value.city,
        zipCode: checkoutData.value.zipCode,
        phone: checkoutData.value.phone
      },
      items: cartItems.value.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      subtotal: subtotal.value,
      savings: savings.value,
      shippingCost: shippingCost.value,
      taxes: taxes.value,
      total: total.value
    }

    const newOrder = await createOrder(orderData)
    
    // Limpiar carrito
    clearCart()
    
    // Mostrar éxito
    showSuccess({
      title: '¡Compra exitosa!',
      message: `Tu orden #${newOrder.id} ha sido procesada correctamente`
    })
    
    // Redirigir al dashboard del usuario
    setTimeout(() => {
      router.push('/user/dashboard')
    }, 2000)
    
  } catch (error) {
    showError({
      title: 'Error al procesar la orden',
      message: error.message
    })
  }
}
</script> 