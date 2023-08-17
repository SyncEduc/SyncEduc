import { defineStore } from "pinia";

export const useDrawerStore = defineStore({
  id: 'drawer',
  state: () => {
    return {
      isActive: false
    }
  },

  getters: {
    getActiveState: (state) => state.isActive
  },

  actions: {
    updateActiveState(){
      this.isActive = !this.isActive
    }
  }
})