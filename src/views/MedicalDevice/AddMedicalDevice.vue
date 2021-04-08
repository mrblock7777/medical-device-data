<template>
  <div>
    <p class="text-3xl mx-4 my-4">Create New Device Model</p>
    <ou-button @click="$router.go(-1)">Back</ou-button>
    <div class="form my-10">
      <div class="brand-id">
        <ou-text-field v-model="BrandId" label="Brand ID" />
      </div>
      <div class="type-id">
        <ou-dropdown v-model="TypeId" label="Type ID" v-if="deviceTypes.length">
          <ou-dropdown-item
            v-for="deviceType in deviceTypes"
            :key="deviceType.Id"
            :value="deviceType.Id"
          >
            {{ deviceType.Description }}
          </ou-dropdown-item>
        </ou-dropdown>
      </div>
      <div class="name">
        <ou-text-field v-model="Name" label="Name" />
      </div>
      <div class="comment">
        <ou-text-field v-model="Comment" label="Comment" />
      </div>
      <ou-message-bar
        v-show="errorMessage.length"
        icon="ErrorBadge"
        type="error"
        >{{ errorMessage }}</ou-message-bar
      >
      <ou-button
        class="float-right"
        type="primary"
        :disabled="isLoading"
        @click="createDeviceModel()"
      >
        <span v-show="!isLoading">Save</span>
        <ou-spinner v-show="isLoading" />
      </ou-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      BrandId: "",
      TypeId: "",
      Name: "",
      Comment: "",
      deviceTypes: [],
      isLoading: false,
      errorMessage: "",
    };
  },
  methods: {
    async getDeviceType(): Promise<void> {
      try {
        let deviceTypeRes = await this.$axios.get("/devicetype");
        this.deviceTypes = deviceTypeRes.data[0];
        console.log(this.deviceTypes);
      } catch (e) {
        console.log(e.response);
      }
    },
    async createDeviceModel(): Promise<void> {
      let inputParams = {
        BrandId: this.BrandId,
        TypeId: parseInt(this.TypeId),
        Name: this.Name,
        Comment: this.Comment,
      };
      console.log(inputParams);
      try {
        this.isLoading = true;
        await this.$axios.post("/devicemodel", inputParams);
        this.$router.push("/medical_device");
      } catch (e) {
        this.isLoading = false;
        let error = e.response;
        if (error.status === 400) {
          this.errorMessage = "Please ensure all fields are filled";
        }
      }
    },
  },
  beforeMount() {
    this.getDeviceType();
  },
});
</script>