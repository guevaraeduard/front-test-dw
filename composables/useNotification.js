import { ref } from 'vue'

export const useNotification = () => {
  const isVisible = ref(false)
  const title = ref('')
  const message = ref('')
  const duration = ref(4000)
  const type = ref('success') // 'success' or 'error'

  const showNotification = (options = {}) => {
    title.value = options.title || 'Éxito'
    message.value = options.message || ''
    duration.value = options.duration || 4000
    type.value = options.type || 'success'
    isVisible.value = true
  }

  const showSuccess = (options = {}) => {
    showNotification({
      ...options,
      type: 'success',
      title: options.title || 'Éxito'
    })
  }

  const showError = (options = {}) => {
    showNotification({
      ...options,
      type: 'error',
      title: options.title || 'Error',
      duration: options.duration || 6000
    })
  }

  const hideNotification = () => {
    isVisible.value = false
  }

  return {
    isVisible,
    title,
    message,
    duration,
    type,
    showNotification,
    showSuccess,
    showError,
    hideNotification
  }
} 