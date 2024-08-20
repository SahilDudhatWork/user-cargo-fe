<template>
    <div>
      <div class="flex mt-2 xl:mx-auto lg:mx-20 mx-5 justify-center xl:gap-[12rem] gap-20 py-16" :class="bgClass">
        <div>
          <slot name="modalContent"></slot>
        </div>
        <div v-if="imageSrc" :class="imagePositionClass">
          <img :src="imageSrc" alt="Dynamic Image" class="rounded-xl">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imageSrc: {
        type: String,
        required: true
      },
      imagePosition: {
        type: String,
        default: 'right', 
        validator: value => ['left', 'right'].includes(value)
      },
      bgClass:{
        type: String,
        default: '#ffffff', 
      }
    },
    computed: {
      imagePositionClass() {
        return this.imagePosition === 'left' ? 'order-first' : 'lg:block hidden';
      }
    }
  }
  </script>
  