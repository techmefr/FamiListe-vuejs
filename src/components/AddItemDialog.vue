<template>
  <Dialog
    :visible="modelValue"
    @update:visible="$emit('update:modelValue', $event)"
    modal
    :header="'Ajouter un article'"
    :style="{ width: '450px' }"
    :pt="{
      root: { class: 'rounded-xl' },
      header: { class: 'bg-gray-50 rounded-t-xl' }
    }"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <label for="name" class="block text-sm font-medium text-gray-700">
          Nom de l'article
        </label>
        <InputText
          id="name"
          v-model="form.name"
          class="w-full"
          required
        />
      </div>

      <div class="space-y-2">
        <label for="category" class="block text-sm font-medium text-gray-700">
          Rayon
        </label>
        <Dropdown
          id="category"
          v-model="form.category"
          :options="categories"
          optionLabel="name"
          optionValue="id"
          placeholder="Sélectionner un rayon"
          class="w-full"
          required
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label for="quantity" class="block text-sm font-medium text-gray-700">
            Quantité
          </label>
          <InputNumber
            id="quantity"
            v-model="form.quantity"
            :min="1"
            :step="1"
            class="w-full"
            required
          />
        </div>

        <div class="space-y-2">
          <label for="unit" class="block text-sm font-medium text-gray-700">
            Unité
          </label>
          <Dropdown
            id="unit"
            v-model="form.unit"
            :options="units"
            placeholder="Sélectionner une unité"
            class="w-full"
            required
          />
        </div>
      </div>

      <div class="pt-4 flex justify-end gap-3">
        <Button
          type="button"
          severity="secondary"
          @click="closeDialog"
          label="Annuler"
          text
        />
        <Button
          type="submit"
          severity="primary"
          label="Ajouter"
        />
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'item-added'])

const form = ref({
  name: '',
  category: null,
  quantity: 1,
  unit: null
})

const categories = [
  { id: 'fruits-legumes', name: 'Fruits et Légumes' },
  { id: 'viandes-poissons', name: 'Viandes et Poissons' },
  { id: 'cremerie', name: 'Crèmerie' },
  { id: 'epicerie', name: 'Épicerie' },
  { id: 'boissons', name: 'Boissons' },
  { id: 'hygiene', name: 'Hygiène' }
]

const units = [
  'pièce(s)',
  'kg',
  'g',
  'L',
  'mL',
  'paquet(s)',
  'bouteille(s)',
  'boîte(s)'
]

const handleSubmit = () => {
  emit('item-added', { ...form.value })
  closeDialog()
}

const closeDialog = () => {
  form.value = {
    name: '',
    category: null,
    quantity: 1,
    unit: null
  }
  emit('update:modelValue', false)
}
</script>
