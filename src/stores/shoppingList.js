import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShoppingListStore = defineStore('shoppingList', () => {
  const items = ref([])

  const addItem = (item) => {
    items.value.push({
      id: Date.now(),
      ...item,
      completed: false,
      createdAt: new Date()
    })
  }

  const deleteItem = (itemId) => {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const toggleItemComplete = (itemId) => {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      item.completed = !item.completed
    }
  }

  const clearCompletedItems = () => {
    items.value = items.value.filter(item => !item.completed)
  }

  return {
    items,
    addItem,
    deleteItem,
    toggleItemComplete,
    clearCompletedItems
  }
})
