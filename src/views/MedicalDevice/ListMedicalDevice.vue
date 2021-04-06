<template>
  <div>
    <p class="text-3xl mx-4 my-4">Medical Device ({{ rows.length }})</p>
    <CustomTable :columns="columns" :rows="rows" id="Id" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import CustomTable from "@/components/CustomTable.vue";
export default Vue.extend({
  data() {
    return {
      columns: [''],
      rows: [{}],
    };
  },
  components: {
    CustomTable,
  },
  methods: {
    async getModelType() {
      let modelTypes = await this.$axios.get("/overview/modeltype", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImVtYWlsIjoiTW96ZWxsLkphY29iaUB5YWhvby5jb20iLCJpYXQiOjE2MTc2NzIwNjEsImV4cCI6MTYxNzc1ODQ2MX0.d2u0e2mNLdbCHYjxfloa4NnUJ-lRKuRzl-DPkg_hB4A",
        },
      });
      this.columns = Object.keys(modelTypes.data[0])
      this.rows = modelTypes.data.map((model: any) => {
        model = { ...model, Action: "Test" };
        return model;
      });
    },
  },
  beforeMount() {
    this.getModelType();
  },
});
</script>