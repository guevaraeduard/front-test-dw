import { ref } from 'vue'

const STORAGE_KEY = 'techstore_users'
const SESSION_KEY = 'techstore_user_session'

function getUsers() {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  // Usuario quemado por defecto
  if (!users.find(u => u.email === 'cliente@techstore.com')) {
    users.push({
      name: 'Cliente Demo',
      email: 'cliente@techstore.com',
      password: 'cliente123',
      orders: [
        {
          id: 1,
          date: '2024-06-24',
          total: 1999,
          status: 'Entregado',
          items: [
            { name: 'PC Gaming Pro', qty: 1, price: 1299 },
            { name: 'Monitor 4K Gaming', qty: 1, price: 700 }
          ]
        }
      ]
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  }
  return users
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export const useUserAuth = () => {
  const user = ref(null)

  // Cargar sesión si existe
  if (process.client) {
    const session = localStorage.getItem(SESSION_KEY)
    if (session) user.value = JSON.parse(session)
  }

  const register = ({ name, email, password }) => {
    const users = getUsers()
    if (users.find(u => u.email === email)) {
      throw new Error('Ya existe un usuario con ese email.')
    }
    const newUser = { name, email, password, orders: [] }
    users.push(newUser)
    saveUsers(users)
    user.value = { name, email, orders: [] }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user.value))
  }

  const login = ({ email, password }) => {
    const users = getUsers()
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Credenciales incorrectas.')
    user.value = { name: found.name, email: found.email, orders: found.orders }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user.value))
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem(SESSION_KEY)
  }

  return { user, register, login, logout }
} 