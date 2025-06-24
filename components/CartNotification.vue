<template>
  <Transition name="notification">
    <div v-if="show" class="fixed top-4 right-4 z-50">
      <div class="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
        <div class="text-2xl">✅</div>
        <div>
          <div class="font-semibold">Producto agregado</div>
          <div class="text-sm opacity-90">{{ message }}</div>
        </div>
        <button @click="hide" class="text-white hover:text-gray-200">
          ✕
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const show = ref(false)
const message = ref('')

const showNotification = (productName) => {
  message.value = `${productName} agregado al carrito`
  show.value = true
  
  // Ocultar automáticamente después de 3 segundos
  setTimeout(() => {
    hide()
  }, 3000)
}

const hide = () => {
  show.value = false
}

// Exponer la función para que otros componentes la usen
defineExpose({
  showNotification
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style> 