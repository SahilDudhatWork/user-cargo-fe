<template>
  <div>
    <div
      class="flex mt-16 xl:mx-auto lg:mx-20 mx-5 justify-center xl:gap-[17rem] gap-20"
    >
      <div>
        <slot name="modalContent"></slot>
      </div>
      <div class="lg:block hidden xl:w-[35%]">
        <img
          src="@/static/Images/truck-img.webp"
          alt=""
          class="rounded-xl h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>
