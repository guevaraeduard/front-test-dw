import { ref } from 'vue'

export const useConfirmDialog = () => {
  const isOpen = ref(false)
  const title = ref('')
  const message = ref('')
  const warning = ref('')
  const confirmText = ref('')
  const cancelText = ref('')
  const isLoading = ref(false)
  const resolvePromise = ref(null)

  const showConfirm = (options = {}) => {
    return new Promise((resolve) => {
      title.value = options.title || 'Confirmar acción'
      message.value = options.message || ''
      warning.value = options.warning || ''
      confirmText.value = options.confirmText || 'Eliminar'
      cancelText.value = options.cancelText || 'Cancelar'
      isLoading.value = false
      resolvePromise.value = resolve
      isOpen.value = true
    })
  }

  const confirm = () => {
    isLoading.value = true
    // Simulate loading for better UX
    setTimeout(() => {
      isOpen.value = false
      resolvePromise.value(true)
      isLoading.value = false
    }, 500)
  }

  const cancel = () => {
    isOpen.value = false
    resolvePromise.value(false)
  }

  return {
    isOpen,
    title,
    message,
    warning,
    confirmText,
    cancelText,
    isLoading,
    showConfirm,
    confirm,
    cancel
  }
} 