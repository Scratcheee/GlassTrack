<template>
    <div>
        <form action="">
        <label for="heightinput">Height</label>
        <input type="number" name="height" id="heightinput" v-model="height" required>
        <label for="heightinput">Width</label>
        <input type="number" name="width" id="widthinput" v-model="width" required>
        <label for="heightinput">Thickness</label>
        <select name="type" id="type" v-model="thickness" required>
          <option :value="'1/8'">1/8</option>
          <option :value="'1/4'">1/4</option>
          <option :value="'3/8'">3/8</option>
          <option :value="'1/2'">1/2</option>

        </select>
        <label for="type">Type:</label>
        <select name="type" id="type" v-model="type" required>
          <option :value="'Annealed'">Annealed</option>
          <option :value="'Tempered'">Tempered</option>
          <option :value="'Mirror'">Mirror</option>
          <option :value="'Acid'">Acid</option>
          <option :value="'Obscure'">Obscure</option>
          <option :value="'Reeded'">Reeded</option>
          <option :value="'Rain'">Rain</option>
          <option :value="'Frosted'">Frosted</option>
          <option :value="'Smoke'">Smoke</option>
          <option :value="'Water (Flemish)'">Water (Flemish)</option>
          <option :value="'Bubble'">Bubble</option>
        </select>
        <label for="qty">Quantity</label>
        <input type="number" name="qty" id="qty" v-model="qty" required>
        <label for="notes">Notes</label>
        <input type="text" name="notes" id="notes" v-model="notes">
        <button type="submit" @click.prevent="submitForm">Submit</button>
      </form>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useInventoryStore } from '../stores/inventory';


const height = ref(0)
const width = ref(0)
const thickness = ref('')
const type = ref('')
const qty = ref(0)
const notes = ref('')
const inventoryStore = useInventoryStore()



const submitForm = () => {
  if(height.value > 0 && width.value > 0 && qty.value > 0 && type.value.length > 0 && thickness.value.length > 0  ) {
    inventoryStore.addItem({height: height.value, width: width.value, type: `${thickness.value} ${type.value}`, qty: qty.value, notes: notes.value })
  height.value = 0
  width.value = 0
  qty.value = 0
  type.value = ''
  thickness.value = ''
  notes.value = ''

  } else {
    alert('Enter all fields')
  }
  console.log(`${thickness.value} ${type.value}`)


}


</script>

<style  scoped>
div {
  max-width: 400px;
  margin: 20px auto;
}

/* Style the form */
form {
  display: flex;
  flex-direction: column;
}

/* Style form labels */
label {
  margin-bottom: 8px;
}

/* Style form inputs and select */
input, select {
  padding: 8px;
  margin-bottom: 16px;
  width: 100%;
  box-sizing: border-box;
}

/* Style the submit button */
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
</style>