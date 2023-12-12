<script setup>
import { ref, onMounted, computed } from 'vue'
import { useInventoryStore } from './stores/inventory';
import { supabase } from './lib/supabaseClient'
import { storeToRefs } from 'pinia'

// reactive state

const height = ref(0)
const width = ref(0)
const type = ref('')
const qty = ref(0)

const inventoryStore = useInventoryStore()






const submitForm = () => {
  inventoryStore.addItem({height: height.value, width: width.value, type: type.value, qty: qty.value, })
  height.value = 0
  type.value = ''

}

const handleDelete = (item) => {
  inventoryStore.deleteItem(item)
  // console.log(item)
}

const handleSqFt = (type) => {
  inventoryStore.getSqft(type)
}

const handleQtyChange = (item, amount) => {
  inventoryStore.changeQty(item, amount)
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
      <form action="">
        <label for="heightinput">Height</label>
        <input type="text" name="height" id="heightinput" v-model="height">
        <label for="heightinput">Width</label>
        <input type="text" name="width" id="widthinput" v-model="width">
        <label for="type">Type:</label>
        <select name="type" id="type" v-model="type">
          <option :value="'1/8 Clear'">1/8 Clear</option>
          <option :value="'1/4 Clear'">1/4 Clear</option>
          <option :value="'3/8 Clear'">3/8 Clear</option>
          <option :value="'1/8 Mirror'">1/8 Mirror</option>
          <option :value="'1/4 Mirror'">1/4 Mirror</option>
          <option :value="'1/8 Acid'">1/8 Acid</option>
          <option :value="'1/8 Obscure'">1/8 Obscure</option>
          <option :value="'1/8 Frosted'">1/8 Frosted</option>
          <option :value="'1/8 Smoke'">1/8 Smoke</option>
        </select>
        <label for="qty">Quantity</label>
        <input type="number" name="qty" id="qty" v-model="qty">
        <button type="submit" @click.prevent="submitForm">Submit</button>
      </form>

      <table class="table rounded-xl my-6 ">
        <thead class="">
          <tr>
            <th>Height</th>
            <th>Width</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Square Footage</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in inventoryStore.inventory" :key="index">
            <td>{{ entry.height }} IN</td>
            <td>{{ entry.width }} IN</td>
            <td>{{ entry.type }}</td>
            <td>{{ entry.qty }}</td>
            <td>{{ Math.floor((entry.height * entry.width) / 144 * entry.qty) }} FT</td>
            <td><button @click="handleDelete(entry)">delete</button></td>
            <td><button @click="handleQtyChange(entry, -1)">-</button></td>
            <td><button @click="handleQtyChange(entry, 1)">+</button></td>




          </tr>
        </tbody>
      </table>
      <button @click="handleSqFt('1/8 Clear')">1/8 clear</button>

      {{ inventoryStore.sqFeet }}
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
