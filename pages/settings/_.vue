<template>
  <div class="relative">
    <div
      class="scroll-container h-[500px] overflow-y-scroll pr-4 relative pl-4 border-l"
    >
      <div class="inline-block pb-4 pt-4">
        <span
          class="text-[#000000E5] font-normal text-sm"
          v-html="settingsData?.description"
        >
        </span>
      </div>
    </div>
    <div
      class="absolute bottom-0 left-0 w-full h-20 pointer-events-none bg-gradient-to-t from-white to-transparent"
    ></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "settings",
  data() {
    return {
      settingsData: {},
    };
  },
  methods: {
    ...mapActions({
      fetchSingleSettingsData: "settings/fetchSingleSettingsData",
    }),
    async getSettings() {
      try {
        const res = await this.fetchSingleSettingsData({ slug: this.slug });
        this.settingsData = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getSettings();
  },
  async asyncData({ params }) {
    return {
      slug: params.pathMatch,
    };
  },
};
</script>

<style scoped>
.scroll-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}
</style>
