<template>
  <section id="contacto" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Contáctanos</h2>
          <p class="text-gray-600 mb-8">
            ¿Necesitas asesoramiento para elegir tu PC? Nuestros expertos están aquí para ayudarte.
          </p>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="text-2xl mr-4">📞</div>
              <div>
                <h3 class="font-semibold">Teléfono</h3>
                <p class="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="text-2xl mr-4">📧</div>
              <div>
                <h3 class="font-semibold">Email</h3>
                <p class="text-gray-600">info@techstore.com</p>
              </div>
            </div>
            
            <div class="flex items-center">
              <div class="text-2xl mr-4">📍</div>
              <div>
                <h3 class="font-semibold">Dirección</h3>
                <p class="text-gray-600">123 Tech Street, Silicon Valley, CA</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card p-8">
          <h3 class="text-xl font-semibold mb-6">Envíanos un mensaje</h3>
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
              <textarea rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
            </div>
            
            <button type="submit" disabled class="btn-primary w-full">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Contact section component logic can be added here
</script> 