<script setup>
import { ref, onMounted, computed } from 'vue'
import { useInventoryStore } from './stores/inventory';
import { supabase } from './lib/supabaseClient'
import { storeToRefs } from 'pinia'
import EntryForm from './components/EntryForm.vue'
import InventoryStore from './components/InventoryTable.vue'


const inventoryStore = useInventoryStore()




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
     <EntryForm />
     <inventoryStore />
    


      <!-- <button @click="handleSqFt('1/8 Clear')">1/8 clear</button>

      {{ inventoryStore.sqFeet }} -->
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
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
