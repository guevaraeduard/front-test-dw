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
              <h1 class="text-xl font-semibold text-gray-900">Gestionar Categorías</h1>
              <p class="text-sm text-gray-600">Administrar categorías de productos</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <button @click="showAddModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              + Agregar Categoría
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
      <!-- Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="text-3xl text-blue-600 mr-4">🏷️</div>
            <div>
              <p class="text-sm font-medium text-gray-600">Total Categorías</p>
              <p class="text-2xl font-bold text-gray-900">{{ categories.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="text-3xl text-green-600 mr-4">📦</div>
            <div>
              <p class="text-sm font-medium text-gray-600">Total Productos</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalProducts }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="text-3xl text-purple-600 mr-4">⭐</div>
            <div>
              <p class="text-sm font-medium text-gray-600">Categorías Activas</p>
              <p class="text-2xl font-bold text-gray-900">{{ activeCategories }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de categorías -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            Categorías ({{ categories.length }})
          </h3>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="category in categories" :key="category._id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 mr-3 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img :src="category.image" :alt="category.name" class="w-full h-full object-cover" />

                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900 capitalize">{{ category.name }}</div>

                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs truncate">{{ category.description || 'Sin descripción' }}
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ category.active ? 'Activa' : 'Inactiva' }}
                  </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end items-center space-x-2">
                    <!-- Switch para activar/desactivar -->
                    <button @click="toggleCategoryStatus(category)"
                      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      :class="category.active ? 'bg-blue-600' : 'bg-gray-200'">
                      <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
                        :class="category.active ? 'translate-x-6' : 'translate-x-1'"></span>
                    </button>

                    <!-- Botón editar -->
                    <button @click="editCategory(category)"
                      class="inline-flex items-center justify-center w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 shadow-sm hover:shadow-md"
                      title="Editar categoría">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                        </path>
                      </svg>
                    </button>

                    <!-- Botón eliminar -->
                    <button @click="deleteCategory(category)"
                      class="inline-flex items-center justify-center w-8 h-8 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 shadow-sm hover:shadow-md bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 border-red-200 hover:border-red-300"
                      :title="'Eliminar categoría'">
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

    <!-- Modal para agregar/editar categoría -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingCategory ? 'Editar Categoría' : 'Agregar Categoría' }}
          </h3>

          <form @submit.prevent="saveCategory" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input v-model="categoryForm.name" type="text" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: PCs Completas" />
            </div>



            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea v-model="categoryForm.description" rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descripción de la categoría"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Imagen de la Categoría</label>
              <div class="space-y-4">
                <!-- Preview de la imagen actual -->
                <div v-if="categoryForm.imagePreview || (editingCategory && editingCategory.image)"
                  class="flex items-center space-x-4">
                  <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img :src="categoryForm.imagePreview || editingCategory?.image" :alt="categoryForm.name"
                      class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-600">Imagen actual</p>
                    <button type="button" @click="removeImage"
                      class="inline-flex items-center justify-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 shadow-sm hover:shadow-md"
                      title="Eliminar imagen">
                      <svg class="w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
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


            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Orden</label>
              <input v-model="categoryForm.order" type="number" min="1" required @keypress="onlyNumbers"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>




            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="closeModal"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                Cancelar
              </button>
              <button type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {{ editingCategory ? 'Actualizar' : 'Agregar' }}
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
// Importar funciones y composables necesarios
import { saveFile, showToast, onlyNumbers } from '~/helpers/funtions'
import { useApi } from '~/composables/useApi'

// Middleware de autenticación
definePageMeta({
  middleware: ['user-auth', 'verify-role-admin']
})

// Composable de autenticación
const { clearAuth, user } = useAuth()
const { guardarData, getResultDataGet, deleteData, updateData } = useApi()

// Meta tags
useHead({
  title: 'Gestionar Categorías - Panel de Administración',
  meta: [
    { name: 'description', content: 'Administrar categorías de productos' }
  ]
})

// Estado del modal
const showAddModal = ref(false)
const editingCategory = ref(null)

// Formulario de la categoría
const categoryForm = ref({
  name: '',
  description: '',
  image: null,
  imagePreview: null,
  order: 1,
  _id: null
})

// Categorías simuladas (actualizar para incluir imágenes)
const categories = ref([])

// Composable para confirmaciones
const confirmDialog = useConfirmDialog()

// Composable para notificaciones
const notification = useNotification()
const totalProducts = ref(0)
const activeCategories = computed(() => {
  return categories.value.filter(cat => cat.active).length
})
// Funciones

const editCategory = (category) => {
  editingCategory.value = category
  categoryForm.value = {
    ...category,
    image: null,
    imagePreview: null
  }
  showAddModal.value = true
}

const toggleCategoryStatus = (category) => {
  category.active = !category.active
  updateData({
    end_point: 'category/change-active/' + category._id,
  })
}

const deleteCategory = async (category) => {

  const confirmed = await confirmDialog.showConfirm({
    title: 'Eliminar Categoría',
    message: `¿Estás seguro de que quieres eliminar la categoría "${category.name}"? Esta acción no se puede deshacer.`,
    confirmText: 'Eliminar',
    cancelText: 'Cancelar'
  })

  if (confirmed) {
    try {
      const response = await deleteData({
        end_point: 'category/' + category._id,
      })

      if (response.operation) {
        showToast('Exito!', 'Proceso realizado correctamente', 'success')
        await getCategories()
      } else {
        showToast('Error!', response.error || 'Error interno', 'error')
      }
    } catch (error) {
      showToast('Error!', 'Error interno', 'error')
    }
  }
}

const saveCategory = async () => {

  // Procesar imagen si se subió una nueva
  let imageUrl = null

  if (!categoryForm.value.name) {
    showToast('Advertencia!', 'El nombre de la categoría es requerido', 'warning')
    return
  }

  if (editingCategory.value?.image) {
    // Mantener la imagen existente si no se subió una nueva
    imageUrl = editingCategory.value.image
  }

  if (!categoryForm.value.image) {
    showToast('Advertencia!', 'La imagen de la categoría es requerida', 'warning')
    return
  } else {
    imageUrl = await saveFile(categoryForm.value.image)
  }

  try {
    let response
    if (!categoryForm.value._id) {
      response = await guardarData({
        name: categoryForm.value.name,
        description: categoryForm.value.description,
        image: imageUrl,
        order: categoryForm.value.order,
        end_point: 'category',
      })
    } else {
      response = await updateData({
        end_point: 'category/' + categoryForm.value._id,
        name: categoryForm.value.name,
        description: categoryForm.value.description,
        image: imageUrl,
        order: categoryForm.value.order,
      })
    }


    if (response.operation) {
      showToast('Exito!', 'Proceso realizado correctamente', 'success')
      closeModal()
      await getCategories()
    } else {
      showToast('Error!', response.error || 'Error interno', 'error')
    }
  } catch (error) {
    showToast('Error!', 'Error interno', 'error')
  }

}

const closeModal = () => {
  showAddModal.value = false
  editingCategory.value = null
  categoryForm.value = {
    name: '',
    slug: '',
    description: '',
    icon: '📦',
    image: null,
    imagePreview: null,
    order: 1,
    active: true
  }
}

const logoutAndGo = () => {
  clearAuth()
  navigateTo('/')
}


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
    categoryForm.value.imagePreview = e.target.result
    categoryForm.value.image = file
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  categoryForm.value.image = null
  categoryForm.value.imagePreview = null
  // Limpiar el input file
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) {
    fileInput.value = ''
  }
}

const getCategories = async () => {
  const response = await getResultDataGet({
    end_point: 'category',
  })
  
  if (response.operation) {
    categories.value = response.data.categories
    totalProducts.value = response.data.products
  }
}

onMounted(async () => {
  await getCategories()
})
</script>