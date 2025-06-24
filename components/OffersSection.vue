<template>
  <section id="ofertas" class="py-16 bg-blue-600 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Ofertas Especiales</h2>
        <p class="text-xl text-blue-100">No te pierdas estas increíbles promociones</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold">Bundle Gaming</h3>
            <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-25%</span>
          </div>
          <p class="text-blue-100 mb-4">PC Gaming + Monitor + Periféricos</p>
          <div class="flex items-center gap-4 mb-4">
            <span class="text-3xl font-bold">$1,799</span>
            <span class="text-xl line-through text-blue-200">$2,399</span>
          </div>
          <button class="btn-primary bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-full">
            Aprovechar Oferta
          </button>
        </div>

        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold">Financiamiento 0%</h3>
            <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">12 MSI</span>
          </div>
          <p class="text-blue-100 mb-4">Sin intereses en compras superiores a $1,000</p>
          <div class="mb-4">
            <span class="text-3xl font-bold">$0</span>
            <span class="text-blue-100"> de intereses</span>
          </div>
          <button class="btn-primary bg-green-500 hover:bg-green-600 text-white w-full">
            Solicitar Crédito
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Offers section component logic can be added here
</script> 