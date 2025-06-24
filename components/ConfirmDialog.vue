<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="isOpen && message" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="handleBackdropClick"
        ></div>
        
        <!-- Dialog -->
        <div class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          <!-- Header -->
          <div class="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-semibold text-white">
                  {{ title }}
                </h3>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="px-6 py-4">
            <p class="text-gray-700 leading-relaxed">
              {{ message }}
            </p>
            
            <!-- Additional warning for categories with products -->
            <div v-if="warning" class="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div class="flex items-start">
                <svg class="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p class="ml-2 text-sm text-amber-800">{{ warning }}</p>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse gap-3">
            <button
              @click="confirm"
              class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 min-w-[80px]"
              :disabled="isLoading"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ confirmText }}
            </button>
            <button
              @click="cancel"
              class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 min-w-[80px]"
              :disabled="isLoading"
            >
              {{ cancelText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirmar acción'
  },
  message: {
    type: String,
    default: ''
  },
  warning: {
    type: String,
    default: ''
  },
  confirmText: {
    type: String,
    default: 'Eliminar'
  },
  cancelText: {
    type: String,
    default: 'Cancelar'
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
}

const handleBackdropClick = () => {
  if (!props.isLoading) {
    cancel()
  }
}

// Close on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isOpen && !props.isLoading) {
      cancel()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}

.dialog-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.dialog-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.dialog-enter-active .absolute {
  transition: all 0.3s ease;
}

.dialog-enter-from .absolute {
  opacity: 0;
}

.dialog-leave-to .absolute {
  opacity: 0;
}
</style> 