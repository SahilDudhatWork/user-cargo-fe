<template>
  <div>
    <div class="border-l h-[500px] mt-5 flex justify-center items-center">
      <div>
        <button
          @click="logout"
          class="font-semibold text-base text-white bg-[#0060C9] rounded-xl xs:py-[10px] py-[6px] xs:px-[50px] px-[30px] mt-4 focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "settings",
  methods: {
    logout() {
      this.$cookies.remove("token");
      this.$cookies.remove("refreshToken");
      this.$cookies.remove("service");
      this.$router.push("/login");
    },
  },
};
</script>
