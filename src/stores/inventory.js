import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";

export const useInventoryStore = defineStore("inventory", () => {
  const inventory = ref([]);
  const isLoading = ref(false);
  const errorMsg = ref("");
  const count = ref(10);
  const sqFeet = ref(0)

  // const totalSqft = computed(() => {
  //   return (type) => {
  //     const filteredObjects = inventory.value.filter(obj => obj.type === type)
     
  //     filteredObjects.reduce((accumulator, obj) => {
  //       return Math.floor(accumulator + ((obj.width * obj.height) / 144) * obj.qty)
  //     }, 0)
  //   }

  // })

  async function getInventory() {
    isLoading.value = true;
    const { data, error } = await supabase.from("inventory").select();
    this.inventory = data;
    if (data) {
      isLoading.value = false;
    }
    console.log(this.inventory)
    if (error) {
      this.errorMsg = error;
      console.log(this.errorMsg);
    }
  }

  function getSqft(type) {
    const filteredObjects = inventory.value.filter(obj => obj.type === type)
     
      this.sqFeet = filteredObjects.reduce((accumulator, obj) => {
        return Math.floor(accumulator + ((obj.width * obj.height) / 144) * obj.qty)
      }, 0)
  }

  async function addItem(item) {
    console.log(this.inventory);
    const { data, error } = await supabase
      .from("inventory")
      .insert([item])
      .select();
    if (data) {
      this.inventory.push(data[0]);
    }

    if (error) {
      console.error(error);
    }
  }

  async function deleteItem(item) {
    this.inventory = this.inventory.filter((i) => i.id !== item.id);
    console.log(item.id);
    const {error} = await supabase.from('inventory').delete().eq('id', item.id)
    if(error) {
      isLoading.value = true
      this.errorMsg = error
      console.log(error)
    }
  }

  async function changeQty(item, amount) {

    const itemIndex = this.inventory.findIndex(e => e.id === item.id)
    if(itemIndex !== -1) {
      const updatedInventory = [...this.inventory]
      updatedInventory[itemIndex].qty = updatedInventory[itemIndex].qty + amount
      this.inventory = updatedInventory
    }
    const {data, error} = await supabase.from('inventory').update({'qty': this.inventory[itemIndex].qty }).eq('id', this.inventory[itemIndex].id).select()
    if(error) {
      isLoading.value = true
      this.errorMsg = error
      console.error(error)
    }

  }

  return { inventory, addItem, getSqft, deleteItem, getInventory, changeQty, isLoading, errorMsg, count, sqFeet };
});
