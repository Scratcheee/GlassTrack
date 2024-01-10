<template>
    <div>
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


        {{ getSqft }} SQFT
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useInventoryStore } from '../stores/inventory';

const inventoryStore = useInventoryStore()

const thickness = ref('')
const type = ref('')

const getSqft = computed(() => {
    return Math.floor(inventoryStore.inventory.filter(obj => obj.type === `${thickness.value} ${type.value}`).reduce((sum, obj) => sum + (((obj.height * obj.width)/144)* obj.qty), 0)) 

})

</script>

<style  scoped>
/* Reset some default styles */
body, h1, h2, p, ul, li {
  margin: 0;
  padding: 0;
}

/* Apply some basic styling to the container */
div {
  max-width: 400px;
  margin: 20px auto;
}

/* Style labels */
label {
  display: block;
  margin-bottom: 8px;
}

/* Style select boxes */
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

/* Style the text below selects */
div::after {
  content: '';
  display: block;
  clear: both;
}

/* Style the SQFT text */
div span {
  display: block;
  margin-top: 16px;
  font-weight: bold;
}
</style>