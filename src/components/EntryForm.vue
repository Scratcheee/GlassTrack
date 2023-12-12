<template>
    <div>
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
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useInventoryStore } from '../stores/inventory';


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