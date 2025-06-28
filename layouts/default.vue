<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <AppHeader />
    
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

// Exponer la referencia para que otros componentes la usen
provide('cartNotification', cartNotification)
</script> 