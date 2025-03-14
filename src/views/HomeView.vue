<template>
  <main class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">FamiListe</h1>
        <Button
          v-if="hasCompletedItems"
          @click="clearCompleted"
          severity="secondary"
          text
          class="flex items-center gap-2"
        >
          <Trash2 class="w-4 h-4" />
          Supprimer les articles cochés
        </Button>
      </div>

      <ShoppingList @add-item="showAddDialog = true" />
      <AddItemDialog
        v-model="showAddDialog"
        @item-added="handleItemAdded"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import Button from 'primevue/button'
import ShoppingList from '@/components/ShoppingList.vue'
import AddItemDialog from '@/components/AddItemDialog.vue'
import { useShoppingListStore } from '@/stores/shoppingList'

const store = useShoppingListStore()
const showAddDialog = ref(false)

const hasCompletedItems = computed(() => {
  return store.items.some(item => item.completed)
})

const handleItemAdded = (item) => {
  store.addItem(item)
}

const clearCompleted = () => {
  store.clearCompletedItems()
}
</script>
