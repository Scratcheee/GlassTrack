<template>
    <div>
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
    </div>
</template>

<script setup>
import { useInventoryStore } from '../stores/inventory';

const inventoryStore = useInventoryStore()



const handleQtyChange = (item, amount) => {
  inventoryStore.changeQty(item, amount)
}

const handleDelete = (item) => {
  inventoryStore.deleteItem(item)
  // console.log(item)
}

</script>

<style scoped>
div {
  max-width: 100%;
  margin: 10px auto;
  overflow-x: auto; /* Add horizontal scrollbar for smaller screens */
}

/* Style the table */
.table {
  width: 100%;
  border-collapse: collapse;
}

/* Style the table header */
.table th, .table td {
  padding: 5px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* Style alternating row colors */
.table tbody tr:nth-child(even) {
  background-color: #202020;
}

/* Style buttons inside the table */
.table button {
  padding: 5px 10px;
  background-color: #8ee4af;
  color: #101010;
  border: none;
  cursor: pointer;
}

/* Hover effect for buttons */
.table button:hover {
  background-color: #56cb83;
}
</style>