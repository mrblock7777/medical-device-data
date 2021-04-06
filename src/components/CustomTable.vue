<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th class="border border-500 px-4 py-2" v-for="column in columns" :key="column">
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row[id]">
        <td class="border border-500 px-4 py-2" v-for="column in columns" :key="column">
          {{ row[column] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
});
</script>