export const useGlobalNotification = () => {
  // Solo usar useState en el cliente
  const isVisible = process.client ? useState('notification-visible', () => false) : ref(false)
  const title = process.client ? useState('notification-title', () => '') : ref('')
  const message = process.client ? useState('notification-message', () => '') : ref('')
  const duration = process.client ? useState('notification-duration', () => 4000) : ref(4000)
  const type = process.client ? useState('notification-type', () => 'success') : ref('success')

  const showNotification = (options = {}) => {
    if (process.client) {
      title.value = options.title || 'Éxito'
      message.value = options.message || ''
      duration.value = options.duration || 4000
      type.value = options.type || 'success'
      isVisible.value = true
    }
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
    if (process.client) {
      isVisible.value = false
    }
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