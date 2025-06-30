export const useCart = () => {
  // Función para obtener datos del localStorage de forma segura
  const getCartFromStorage = () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem('techstore-cart')
        return stored ? JSON.parse(stored) : []
      } catch (error) {
        console.error('Error reading from localStorage:', error)
        return []
      }
    }
    return []
  }

  // Función para guardar datos en localStorage de forma segura
  const saveCartToStorage = (cart) => {
    if (process.client) {
      try {
        localStorage.setItem('techstore-cart', JSON.stringify(cart))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }

  // Estado del carrito usando useState para persistencia
  const cartItems = useState('cartItems', () => {
    // Datos por defecto
    const defaultCart = []

    // Si estamos en el cliente, intentar cargar desde localStorage
    if (process.client) {
      try {
        const stored = getCartFromStorage()
        if (stored && stored.length > 0) {
          return stored
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
    
    return defaultCart
  })

  // Función para sincronizar con localStorage
  const syncWithStorage = () => {
    if (process.client) {
      try {
        const stored = getCartFromStorage()
        if (stored && stored.length >= 0) {
          cartItems.value = stored
        }
      } catch (error) {
        console.error('Error syncing cart with localStorage:', error)
      }
    }
  }

  // Computed properties
  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const savings = computed(() => {
    return cartItems.value.reduce((total, item) => {
      if (item.price_original) {
        return total + ((item.price_original - item.price) * item.quantity)
      }
      return total
    }, 0)
  })

  const shippingCost = computed(() => {
    return subtotal.value > 500 ? 0 : 29.99
  })

  const taxes = computed(() => {
    return subtotal.value * 0.08 // 8% de impuestos
  })

  const total = computed(() => {
    return subtotal.value + shippingCost.value + taxes.value
  })

  // Funciones para gestionar el carrito
  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item._id === product._id)
    if (existingItem) {
      existingItem.quantity++
      // Forzar reactividad actualizando el array
      cartItems.value = [...cartItems.value]
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1
      })
      // Forzar reactividad actualizando el array
      cartItems.value = [...cartItems.value]
    }
    // Guardar en localStorage después de modificar
    saveCartToStorage(cartItems.value)
  }

  const removeFromCart = (itemId) => {
    const index = cartItems.value.findIndex(item => item._id === itemId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
      // Forzar reactividad actualizando el array
      cartItems.value = [...cartItems.value]
      // Guardar en localStorage después de modificar
      saveCartToStorage(cartItems.value)
    }
  }

  const updateQuantity = (itemId, quantity) => {
    const item = cartItems.value.find(item => item._id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(itemId)
      } else {
        item.quantity = quantity
        // Forzar reactividad actualizando el array
        cartItems.value = [...cartItems.value]
        // Guardar en localStorage después de modificar
        saveCartToStorage(cartItems.value)
      }
    }
  }

  const increaseQuantity = (itemId) => {
    const item = cartItems.value.find(item => item._id === itemId)
    if (item) {
      item.quantity++
      // Forzar reactividad actualizando el array
      cartItems.value = [...cartItems.value]
      // Guardar en localStorage después de modificar
      saveCartToStorage(cartItems.value)
    }
  }

  const decreaseQuantity = (itemId) => {
    const item = cartItems.value.find(item => item._id === itemId)
    if (item && item.quantity > 1) {
      item.quantity--
      // Forzar reactividad actualizando el array
      cartItems.value = [...cartItems.value]
      // Guardar en localStorage después de modificar
      saveCartToStorage(cartItems.value)
    }
  }

  const clearCart = () => {
    cartItems.value = []
    // Guardar en localStorage después de modificar
    saveCartToStorage(cartItems.value)
  }

  return {
    cartItems: readonly(cartItems),
    totalItems,
    subtotal,
    savings,
    shippingCost,
    taxes,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    syncWithStorage
  }
} 