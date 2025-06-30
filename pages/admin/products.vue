<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header del Admin -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin/dashboard"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300">
              ← Volver al Dashboard
            </NuxtLink>
            <div>
              <h1 class="text-xl font-semibold text-gray-900">Gestionar Productos</h1>
              <p class="text-sm text-gray-600">Administrar el catálogo de productos</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <button @click="showAddModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              + Agregar Producto
            </button>
            <button @click="logoutAndGo"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filtros y búsqueda -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input v-model="searchTerm" type="text" placeholder="Buscar productos..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <el-select v-model="selectedCategory" class="w-full" size="large" @change="getProducts" clearable
              placeholder="Todas las categorías">
              <el-option class="capitalize" v-for="category in categories" :key="category._id" :value="category._id"
                :label="category.name" />
            </el-select>
          </div>


          <div class="flex items-end">
            <button @click="clearFilters"
              class="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mb-1">
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Tabla de productos -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Productos ({{ products.length }})
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
              <tr v-for="product in products" :key="product._id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 mr-3 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">{{ product.description_short }}</div>
                      <div class="flex items-center space-x-2 mt-1">
                        <span v-if="product.outstanding"
                          class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
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
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                    {{ product.category.name }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">${{ product.price }}</div>
                  <div v-if="product.original_price" class="text-sm text-gray-500 line-through">
                    ${{ product.original_price }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ product.stock }}</div>
                  <div v-if="product.stock < 5" class="text-xs text-red-600">
                    Stock bajo
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ product.active ? 'Activa' : 'Inactiva' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ product.sku }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end items-center space-x-2">
                    <!-- Switch para activar/desactivar -->
                    <button @click="toggleProductStatus(product)" type="button"
                      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      :class="product.active ? 'bg-blue-600' : 'bg-gray-200'">
                      <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
                        :class="product.active ? 'translate-x-6' : 'translate-x-1'"></span>
                    </button>

                    <!-- Botón editar -->
                    <button @click="editProduct(product)"
                      class="inline-flex items-center justify-center w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 shadow-sm hover:shadow-md"
                      title="Editar producto">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                        </path>
                      </svg>
                    </button>

                    <!-- Botón eliminar -->
                    <button @click="deleteProduct(product)"
                      class="inline-flex items-center justify-center w-8 h-8 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 shadow-sm hover:shadow-md bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 border-red-200 hover:border-red-300"
                      title="Eliminar producto">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                      </svg>
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
                <input v-model="productForm.name" type="text" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: PC Gaming Elite" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input v-model="productForm.sku" type="text" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: PC-ELITE-001" />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Descripción Corta</label>
                <input v-model="productForm.description_short" type="text" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: RTX 4080 • i9-13900K • 64GB RAM" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <el-select v-model="productForm.category" placeholder="Seleccionar categoría" size="large"
                  class="w-full">
                  <el-option class="capitalize" v-for="category in categories" :key="category._id" :value="category._id"
                    :label="category.name" />

                </el-select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción Completa</label>
              <textarea v-model="productForm.description" rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descripción detallada del producto"></textarea>
            </div>

            <!-- Precios y stock -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <el-input-number v-model="productForm.price" :min="1"  controls-position="right" size="large" class="!w-full" :precision="2" :step="0.1"
                   />
               
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Precio Original</label>
                <el-input-number v-model="productForm.original_price" :min="1"  controls-position="right" size="large" class="!w-full" :precision="2" :step="0.1"
                />
               
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <el-input-number v-model="productForm.stock" :min="1"  controls-position="right" size="large" class="!w-full" 
                />
               
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Garantía</label>
                <select v-model="productForm.warranty"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="1 año">1 año</option>
                  <option value="2 años">2 años</option>
                  <option value="3 años">3 años</option>
                  <option value="5 años">5 años</option>
                </select>
              </div>
            </div>

            <!-- Información física -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                <el-input-number v-model="productForm.weight" :min="0"  controls-position="right" size="large" class="!w-full" :precision="2" :step="0.1"
                />
                
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Dimensiones</label>
                <input v-model="productForm.dimensions" type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 45 x 20 x 45 cm" />
              </div>
            </div>

            <!-- Imagen del producto -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Imagen del Producto</label>
              <div class="space-y-4">
                <!-- Preview de la imagen actual -->
                <div v-if="productForm.imagePreview || (editingProduct && editingProduct.icon)"
                  class="flex items-center space-x-4">
                  <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img v-if="productForm.imagePreview" :src="productForm.imagePreview" :alt="productForm.name"
                      class="w-full h-full object-cover" />
                    <div v-else class="text-2xl">{{ editingProduct?.icon }}</div>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-600">Imagen actual</p>
                    <button type="button" @click="removeImage"
                      class="inline-flex items-center justify-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 shadow-sm hover:shadow-md"
                      title="Eliminar imagen">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Input para subir imagen -->
                <div class="flex items-center justify-center w-full">
                  <label
                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                        </path>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500">
                        <span class="font-semibold">Haz clic para subir</span> o arrastra y suelta
                      </p>
                      <p class="text-xs text-gray-500">PNG, JPG, GIF hasta 2MB</p>
                    </div>
                    <input type="file" class="hidden" accept="image/*" @change="handleImageUpload" />
                  </label>
                </div>
              </div>
            </div>

            <!-- Características -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Características (una por línea)</label>
              <textarea v-model="featuresText" rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="RTX 4080 16GB GDDR6X&#10;Intel Core i9-13900K&#10;64GB RAM DDR5 6000MHz&#10;2TB NVMe SSD PCIe 4.0"></textarea>
              <p class="text-xs text-gray-500 mt-1">Ingresa una característica por línea</p>
            </div>

            <!-- Tags -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tags (separados por comas)</label>
              <input v-model="tagsText" type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="gaming, 4k, elite, premium" />
            </div>

            <!-- Estados -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="flex items-center">
                  <input v-model="productForm.active" type="checkbox"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                  <span class="ml-2 text-sm text-gray-700">Producto Activo</span>
                </label>
              </div>

              <div>
                <label class="flex items-center">
                  <input v-model="productForm.outstanding" type="checkbox"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                  <span class="ml-2 text-sm text-gray-700">Producto Destacado</span>
                </label>
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-4 border-t">
              <button type="button" @click="closeModal"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                Cancelar
              </button>
              <button type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {{ editingProduct ? 'Actualizar' : 'Agregar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Confirmación de eliminación -->
    <ConfirmDialog :is-open="confirmDialog.isOpen.value" :title="confirmDialog.title.value"
      :message="confirmDialog.message.value" :warning="confirmDialog.warning.value"
      :confirm-text="confirmDialog.confirmText.value" :cancel-text="confirmDialog.cancelText.value"
      :is-loading="confirmDialog.isLoading.value" @confirm="confirmDialog.confirm" @cancel="confirmDialog.cancel" />

    <!-- Notificación de éxito -->
    <SuccessNotification v-if="notification.type === 'success'" :is-visible="notification.isVisible"
      :title="notification.title" :message="notification.message" :duration="notification.duration"
      @close="notification.hideNotification" />

    <!-- Notificación de error -->
    <ErrorNotification v-if="notification.type === 'error'" :is-visible="notification.isVisible"
      :title="notification.title" :message="notification.message" :duration="notification.duration"
      @close="notification.hideNotification" />
  </div>
</template>

<script setup>
import { saveFile, showToast, onlyNumbers } from '~/helpers/funtions'
const { getResultDataGet, deleteData, updateData, guardarData } = useApi()
// Middleware de autenticación
definePageMeta({
  middleware: ['user-auth', 'verify-role-admin']
})

// Composable de autenticación
const { clearAuth, user } = useAuth()

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

// Debounce para la búsqueda
let searchTimeout = null

// Estado del modal
const showAddModal = ref(false)
const editingProduct = ref(null)

// Productos simulados (usando los mismos datos que en las otras páginas)
const products = ref([])

// Categorías disponibles
const categories = ref([])

// Formulario del producto mejorado
const productForm = ref({
  _id: null,
  name: '',
  description: '',
  description_short: '',
  price: '',
  original_price: '',
  stock: '',
  category: '',
  active: true,
  outstanding: false,
  sku: '',
  weight: '',
  dimensions: '',
  warranty: '2 años',
  icon: '📦',
  image: null,
  imagePreview: null,
  features: [],
  specifications: {},
  images: ['📦', '📦', '📦', '📦'],
  tags: []
})

// Variables para el formulario
const featuresText = ref('')
const tagsText = ref('')

// Funciones para manejo de imágenes
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validar tipo de archivo
  if (!file.type.startsWith('image/')) {
    notification.showError({
      message: 'Por favor selecciona un archivo de imagen válido.'
    })
    return
  }

  // Validar tamaño (2MB)
  if (file.size > 2 * 1024 * 1024) {
    notification.showError({
      message: 'La imagen debe ser menor a 2MB.'
    })
    return
  }

  // Crear preview
  const reader = new FileReader()
  reader.onload = (e) => {
    productForm.value.imagePreview = e.target.result
    productForm.value.image = file
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  productForm.value.image = null
  productForm.value.imagePreview = null
  // Limpiar el input file
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) {
    fileInput.value = ''
  }
}

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


// Funciones


const clearFilters = () => {
  searchTerm.value = ''
  selectedCategory.value = ''
  getProducts()
}

const editProduct = (product) => {
  editingProduct.value = product
  productForm.value = {
    _id: product._id,
    name: product.name,
    description: product.description,
    description_short: product.description_short,
    price: product.price,
    original_price: product.original_price || '',
    stock: product.stock,
    category: product.category._id,
    active: product.active,
    outstanding: product.outstanding,
    sku: product.sku,
    weight: product.weight,
    dimensions: product.dimensions,
    warranty: product.warranty,
    icon: product.icon,
    image: null,
    imagePreview: product.image,
    features: [...product.characteristics],
    tags: [...product.tags]
  }
  // Convertir arrays a texto
  featuresText.value = product.characteristics.join('\n')
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
    try {
      const response = await deleteData({
        end_point: 'product/' + product._id,
      })

      if (response.operation) {
        showToast('Exito!', 'Proceso realizado correctamente', 'success')
        await getProducts()
      } else {
        showToast('Error!', response.error || 'Error interno', 'error')
      }
    } catch (error) {
      showToast('Error!', 'Error interno', 'error')
    }
  }
}

// Composable para notificaciones
const notification = useNotification()

const saveProduct = async () => {
  // Validar SKU único
  if (!productForm.value.name) {
    showToast('Advertencia!', 'El nombre del producto es requerido', 'warning')
    return
  }

  if (!productForm.value.sku) {
    showToast('Advertencia!', 'El SKU del producto es requerido', 'warning')
    return
  }

  if (!productForm.value.category) {
    showToast('Advertencia!', 'La categoría del producto es requerida', 'warning')
    return
  }

  if (!productForm.value.price) {
    showToast('Advertencia!', 'El precio del producto es requerido', 'warning')
    return
  }

  if (!productForm.value.stock) {
    showToast('Advertencia!', 'El stock del producto es requerido', 'warning')
    return
  }

  if (!productForm.value.description_short) {
    showToast('Advertencia!', 'La descripción corta del producto es requerida', 'warning')
    return
  }
  let imageUrl = null
  if (editingProduct.value?.image) {
    // Mantener la imagen existente si no se subió una nueva
    imageUrl = editingProduct.value.image
  }

  if (!productForm.value.image && !editingProduct.value?.image) {
    showToast('Advertencia!', 'La imagen del producto es requerida', 'warning')
    return
  } else if (productForm.value.image) {
    imageUrl = await saveFile(productForm.value.image)
  }
  try {
    let response
    if (!productForm.value._id) {
      response = await guardarData({
        name: productForm.value.name,
        description: productForm.value.description,
        description_short: productForm.value.description_short,
        price: productForm.value.price,
        original_price: productForm.value.original_price,
        stock: productForm.value.stock,
        category: productForm.value.category,
        active: productForm.value.active,
        outstanding: productForm.value.outstanding,
        sku: productForm.value.sku,
        weight: productForm.value.weight,
        dimensions: productForm.value.dimensions,
        warranty: productForm.value.warranty,
        icon: productForm.value.icon,
        image: imageUrl,
        characteristics: featuresArray.value,
        tags: tagsArray.value,
        end_point: 'product',
      })
    } else {
      response = await updateData({
        end_point: 'product/' + productForm.value._id,
        name: productForm.value.name,
        description: productForm.value.description,
        description_short: productForm.value.description_short,
        price: productForm.value.price,
        original_price: productForm.value.original_price,
        stock: productForm.value.stock,
        category: productForm.value.category,
        active: productForm.value.active,
        outstanding: productForm.value.outstanding,
        sku: productForm.value.sku,
        weight: productForm.value.weight,
        dimensions: productForm.value.dimensions,
        warranty: productForm.value.warranty,
        icon: productForm.value.icon,
        image: imageUrl,
        characteristics: featuresArray.value,
        tags: tagsArray.value,
      })
    }
    if (response.operation) {
      showToast('Exito!', 'Proceso realizado correctamente', 'success')
      closeModal()
      await getProducts()
    } else {
      showToast('Error!', response.error || 'Error interno', 'error')
    }
  } catch (error) {
    showToast('Error!', 'Error interno', 'error')
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingProduct.value = null
  productForm.value = {
    name: '',
    description: '',
    description_short: '',
    price: '',
    original_price: '',
    stock: '',
    category: '',
    active: true,
    outstanding: false,
    sku: '',
    weight: '',
    dimensions: '',
    warranty: '2 años',
    icon: '📦',
    image: null,
    imagePreview: null,
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
  product.active = !product.active
  updateData({
    end_point: 'product/change-active/' + product._id,
  })
}

const logoutAndGo = () => {
  clearAuth()
  navigateTo('/')
}

const getProducts = async () => {

  const response = await getResultDataGet({
    end_point: 'product',
    search: searchTerm.value || '',
    category: selectedCategory.value || '',
  })
  if (response.operation) {
    categories.value = response.data.categories
    products.value = response.data.products
  }
}

// Watcher para búsqueda con debounce
watch(searchTerm, (newValue) => {
  // Limpiar el timeout anterior
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  // Establecer un nuevo timeout de 500ms
  searchTimeout = setTimeout(() => {
    getProducts(newValue)
  }, 500)
})

onMounted(async () => {
  await getProducts()
})
</script>