<template>
  <div>
    <table class="table-fixed">
      <thead>
        <tr class="bg-green-600">
          <th
            class="border-b border-500 px-4 py-2 text-white font-medium"
            v-for="column in columns"
            :key="column.field"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
          v-for="(row, index) in filteredRows"
          :key="row[id]"
        >
          <td
            class="border-b border-500 px-4 py-2"
            v-for="column in columns"
            :key="column.field"
          >
            <span v-if="column.type === 'text'">{{ row[column.field] }}</span>
            <ou-button
              v-else-if="column.type === 'action'"
              type="primary"
              @click="handleClick(column.eventName, row)"
              >{{ row[column.field] }}</ou-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      Showing {{ startingIndex + 1 }} - {{ endingIndex }} of {{ rows.length }}
    </p>
    <ou-button type="primary" @click="changePage(false)">Previous</ou-button>
    <ou-button type="primary" @click="changePage(true)">Next</ou-button>
  </div>
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
  data() {
    return {
      currentPage: 1,
      limitPerPage: 20,
      startingIndex: 0,
      endingIndex: 0,
    };
  },
  computed: {
    filteredRows(): Array<any> {
      this.startingIndex = (this.currentPage - 1) * this.limitPerPage;
      this.endingIndex = this.limitPerPage * this.currentPage;
      let filteredData = this.rows.slice(this.startingIndex, this.endingIndex);
      if (this.endingIndex > this.rows.length) {
        this.endingIndex =
          this.endingIndex - (this.endingIndex - this.rows.length);
      }
      return filteredData;
    },
  },
  methods: {
    changePage(isNextPage: number): void {
      if (!isNextPage && this.currentPage > 1) this.currentPage--;
      else if (isNextPage && this.endingIndex !== this.rows.length)
        this.currentPage++;
    },
    handleClick(eventName: string, row: any): void {
      this.$emit(eventName, row);
    },
  }
});
</script>