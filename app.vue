<template>
  <div class="min-h-screen">
    <!-- Header/Navigation -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-blue-600">TechStore</h1>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#inicio" class="text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
            <a href="#productos" class="text-gray-700 hover:text-blue-600 transition-colors">Productos</a>
            <a href="#ofertas" class="text-gray-700 hover:text-blue-600 transition-colors">Ofertas</a>
            <a href="#contacto" class="text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
          </div>
          <div class="flex items-center space-x-4">
            <button class="btn-primary">Carrito (0)</button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <section id="inicio" class="gradient-bg text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-5xl font-bold mb-6">
              Tu PC de Ensueño
              <span class="block text-yellow-300">Está Aquí</span>
            </h1>
            <p class="text-xl mb-8 text-gray-100">
              Descubre nuestra amplia selección de computadoras y componentes de las mejores marcas. 
              Construye tu PC ideal o encuentra la máquina perfecta para tus necesidades.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="btn-primary bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                Ver Productos
              </button>
              <button class="btn-secondary bg-white text-gray-900">
                Configurar PC
              </button>
            </div>
          </div>
          <div class="relative">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div class="text-center">
                <div class="text-6xl mb-4">🖥️</div>
                <h3 class="text-2xl font-semibold mb-2">PC Gaming Pro</h3>
                <p class="text-gray-200 mb-4">RTX 4070 • Ryzen 7 7700X • 32GB RAM</p>
                <div class="text-3xl font-bold text-yellow-300">$1,299</div>
                <button class="btn-primary mt-4 w-full">Comprar Ahora</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir TechStore?</h2>
          <p class="text-xl text-gray-600">Las mejores garantías y el mejor servicio</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-4xl mb-4">🚚</div>
            <h3 class="text-xl font-semibold mb-2">Envío Gratis</h3>
            <p class="text-gray-600">En pedidos superiores a $500</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🛡️</div>
            <h3 class="text-xl font-semibold mb-2">Garantía Extendida</h3>
            <p class="text-gray-600">Hasta 3 años en todos los productos</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🔧</div>
            <h3 class="text-xl font-semibold mb-2">Soporte Técnico</h3>
            <p class="text-gray-600">Asesoramiento especializado 24/7</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="productos" class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Nuestros Productos</h2>
          <p class="text-xl text-gray-600">Encuentra todo lo que necesitas para tu setup</p>
        </div>
        
        <!-- Product Categories -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div class="card p-6 text-center cursor-pointer hover:scale-105 transition-transform">
            <div class="text-4xl mb-4">💻</div>
            <h3 class="text-lg font-semibold mb-2">PCs Completas</h3>
            <p class="text-gray-600 text-sm">Gaming, Oficina, Diseño</p>
          </div>
          <div class="card p-6 text-center cursor-pointer hover:scale-105 transition-transform">
            <div class="text-4xl mb-4">🖥️</div>
            <h3 class="text-lg font-semibold mb-2">Monitores</h3>
            <p class="text-gray-600 text-sm">4K, Gaming, Curvos</p>
          </div>
          <div class="card p-6 text-center cursor-pointer hover:scale-105 transition-transform">
            <div class="text-4xl mb-4">⚡</div>
            <h3 class="text-lg font-semibold mb-2">Componentes</h3>
            <p class="text-gray-600 text-sm">CPU, GPU, RAM, SSD</p>
          </div>
          <div class="card p-6 text-center cursor-pointer hover:scale-105 transition-transform">
            <div class="text-4xl mb-4">🎮</div>
            <h3 class="text-lg font-semibold mb-2">Periféricos</h3>
            <p class="text-gray-600 text-sm">Teclados, Mouse, Audio</p>
          </div>
        </div>

        <!-- Featured Products -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card overflow-hidden">
            <div class="bg-gray-200 h-48 flex items-center justify-center">
              <div class="text-6xl">💻</div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">PC Gaming Elite</h3>
              <p class="text-gray-600 mb-4">RTX 4080 • i9-13900K • 64GB RAM • 2TB NVMe</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-blue-600">$2,499</span>
                <button class="btn-primary">Comprar</button>
              </div>
            </div>
          </div>

          <div class="card overflow-hidden">
            <div class="bg-gray-200 h-48 flex items-center justify-center">
              <div class="text-6xl">🖥️</div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">Monitor 4K Gaming</h3>
              <p class="text-gray-600 mb-4">32" • 4K • 144Hz • HDR • G-Sync</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-blue-600">$899</span>
                <button class="btn-primary">Comprar</button>
              </div>
            </div>
          </div>

          <div class="card overflow-hidden">
            <div class="bg-gray-200 h-48 flex items-center justify-center">
              <div class="text-6xl">⚡</div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">RTX 4070 Ti</h3>
              <p class="text-gray-600 mb-4">12GB GDDR6X • Ray Tracing • DLSS 3.0</p>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-blue-600">$799</span>
                <button class="btn-primary">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Offers Section -->
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

    <!-- Contact Section -->
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
              
              <button type="submit" class="btn-primary w-full">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-2xl font-bold text-blue-400 mb-4">TechStore</h3>
            <p class="text-gray-400">Tu tienda de confianza para tecnología de vanguardia.</p>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Productos</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">PCs Gaming</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Componentes</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Monitores</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Periféricos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Servicios</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Armado de PC</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Mantenimiento</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Garantía</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Soporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Síguenos</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">📘</a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">📷</a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">🐦</a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">📺</a>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TechStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Component logic can be added here
</script>
