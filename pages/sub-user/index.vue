<template>
  <div>
    <div class="lg:mx-40 mx-6 mt-10">
      <div>
        <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
          SUB USERS
        </h1>
      </div>
      <div>
        <OptionList
          labelText="Sub User list"
          buttonText="Add Sub User"
          listWidth="88%"
          @add="addSubUser"
        />
      </div>
      <div>
        <SubUserTable
          :allData="allSubUserData"
          @deleteItem="removeSubUser"
          @handleClick="editSubUser"
        />
        <DeleteAlertModal
          :isModal="isModal"
          @handleSubmit="handleDelete"
          @close="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      isModal: false,
    };
  },
  computed: {
    ...mapGetters({
      allSubUserData: "sub-user/getAllSubUserData",
    }),
  },
  methods: {
    ...mapActions({
      fetchAllSubUser: "sub-user/fetchAllSubUser",
      deleteSubUser: "sub-user/deleteSubUser",
    }),
    async getAllSubUser() {
      try {
        await this.fetchAllSubUser();
      } catch (error) {
        console.log(error);
      }
    },
    editSubUser(item) {
      this.$router.push(`sub-user/edit-sub-user/${item.accountId}`);
    },
    addSubUser() {
      this.$router.push("/sub-user/add-sub-user");
    },
    async handleDelete() {
      try {
        const response = await this.deleteSubUser({
          accountId: this.selectedId,
        });
        this.$toast.open({
          message: response.msg,
        });
        this.isModal = false;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    closeModal() {
      this.isModal = false;
    },
    async removeSubUser(id) {
      this.isModal = true;
      this.selectedId = id;
    },
  },
  async mounted() {
    await this.getAllSubUser();
  },
};
</script>
