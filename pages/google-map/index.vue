<template>
  <GmapMap
    :center="{ lat: 10.0, lng: 10.0 }"
    :zoom="7"
    style="width: 100%; height: 400px"
  >
    <GmapMarker
      :position="{ lat: 10.0, lng: 10.0 }"
      :clickable="true"
      :draggable="true"
    />
  </GmapMap>
</template>

<script>
export default {
  data() {
    return {
      // Define the center and other properties
    };
  },
};
</script>
