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
  </div>
</template>

<script setup>
// Layout logic can be added here
const cartNotification = ref(null)

// Exponer la referencia para que otros componentes la usen
provide('cartNotification', cartNotification)
</script> 