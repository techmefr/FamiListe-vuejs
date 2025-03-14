<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">Ma Liste de Courses</h2>
      <button
        @click="openAddItemDialog"
        class="btn btn-primary flex items-center gap-2"
      >
        <Plus class="w-5 h-5" />
        Ajouter un article
      </button>
    </div>

    <div class="space-y-6">
      <div v-for="(items, category) in groupedItems" :key="category" class="space-y-4">
        <h3 class="text-lg font-medium text-gray-700">{{ category }}</h3>
        <div class="space-y-2">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <Checkbox v-model="item.completed" :binary="true" />
              <span :class="{ 'line-through text-gray-400': item.completed }">
                {{ item.name }}
                <span class="text-sm text-gray-500">
                  {{ item.quantity }} {{ item.unit }}
                </span>
              </span>
            </div>
            <button
              @click="deleteItem(item)"
              class="text-red-500 hover:text-red-700"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, Trash2 } from 'lucide-vue-next'
import Checkbox from 'primevue/checkbox'
import { useShoppingListStore } from '@/stores/shoppingList'

const store = useShoppingListStore()
const showAddDialog = ref(false)

const groupedItems = computed(() => {
  return store.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})
})

const openAddItemDialog = () => {
  showAddDialog.value = true
}

const deleteItem = (item) => {
  store.deleteItem(item.id)
}
</script>
