<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <AppHeader v-if="route.path != '/admin/dashboard' && route.path != '/admin/categories' && route.path != '/admin/orders' && route.path != '/admin/products' && route.path != '/admin/users' "/>
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <AppFooter />
    
    <!-- Cart Notification -->
    <CartNotification ref="cartNotification" />
    
    <!-- Success Notification -->
    <SuccessNotification 
      :is-visible="isVisible && type === 'success'"
      :title="title || 'Éxito'"
      :message="message || ''"
      :duration="duration || 4000"
      @close="hideNotification"
    />
    
    <!-- Error Notification -->
    <ErrorNotification 
      :is-visible="isVisible && type === 'error'"
      :title="title || 'Error'"
      :message="message || ''"
      :duration="duration || 6000"
      @close="hideNotification"
    />
  </div>
</template>

<script setup>
// Layout logic can be added here
const cartNotification = ref(null)
const { isVisible, title, message, duration, type, hideNotification } = useGlobalNotification()

// Obtener la ruta actual
const route = useRoute()

// Exponer la referencia para que otros componentes la usen
provide('cartNotification', cartNotification)
</script> 