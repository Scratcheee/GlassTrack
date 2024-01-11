<script setup>
import { ref, onMounted, computed } from 'vue'
import { useInventoryStore } from './stores/inventory';
import { supabase } from './lib/supabaseClient'
import { storeToRefs } from 'pinia'
import EntryForm from './components/EntryForm.vue'
import InventoryStore from './components/InventoryTable.vue'
import InventoryTable from './components/InventoryTable.vue';
import InventoryTotals from './components/InventoryTotals.vue';


const inventoryStore = useInventoryStore()
const screen = ref('entry')




const handleSqFt = (type) => {
  inventoryStore.getSqft(type)
}


const sqFt = computed(() => {
  console.log(inventoryStore.totalSqft('1/8 clear'))
  return inventoryStore.totalSqft('1/8 clear')
})

// lifecycle hooks
onMounted(() => {
  // getInventory()
  inventoryStore.getInventory()
  
})
</script>

<template>
  <main>
    <div v-if="!inventoryStore.isLoading">
      <button @click="screen = 'entry'">Entry Page</button>
      <button @click="screen = 'inventory'">Inventory Page</button>
      <button @click="screen = 'totals'">Inventory Totals Page</button>


     <EntryForm v-if="screen === 'entry'" />
     <inventoryStore v-if="screen === 'inventory'" />
     <InventoryTotals v-if="screen === 'totals'" />
    

    </div>
    <div v-else>
      <div v-if="inventoryStore.errorMsg">
        <p>Error</p>
        <p>{{ inventoryStore.errorMsg.code }}</p>
        <p>{{ inventoryStore.errorMsg.message }}</p>
      </div>
      <p v-else>Loading</p>
    </div>
  </main>
</template>

<style scoped>


.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {


  button {
  padding: 10px;
  background-color: #8ee4af;
  color: #101010;
  border: none;
  cursor: pointer;
}

/* Hover effect for the submit button */
button:hover {
  background-color: #56cb83;
}
}
</style>
