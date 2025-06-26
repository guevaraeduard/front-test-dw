<template>
  <Teleport to="body">
    <Transition name="notification">
      <div v-if="isVisible" class="fixed top-20 right-4 z-[9999] max-w-sm w-full">
        <div class="bg-white rounded-lg shadow-lg border border-green-200 overflow-hidden">
          <div class="flex items-center p-4">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ title }}
              </p>
              <p v-if="message" class="text-sm text-gray-600 mt-1">
                {{ message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0">
              <button
                @click="close"
                class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <!-- Progress bar -->
          <div class="h-1 bg-green-200">
            <div 
              class="h-1 bg-green-600 transition-all duration-300 ease-linear"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 4000
  }
})

const emit = defineEmits(['close'])

const progress = ref(100)
let progressInterval = null
let closeTimeout = null

const close = () => {
  emit('close')
}

// Auto-close functionality
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    progress.value = 100
    const step = 100 / (props.duration / 50) // Update every 50ms
    
    progressInterval = setInterval(() => {
      progress.value -= step
      if (progress.value <= 0) {
        clearInterval(progressInterval)
        close()
      }
    }, 50)
    
    closeTimeout = setTimeout(() => {
      close()
    }, props.duration)
  } else {
    if (progressInterval) {
      clearInterval(progressInterval)
    }
    if (closeTimeout) {
      clearTimeout(closeTimeout)
    }
  }
})

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
  if (closeTimeout) {
    clearTimeout(closeTimeout)
  }
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style> 