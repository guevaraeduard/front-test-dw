import { ref } from 'vue'

const ORDERS_KEY = 'techstore_orders'

export const useOrders = () => {
  const orders = ref([])
  const isProcessing = ref(false)

  // Cargar órdenes desde localStorage
  const loadOrders = () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem(ORDERS_KEY)
        orders.value = stored ? JSON.parse(stored) : []
      } catch (error) {
        console.error('Error loading orders:', error)
        orders.value = []
      }
    }
  }

  // Guardar órdenes en localStorage
  const saveOrders = () => {
    if (process.client) {
      try {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.value))
      } catch (error) {
        console.error('Error saving orders:', error)
      }
    }
  }

  // Crear una nueva orden
  const createOrder = async (orderData) => {
    isProcessing.value = true
    
    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        status: 'Procesando',
        ...orderData
      }
      
      orders.value.push(newOrder)
      saveOrders()
      
      return newOrder
    } catch (error) {
      throw new Error('Error al procesar la orden')
    } finally {
      isProcessing.value = false
    }
  }

  // Obtener órdenes de un usuario específico
  const getUserOrders = (userEmail) => {
    return orders.value.filter(order => order.userEmail === userEmail)
  }

  // Actualizar estado de una orden
  const updateOrderStatus = (orderId, status) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = status
      saveOrders()
    }
  }

  // Cargar órdenes al inicializar
  if (process.client) {
    loadOrders()
  }

  return {
    orders: readonly(orders),
    isProcessing: readonly(isProcessing),
    createOrder,
    getUserOrders,
    updateOrderStatus,
    loadOrders
  }
} 