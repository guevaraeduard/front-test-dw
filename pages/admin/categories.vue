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
              <h1 class="text-xl font-semibold text-gray-900">Gestionar Categorías</h1>
              <p class="text-sm text-gray-600">Administrar categorías de productos</p>
            </div>
          </div>
          
          <button 
            @click="showAddModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Agregar Categoría
          </button>
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
                  Productos
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orden
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="category in sortedCategories" :key="category.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3">{{ category.icon }}</div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                      <div class="text-sm text-gray-500">{{ category.slug }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 max-w-xs truncate">{{ category.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ getProductCount(category.slug) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  >
                    {{ category.active ? 'Activa' : 'Inactiva' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ category.order }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button 
                      @click="editCategory(category)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button 
                      @click="toggleCategoryStatus(category)"
                      :class="category.active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
                    >
                      {{ category.active ? 'Desactivar' : 'Activar' }}
                    </button>
                    <button 
                      @click="deleteCategory(category)"
                      class="text-red-600 hover:text-red-900"
                      :disabled="getProductCount(category.slug) > 0"
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
              <input
                v-model="categoryForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: PCs Completas"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                v-model="categoryForm.slug"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: pcs-completas"
              />
              <p class="text-xs text-gray-500 mt-1">URL amigable (solo letras, números y guiones)</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                v-model="categoryForm.description"
                rows="3"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descripción de la categoría"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Icono</label>
              <div class="grid grid-cols-6 gap-2">
                <button
                  v-for="icon in availableIcons"
                  :key="icon"
                  type="button"
                  @click="categoryForm.icon = icon"
                  class="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  :class="categoryForm.icon === icon ? 'border-blue-500 bg-blue-50' : 'border-gray-300'"
                >
                  <div class="text-xl">{{ icon }}</div>
                </button>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                <input
                  v-model="categoryForm.order"
                  type="number"
                  min="1"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  v-model="categoryForm.active"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option :value="true">Activa</option>
                  <option :value="false">Inactiva</option>
                </select>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
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
                {{ editingCategory ? 'Actualizar' : 'Agregar' }}
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
  slug: '',
  description: '',
  icon: '📦',
  order: 1,
  active: true
})

// Iconos disponibles
const availableIcons = [
  '💻', '🖥️', '⚡', '🎮', '📱', '⌨️', '🖱️', '🎧', '📦', '🔧', '💾', '🖨️'
]

// Categorías simuladas
const categories = ref([
  {
    id: 1,
    name: 'PCs Completas',
    slug: 'pcs-completas',
    description: 'Computadoras completas para gaming, oficina y diseño',
    icon: '💻',
    order: 1,
    active: true
  },
  {
    id: 2,
    name: 'Monitores',
    slug: 'monitores',
    description: 'Monitores 4K, gaming, curvos y profesionales',
    icon: '🖥️',
    order: 2,
    active: true
  },
  {
    id: 3,
    name: 'Componentes',
    slug: 'componentes',
    description: 'CPU, GPU, RAM, SSD y más componentes',
    icon: '⚡',
    order: 3,
    active: true
  },
  {
    id: 4,
    name: 'Periféricos',
    slug: 'perifericos',
    description: 'Teclados, mouse, audio y accesorios',
    icon: '🎮',
    order: 4,
    active: true
  }
])

// Productos para contar (simulados)
const products = ref([
  { id: 1, category: 'pcs-completas' },
  { id: 2, category: 'pcs-completas' },
  { id: 3, category: 'pcs-completas' },
  { id: 4, category: 'pcs-completas' },
  { id: 5, category: 'monitores' },
  { id: 6, category: 'monitores' },
  { id: 7, category: 'monitores' },
  { id: 8, category: 'monitores' },
  { id: 9, category: 'componentes' },
  { id: 10, category: 'componentes' },
  { id: 11, category: 'componentes' },
  { id: 12, category: 'componentes' },
  { id: 13, category: 'perifericos' },
  { id: 14, category: 'perifericos' },
  { id: 15, category: 'perifericos' },
  { id: 16, category: 'perifericos' }
])

// Composable para confirmaciones
const confirmDialog = useConfirmDialog()

// Composable para notificaciones
const notification = useNotification()

// Computed properties
const sortedCategories = computed(() => {
  return [...categories.value].sort((a, b) => a.order - b.order)
})

const totalProducts = computed(() => products.value.length)

const activeCategories = computed(() => {
  return categories.value.filter(cat => cat.active).length
})

// Funciones
const getProductCount = (categorySlug) => {
  return products.value.filter(product => product.category === categorySlug).length
}

const editCategory = (category) => {
  editingCategory.value = category
  categoryForm.value = { ...category }
  showAddModal.value = true
}

const toggleCategoryStatus = (category) => {
  const index = categories.value.findIndex(cat => cat.id === category.id)
  if (index > -1) {
    categories.value[index].active = !categories.value[index].active
  }
}

const deleteCategory = async (category) => {
  const productCount = getProductCount(category.slug)
  
  if (productCount > 0) {
    await confirmDialog.showConfirm({
      title: 'No se puede eliminar',
      message: `La categoría "${category.name}" tiene ${productCount} productos asociados.`,
      warning: 'Debes mover o eliminar todos los productos de esta categoría antes de poder eliminarla.',
      confirmText: 'Entendido',
      cancelText: 'Cerrar'
    })
    return
  }
  
  const confirmed = await confirmDialog.showConfirm({
    title: 'Eliminar Categoría',
    message: `¿Estás seguro de que quieres eliminar la categoría "${category.name}"? Esta acción no se puede deshacer.`,
    confirmText: 'Eliminar',
    cancelText: 'Cancelar'
  })
  
  if (confirmed) {
    const index = categories.value.findIndex(cat => cat.id === category.id)
    if (index > -1) {
      categories.value.splice(index, 1)
    }
  }
}

const saveCategory = () => {
  // Validar slug
  const slugRegex = /^[a-z0-9-]+$/
  if (!slugRegex.test(categoryForm.value.slug)) {
    notification.showError({
      message: 'El slug solo puede contener letras minúsculas, números y guiones.'
    })
    return
  }
  
  // Verificar slug único
  const existingCategory = categories.value.find(cat => 
    cat.slug === categoryForm.value.slug && cat.id !== editingCategory.value?.id
  )
  if (existingCategory) {
    notification.showError({
      message: 'Ya existe una categoría con ese slug.'
    })
    return
  }
  
  if (editingCategory.value) {
    // Actualizar categoría existente
    const index = categories.value.findIndex(cat => cat.id === editingCategory.value.id)
    if (index > -1) {
      categories.value[index] = {
        ...categories.value[index],
        ...categoryForm.value
      }
    }
    notification.showSuccess({
      title: 'Categoría actualizada',
      message: `La categoría "${categoryForm.value.name}" ha sido actualizada correctamente.`
    })
  } else {
    // Agregar nueva categoría
    const newCategory = {
      id: Date.now(),
      ...categoryForm.value
    }
    categories.value.push(newCategory)
    notification.showSuccess({
      title: 'Categoría agregada',
      message: `La categoría "${categoryForm.value.name}" ha sido agregada correctamente.`
    })
  }
  
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingCategory.value = null
  categoryForm.value = {
    name: '',
    slug: '',
    description: '',
    icon: '📦',
    order: 1,
    active: true
  }
}
</script> 