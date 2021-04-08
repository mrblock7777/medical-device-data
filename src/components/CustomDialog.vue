<template>
  <div class="w-11/12 h-full">
    <div class="z-10 px-4 py-2 bg-white absolute" v-show="openDialog">
        <p class="text-3xl">{{ title }}</p>
      <slot></slot>
    </div>
    <ou-overlay type="dark" :value="openDialog" @input="$emit('onClose')" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    title: String,
    openDialog: Boolean,
    subText: String,
  },
  methods: {
    onChange() {
      console.log(this.openDialog);
    },
  },
});
</script>