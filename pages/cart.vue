<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header del carrito -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Carrito de Compras</h1>
        <p class="text-gray-600">Revisa tus productos antes de finalizar la compra</p>
      </div>

      <!-- Contenido del carrito -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Lista de productos -->
        <div class="lg:col-span-2">
          <CartItems />
        </div>

        <!-- Resumen de la compra -->
        <div class="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Cart page logic can be added here
</script> 