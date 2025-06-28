const showToast = (title, message, type) => {
    const toast = useToast()
    if (type === 'success') {
      toast.success({ title: title, message: message })
    } else if (type === 'error') {
      toast.error({ title: title, message: message })
    } else if (type === 'warning') {
      toast.warning({ title: title, message: message })
    } else if (type === 'info') {
      toast.info({ title: title, message: message })
    }
  }

  export { showToast }