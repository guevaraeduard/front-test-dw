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
        if (stored) {
          orders.value = JSON.parse(stored)
        } else {
          // Agregar pedidos de ejemplo si no hay ninguno
          orders.value = getSampleOrders()
          saveOrders()
        }
      } catch (error) {
        console.error('Error loading orders:', error)
        orders.value = getSampleOrders()
      }
    }
  }

  // Pedidos de ejemplo
  const getSampleOrders = () => {
    return [
      {
        id: 1001,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
        status: 'Entregado',
        customerName: 'María González',
        customerEmail: 'maria.gonzalez@email.com',
        customerPhone: '+34 612 345 678',
        shippingAddress: {
          address: 'Calle Mayor 123',
          city: 'Madrid',
          postalCode: '28001',
          country: 'España'
        },
        items: [
          {
            id: 1,
            name: 'PC Gaming Elite',
            price: 1299.99,
            quantity: 1,
            image: '/images/placeholder-product.svg'
          },
          {
            id: 2,
            name: 'Monitor 4K Gaming',
            price: 449.99,
            quantity: 1,
            image: '/images/placeholder-product.svg'
          }
        ],
        subtotal: 1749.98,
        shipping: 15.00,
        tax: 87.50,
        total: 1852.48
      },
      {
        id: 1002,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 día atrás
        status: 'Enviado',
        customerName: 'Carlos Rodríguez',
        customerEmail: 'carlos.rodriguez@email.com',
        customerPhone: '+34 623 456 789',
        shippingAddress: {
          address: 'Avenida Diagonal 456',
          city: 'Barcelona',
          postalCode: '08013',
          country: 'España'
        },
        items: [
          {
            id: 3,
            name: 'Laptop Ultrabook Pro',
            price: 899.99,
            quantity: 1,
            image: '/images/placeholder-product.svg'
          }
        ],
        subtotal: 899.99,
        shipping: 12.00,
        tax: 45.00,
        total: 956.99
      },
      {
        id: 1003,
        date: new Date().toISOString(), // Hoy
        status: 'Procesando',
        customerName: 'Ana Martínez',
        customerEmail: 'ana.martinez@email.com',
        customerPhone: '+34 634 567 890',
        shippingAddress: {
          address: 'Plaza España 789',
          city: 'Sevilla',
          postalCode: '41013',
          country: 'España'
        },
        items: [
          {
            id: 4,
            name: 'Tablet Pro Max',
            price: 299.99,
            quantity: 2,
            image: '/images/placeholder-product.svg'
          },
          {
            id: 5,
            name: 'Auriculares Wireless',
            price: 89.99,
            quantity: 1,
            image: '/images/placeholder-product.svg'
          }
        ],
        subtotal: 689.97,
        shipping: 10.00,
        tax: 34.50,
        total: 734.47
      },
      {
        id: 1004,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días atrás
        status: 'Cancelado',
        customerName: 'Luis Fernández',
        customerEmail: 'luis.fernandez@email.com',
        customerPhone: '+34 645 678 901',
        shippingAddress: {
          address: 'Calle Gran Vía 321',
          city: 'Valencia',
          postalCode: '46004',
          country: 'España'
        },
        items: [
          {
            id: 6,
            name: 'Smartphone Galaxy S23',
            price: 799.99,
            quantity: 1,
            image: '/images/placeholder-product.svg'
          }
        ],
        subtotal: 799.99,
        shipping: 8.00,
        tax: 40.00,
        total: 847.99
      }
    ]
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