<template>
  <div class="relative">
    <p class="text-3xl my-4">
      Medical Device ({{ isLoading ? "Loading" : modelTypes.length }})
    </p>
    <ou-button
      class="float-right"
      @click="$router.push('/medical_device/add')"
      type="primary"
      >Add Device</ou-button
    >
    <div v-if="!isLoading">
      <CustomDialog
        :title="`${selectedModelData.brand} (${selectedModelData.model})`"
        :openDialog="openDialog"
        v-show="openDialog"
        @onClose="openDialog = false"
      >
        <div v-if="openDialog && selectedModelData.data">
          <CustomTable
            :columns="modelDataColumns"
            :rows="selectedModelData.data"
            id="Id"
          />
        </div>
      </CustomDialog>
      <CustomTable
        :columns="modelTypeColumns"
        :rows="modelTypes"
        id="Id"
        @view-model-data="getModelData"
      />
    </div>
    <div v-else>
      <ou-spinner/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import CustomTable from "@/components/CustomTable.vue";
import CustomDialog from "@/components/CustomDialog.vue";
export default Vue.extend({
  data() {
    return {
      modelTypeColumns: [
        {
          field: "Id",
          title: "ID",
          type: "text",
        },
        {
          field: "TypeId",
          title: "Type ID",
          type: "text",
        },
        {
          field: "BrandId",
          title: "Brand ID",
          type: "text",
        },
        {
          field: "Name",
          title: "Name",
          type: "text",
          width: "1/3",
        },
        {
          field: "Description",
          title: "Description",
          type: "text",
          width: "2/5",
        },
        {
          field: "Comment",
          title: "Comment",
          type: "text",
          width: "1/4",
        },
        {
          field: "View",
          title: "",
          type: "action",
          eventName: "view-model-data",
        },
      ],
      modelTypes: [{}],
      modelData: [{}],
      modelDataColumns: [
        {
          field: "Id",
          title: "ID",
          type: "text",
        },
        {
          field: "GroupId",
          title: "Group ID",
          type: "text",
        },
        {
          field: "DataType",
          title: "Data Type",
          type: "text",
        },
        {
          field: "Name",
          title: "Name",
          type: "text",
        },
        {
          field: "DisplayName",
          title: "Display Name",
          type: "text",
        },
        {
          field: "Description",
          title: "Description",
          type: "text",
          width: "2/5",
        },
        {
          field: "ProtocolOrder",
          title: "Protocol Order",
          type: "text",
        },
        {
          field: "Status",
          title: "Status",
          type: "text",
        },
      ],
      selectedModelData: {},
      openDialog: false,
      isLoading: false,
    };
  },
  components: {
    CustomTable,
    CustomDialog,
  },
  methods: {
    async getModelData(data: { BrandId: string; Name: string }): Promise<void> {
      let brand = data.BrandId;
      let model = data.Name;
      this.openDialog = true;
      try {
        let modelData = await this.$axios.get(
          `/overview/modeldata/${brand}/${model}`
        );
        this.selectedModelData = {
          ...this.selectedModelData,
          brand: brand,
          model: model,
          data: modelData.data,
        };
      } catch (e) {
        console.log(e.response);
      }
    },
    async getModelType(): Promise<void> {
      try {
        this.isLoading = true;
        let modelTypes = await this.$axios.get("/overview/modeltype");
        // this.modelTypeColumns = Object.keys(modelTypes.data[0])
        this.modelTypes = modelTypes.data.map((model: any) => {
          model = { ...model, View: "View" };
          return model;
        });
        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        console.log(e.response);
      }
    },
  },
  beforeMount() {
    this.getModelType();
  },
});
</script>