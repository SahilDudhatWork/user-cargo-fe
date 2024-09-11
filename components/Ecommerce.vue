<template>
  <div>
    <div class="mt-24 xl:mx-48 mx-6">
      <div>
        <p class="font-bold text-[20px] text-[#000000]">
          Unlock the power of Cargoconnect
        </p>
        <p class="font-medium text-base text-[#000000]">
          Lorem ipsum dolor sit amet consectetur risus turpis.
        </p>
      </div>
      <div
        class="bg-white rounded-2xl mt-5 grid xl:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-y-4 py-7"
      >
        <div
          class="border-r border-gray-400 px-6"
          v-for="(item, key) in ecommerceItem"
          :key="key"
        >
          <img :src="item.image" alt="" class="" />
          <h1 class="mt-4 font-bold text-[18px] text-[#000000]">
            {{ item.title }}
          </h1>
          <p class="mt-4 font-medium text-sm text-gray-500 max-w-[300px]">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import squareSvg from "@/static/svg/square.svg";
import blueTruckSvg from "@/static/svg/blue-truck.svg";
import supplySvg from "@/static/svg/supply.svg";
export default {
  data() {
    return {
      ecommerceItem: [
        {
          image: squareSvg,
          title: "Retail and E-commerce",
          description:
            "Consectetur, Mauris risus turpis Lorem ipsum dolor sit amet consectetur, Mauris risus turpis Lorem ipsum dolor sit amet",
        },
        {
          image: blueTruckSvg,
          title: "Manufacturing and Distribution",
          description:
            "Consectetur, Mauris risus turpis Lorem ipsum dolor sit amet consectetur, Mauris risus turpis Lorem ipsum dolor sit amet",
        },
        {
          image: supplySvg,
          title: "Logistics and Supply Chain",
          description:
            "Consectetur, Mauris risus turpis Lorem ipsum dolor sit amet consectetur, Mauris risus turpis Lorem ipsum dolor sit amet",
        },
      ],
    };
  },
};
</script>
