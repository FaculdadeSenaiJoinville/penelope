<template>
      <icon-picker v-model="selected" />
</template>


<script lang="pt">
import IconPicker from "C:/Users/michel_baade/Documents/workspaces/penelope/node_modules/vuetify-icon-picker/IconPicker.vue";

export default {
  components: {
    IconPicker
  },
  data: () => ({
    selected: ""
  })
};
</script>


