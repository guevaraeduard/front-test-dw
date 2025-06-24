<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header del Admin -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin/dashboard" class="text-blue-600 hover:text-blue-800">
              ← Volver al Dashboard
            </NuxtLink>
            <div>
              <h1 class="text-xl font-semibold text-gray-900">Gestionar Productos</h1>
              <p class="text-sm text-gray-600">Administrar el catálogo de productos</p>
            </div>
          </div>
          
          <button 
            @click="showAddModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Agregar Producto
          </button>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filtros y búsqueda -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Buscar productos..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <select
              v-model="selectedCategory"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas las categorías</option>
              <option value="pcs-completas">PCs Completas</option>
              <option value="monitores">Monitores</option>
              <option value="componentes">Componentes</option>
              <option value="perifericos">Periféricos</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <select
              v-model="stockFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="in-stock">En stock</option>
              <option value="low-stock">Stock bajo</option>
              <option value="out-of-stock">Sin stock</option>
            </select>
          </div>
          
          <div class="flex items-end">
            <button 
              @click="clearFilters"
              class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Tabla de productos -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Productos ({{ filteredProducts.length }})
          </h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3">{{ product.icon }}</div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">{{ product.shortDescription }}</div>
                      <div class="flex items-center space-x-2 mt-1">
                        <span v-if="product.featured" class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Destacado
                        </span>
                        <span v-if="product.active" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Activo
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ getCategoryName(product.category) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">${{ product.price }}</div>
                  <div v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
                    ${{ product.originalPrice }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ product.stock }}</div>
                  <div v-if="product.stock < 5" class="text-xs text-red-600">
                    Stock bajo
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  >
                    {{ product.active ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ product.sku }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button 
                      @click="editProduct(product)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button 
                      @click="toggleProductStatus(product)"
                      :class="product.active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
                    >
                      {{ product.active ? 'Desactivar' : 'Activar' }}
                    </button>
                    <button 
                      @click="deleteProduct(product)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal para agregar/editar producto -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingProduct ? 'Editar Producto' : 'Agregar Producto' }}
          </h3>
          
          <form @submit.prevent="saveProduct" class="space-y-6">
            <!-- Información básica -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                <input
                  v-model="productForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: PC Gaming Elite"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  v-model="productForm.sku"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: PC-ELITE-001"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Descripción Corta</label>
                <input
                  v-model="productForm.shortDescription"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: RTX 4080 • i9-13900K • 64GB RAM"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  v-model="productForm.category"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleccionar categoría</option>
                  <option v-for="category in categories" :key="category.slug" :value="category.slug">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción Completa</label>
              <textarea
                v-model="productForm.description"
                rows="3"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descripción detallada del producto"
              ></textarea>
            </div>
            
            <!-- Precios y stock -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <input
                  v-model="productForm.price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Precio Original</label>
                <input
                  v-model="productForm.originalPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Opcional"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  v-model="productForm.stock"
                  type="number"
                  min="0"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Garantía</label>
                <select
                  v-model="productForm.warranty"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1 año">1 año</option>
                  <option value="2 años">2 años</option>
                  <option value="3 años">3 años</option>
                  <option value="5 años">5 años</option>
                </select>
              </div>
            </div>
            
            <!-- Información física -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                <input
                  v-model="productForm.weight"
                  type="number"
                  min="0"
                  step="0.1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Dimensiones</label>
                <input
                  v-model="productForm.dimensions"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 45 x 20 x 45 cm"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                <div class="grid grid-cols-6 gap-2">
                  <button
                    v-for="icon in availableIcons"
                    :key="icon"
                    type="button"
                    @click="productForm.icon = icon"
                    class="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                    :class="productForm.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-300'"
                  >
                    <div class="text-xl">{{ icon }}</div>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Características -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Características (una por línea)</label>
              <textarea
                v-model="featuresText"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="RTX 4080 16GB GDDR6X&#10;Intel Core i9-13900K&#10;64GB RAM DDR5 6000MHz&#10;2TB NVMe SSD PCIe 4.0"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">Ingresa una característica por línea</p>
            </div>
            
            <!-- Tags -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tags (separados por comas)</label>
              <input
                v-model="tagsText"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="gaming, 4k, elite, premium"
              />
            </div>
            
            <!-- Estados -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="flex items-center">
                  <input
                    v-model="productForm.active"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span class="ml-2 text-sm text-gray-700">Producto Activo</span>
                </label>
              </div>
              
              <div>
                <label class="flex items-center">
                  <input
                    v-model="productForm.featured"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span class="ml-2 text-sm text-gray-700">Producto Destacado</span>
                </label>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {{ editingProduct ? 'Actualizar' : 'Agregar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Confirmación de eliminación -->
    <ConfirmDialog
      :is-open="confirmDialog.isOpen.value"
      :title="confirmDialog.title.value"
      :message="confirmDialog.message.value"
      :warning="confirmDialog.warning.value"
      :confirm-text="confirmDialog.confirmText.value"
      :cancel-text="confirmDialog.cancelText.value"
      :is-loading="confirmDialog.isLoading.value"
      @confirm="confirmDialog.confirm"
      @cancel="confirmDialog.cancel"
    />
    
    <!-- Notificación de éxito -->
    <SuccessNotification
      v-if="notification.type === 'success'"
      :is-visible="notification.isVisible"
      :title="notification.title"
      :message="notification.message"
      :duration="notification.duration"
      @close="notification.hideNotification"
    />
    
    <!-- Notificación de error -->
    <ErrorNotification
      v-if="notification.type === 'error'"
      :is-visible="notification.isVisible"
      :title="notification.title"
      :message="notification.message"
      :duration="notification.duration"
      @close="notification.hideNotification"
    />
  </div>
</template>

<script setup>
// Middleware de autenticación
definePageMeta({
  middleware: 'auth-client'
})

// Composable de autenticación
const { user } = useAdminAuth()

// Meta tags
useHead({
  title: 'Gestionar Productos - Panel de Administración',
  meta: [
    { name: 'description', content: 'Administrar productos del catálogo' }
  ]
})

// Estado de filtros
const searchTerm = ref('')
const selectedCategory = ref('')
const stockFilter = ref('')

// Estado del modal
const showAddModal = ref(false)
const editingProduct = ref(null)

// Productos simulados (usando los mismos datos que en las otras páginas)
const products = ref([
  {
    id: 1,
    name: 'PC Gaming Elite',
    description: 'La PC gaming definitiva para los jugadores más exigentes. Rendimiento excepcional para juegos en 4K y streaming.',
    shortDescription: 'RTX 4080 • i9-13900K • 64GB RAM • 2TB NVMe',
    price: 2499,
    originalPrice: 2799,
    stock: 5,
    icon: '💻',
    category: 'pcs-completas',
    active: true,
    featured: true,
    sku: 'PC-ELITE-001',
    weight: 15.5,
    dimensions: '45 x 20 x 45 cm',
    warranty: '2 años',
    features: [
      'RTX 4080 16GB GDDR6X',
      'Intel Core i9-13900K',
      '64GB RAM DDR5 6000MHz',
      '2TB NVMe SSD PCIe 4.0',
      'Fuente 850W 80+ Gold',
      'Líquido refrigeración AIO'
    ],
    specifications: {
      'Procesador': {
        'Modelo': 'Intel Core i9-13900K',
        'Núcleos': '24 (8P + 16E)',
        'Frecuencia': 'Hasta 5.8 GHz',
        'Socket': 'LGA 1700'
      },
      'Tarjeta Gráfica': {
        'Modelo': 'NVIDIA RTX 4080',
        'Memoria': '16GB GDDR6X',
        'Ray Tracing': 'Sí',
        'DLSS': '3.0'
      },
      'Memoria': {
        'Capacidad': '64GB',
        'Tipo': 'DDR5',
        'Velocidad': '6000MHz',
        'Configuración': 'Dual Channel'
      },
      'Almacenamiento': {
        'Capacidad': '2TB',
        'Tipo': 'NVMe SSD',
        'Interfaz': 'PCIe 4.0',
        'Velocidad': '7000 MB/s'
      }
    },
    images: ['💻', '💻', '💻', '💻'],
    tags: ['gaming', '4k', 'elite', 'premium'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'PC Gaming Pro',
    description: 'PC gaming de alto rendimiento perfecta para juegos en 1440p y 4K. Excelente relación calidad-precio.',
    shortDescription: 'RTX 4070 • Ryzen 7 7700X • 32GB RAM • 1TB NVMe',
    price: 1299,
    originalPrice: null,
    stock: 8,
    icon: '💻',
    category: 'pcs-completas',
    active: true,
    featured: false,
    sku: 'PC-PRO-002',
    weight: 12.8,
    dimensions: '42 x 18 x 42 cm',
    warranty: '2 años',
    features: [
      'RTX 4070 12GB GDDR6X',
      'AMD Ryzen 7 7700X',
      '32GB RAM DDR5 5600MHz',
      '1TB NVMe SSD PCIe 4.0',
      'Fuente 750W 80+ Gold',
      'Refrigeración por aire premium'
    ],
    specifications: {
      'Procesador': {
        'Modelo': 'AMD Ryzen 7 7700X',
        'Núcleos': '8 Cores / 16 Threads',
        'Frecuencia': 'Hasta 5.4 GHz',
        'Socket': 'AM5'
      },
      'Tarjeta Gráfica': {
        'Modelo': 'NVIDIA RTX 4070',
        'Memoria': '12GB GDDR6X',
        'Ray Tracing': 'Sí',
        'DLSS': '3.0'
      },
      'Memoria': {
        'Capacidad': '32GB',
        'Tipo': 'DDR5',
        'Velocidad': '5600MHz',
        'Configuración': 'Dual Channel'
      },
      'Almacenamiento': {
        'Capacidad': '1TB',
        'Tipo': 'NVMe SSD',
        'Interfaz': 'PCIe 4.0',
        'Velocidad': '5000 MB/s'
      }
    },
    images: ['💻', '💻', '💻', '💻'],
    tags: ['gaming', 'pro', '1440p', 'amd'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 5,
    name: 'Monitor 4K Gaming',
    description: 'Monitor gaming de 32 pulgadas con resolución 4K, alta frecuencia de refresco y tecnología HDR.',
    shortDescription: '32" • 4K • 144Hz • HDR • G-Sync',
    price: 899,
    originalPrice: null,
    stock: 7,
    icon: '🖥️',
    category: 'monitores',
    active: true,
    featured: true,
    sku: 'MON-4K-005',
    weight: 8.2,
    dimensions: '72 x 32 x 20 cm',
    warranty: '3 años',
    features: [
      '32" 4K UHD (3840x2160)',
      '144Hz Refresh Rate',
      'HDR 400',
      'G-Sync Compatible',
      '1ms Response Time',
      'DisplayPort 1.4'
    ],
    specifications: {
      'Pantalla': {
        'Tamaño': '32 pulgadas',
        'Resolución': '3840 x 2160 (4K)',
        'Tipo': 'IPS',
        'Aspect Ratio': '16:9'
      },
      'Rendimiento': {
        'Refresh Rate': '144Hz',
        'Response Time': '1ms (GtG)',
        'HDR': 'HDR 400',
        'Color Gamut': '95% DCI-P3'
      },
      'Conectividad': {
        'DisplayPort': '1.4 x 1',
        'HDMI': '2.1 x 2',
        'USB Hub': '3.0 x 4',
        'Audio': '3.5mm Jack'
      },
      'Características': {
        'G-Sync': 'Compatible',
        'FreeSync': 'Premium Pro',
        'VESA Mount': '100x100mm',
        'Inclinación': '-5° a +20°'
      }
    },
    images: ['🖥️', '🖥️', '🖥️', '🖥️'],
    tags: ['4k', 'gaming', 'hdr', 'gsync'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 9,
    name: 'RTX 4070 Ti',
    description: 'Tarjeta gráfica de alto rendimiento con tecnología de ray tracing y DLSS 3.0 para gaming en 4K.',
    shortDescription: '12GB GDDR6X • Ray Tracing • DLSS 3.0',
    price: 799,
    originalPrice: 899,
    stock: 10,
    icon: '⚡',
    category: 'componentes',
    active: true,
    featured: true,
    sku: 'GPU-4070TI-009',
    weight: 2.1,
    dimensions: '30 x 14 x 6 cm',
    warranty: '3 años',
    features: [
      '12GB GDDR6X',
      'Ray Tracing Cores',
      'DLSS 3.0',
      'PCIe 4.0',
      '3 Ventiladores',
      'RGB Lighting'
    ],
    specifications: {
      'Especificaciones': {
        'GPU': 'AD104-400',
        'CUDA Cores': '7680',
        'RT Cores': '60',
        'Tensor Cores': '240'
      },
      'Memoria': {
        'Capacidad': '12GB',
        'Tipo': 'GDDR6X',
        'Bus Width': '192-bit',
        'Velocidad': '21 Gbps'
      },
      'Rendimiento': {
        'Boost Clock': '2610 MHz',
        'Base Clock': '2310 MHz',
        'TDP': '285W',
        'PSU Requerida': '750W'
      },
      'Conectividad': {
        'DisplayPort': '1.4a x 3',
        'HDMI': '2.1 x 1',
        'PCIe': '4.0 x16',
        'Power Connector': '8-pin + 8-pin'
      }
    },
    images: ['⚡', '⚡', '⚡', '⚡'],
    tags: ['gpu', 'rtx', 'raytracing', 'dlss'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  }
])

// Categorías disponibles
const categories = ref([
  { slug: 'pcs-completas', name: 'PCs Completas' },
  { slug: 'monitores', name: 'Monitores' },
  { slug: 'componentes', name: 'Componentes' },
  { slug: 'perifericos', name: 'Periféricos' }
])

// Formulario del producto mejorado
const productForm = ref({
  name: '',
  description: '',
  shortDescription: '',
  price: '',
  originalPrice: '',
  stock: '',
  category: '',
  active: true,
  featured: false,
  sku: '',
  weight: '',
  dimensions: '',
  warranty: '2 años',
  icon: '📦',
  features: [],
  specifications: {},
  images: ['📦', '📦', '📦', '📦'],
  tags: []
})

// Iconos disponibles
const availableIcons = [
  '💻', '🖥️', '⚡', '🎮', '📱', '⌨️', '🖱️', '🎧', '📦', '🔧', '💾', '🖨️'
]

// Variables para el formulario
const featuresText = ref('')
const tagsText = ref('')

// Computed properties para convertir texto a arrays
const featuresArray = computed({
  get: () => featuresText.value.split('\n').filter(f => f.trim()),
  set: (value) => {
    featuresText.value = value.join('\n')
  }
})

const tagsArray = computed({
  get: () => tagsText.value.split(',').map(t => t.trim()).filter(t => t),
  set: (value) => {
    tagsText.value = value.join(', ')
  }
})

// Computed properties
const filteredProducts = computed(() => {
  let filtered = [...products.value]

  // Filtro por búsqueda
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    )
  }

  // Filtro por categoría
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Filtro por stock
  if (stockFilter.value) {
    switch (stockFilter.value) {
      case 'in-stock':
        filtered = filtered.filter(product => product.stock > 0)
        break
      case 'low-stock':
        filtered = filtered.filter(product => product.stock > 0 && product.stock < 5)
        break
      case 'out-of-stock':
        filtered = filtered.filter(product => product.stock === 0)
        break
    }
  }

  return filtered
})

// Funciones
const getCategoryName = (categorySlug) => {
  const categories = {
    'pcs-completas': 'PCs Completas',
    'monitores': 'Monitores',
    'componentes': 'Componentes',
    'perifericos': 'Periféricos'
  }
  return categories[categorySlug] || categorySlug
}

const clearFilters = () => {
  searchTerm.value = ''
  selectedCategory.value = ''
  stockFilter.value = ''
}

const editProduct = (product) => {
  editingProduct.value = product
  productForm.value = {
    name: product.name,
    description: product.description,
    shortDescription: product.shortDescription,
    price: product.price,
    originalPrice: product.originalPrice || '',
    stock: product.stock,
    category: product.category,
    active: product.active,
    featured: product.featured,
    sku: product.sku,
    weight: product.weight,
    dimensions: product.dimensions,
    warranty: product.warranty,
    icon: product.icon,
    features: [...product.features],
    specifications: { ...product.specifications },
    images: [...product.images],
    tags: [...product.tags]
  }
  
  // Convertir arrays a texto
  featuresText.value = product.features.join('\n')
  tagsText.value = product.tags.join(', ')
  
  showAddModal.value = true
}

// Composable para confirmaciones
const confirmDialog = useConfirmDialog()

const deleteProduct = async (product) => {
  const confirmed = await confirmDialog.showConfirm({
    title: 'Eliminar Producto',
    message: `¿Estás seguro de que quieres eliminar "${product.name}"? Esta acción no se puede deshacer.`,
    confirmText: 'Eliminar',
    cancelText: 'Cancelar'
  })
  
  if (confirmed) {
    const index = products.value.findIndex(p => p.id === product.id)
    if (index > -1) {
      products.value.splice(index, 1)
    }
  }
}

// Composable para notificaciones
const notification = useNotification()

const saveProduct = () => {
  // Validar SKU único
  const existingProduct = products.value.find(p => 
    p.sku === productForm.value.sku && p.id !== editingProduct.value?.id
  )
  if (existingProduct) {
    notification.showError({
      message: 'Ya existe un producto con ese SKU.'
    })
    return
  }
  
  const productData = {
    ...productForm.value,
    price: parseFloat(productForm.value.price),
    originalPrice: productForm.value.originalPrice ? parseFloat(productForm.value.originalPrice) : null,
    stock: parseInt(productForm.value.stock),
    weight: parseFloat(productForm.value.weight) || 0,
    features: featuresArray.value,
    tags: tagsArray.value,
    images: productForm.value.images,
    specifications: productForm.value.specifications,
    createdAt: editingProduct.value ? editingProduct.value.createdAt : new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  }
  
  if (editingProduct.value) {
    // Actualizar producto existente
    const index = products.value.findIndex(p => p.id === editingProduct.value.id)
    if (index > -1) {
      products.value[index] = {
        ...products.value[index],
        ...productData
      }
    }
    notification.showSuccess({
      title: 'Producto actualizado',
      message: `El producto "${productData.name}" ha sido actualizado correctamente.`
    })
  } else {
    // Agregar nuevo producto
    const newProduct = {
      id: Date.now(),
      ...productData
    }
    products.value.push(newProduct)
    notification.showSuccess({
      title: 'Producto agregado',
      message: `El producto "${productData.name}" ha sido agregado correctamente.`
    })
  }
  
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingProduct.value = null
  productForm.value = {
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    originalPrice: '',
    stock: '',
    category: '',
    active: true,
    featured: false,
    sku: '',
    weight: '',
    dimensions: '',
    warranty: '2 años',
    icon: '📦',
    features: [],
    specifications: {},
    images: ['📦', '📦', '📦', '📦'],
    tags: []
  }
  
  // Limpiar texto
  featuresText.value = ''
  tagsText.value = ''
}

const toggleProductStatus = (product) => {
  const index = products.value.findIndex(p => p.id === product.id)
  if (index > -1) {
    products.value[index].active = !product.active
  }
}
</script> 