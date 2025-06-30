import { useApi } from '~/composables/useApi'
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

  const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const isLongEnough = password.length >= 8

  return {
    isValid: hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough,
    message: !isLongEnough ? 'La contraseña debe tener al menos 8 caracteres' :
      !hasUpperCase ? 'La contraseña debe contener al menos una letra mayúscula' :
        !hasLowerCase ? 'La contraseña debe contener al menos una letra minúscula' :
          !hasNumber ? 'La contraseña debe contener al menos un número' :
            !hasSpecialChar ? 'La contraseña debe contener al menos un carácter especial' : ''
  }
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}


const saveFile = async (file) => {

  const response = await useApi().guardarDataFile({
    end_point: 'files/upload/images',
    file: file
  })

  if (response.operation) {
    return response.data.url
  } else {
    showToast('Error!', response.error || 'Error al subir imagen', 'error')
  }

  return ''
}

const onlyNumbers = (event) => {
  const keyCode = event.keyCode || event.which
  const keyValue = String.fromCharCode(keyCode)
  const regex = /[0-9]/
  if (!regex.test(keyValue)) {
    event.preventDefault()
  }
}

  export { showToast, validatePassword, validateEmail, saveFile, onlyNumbers }