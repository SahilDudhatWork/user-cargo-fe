<template>
  <div>
    <GmapMap
      :center="getMapLocation"
      :zoom="12"
      map-style-id="roadmap"
      map-type-id="terrain"
      ref="mapRef"
      style="width: 100%; height: 242px"
      :options="mapOptions"
      @dragend="getAddress"
      @click="handleMapClick"
      @center_changed="checkCenter"
    >
      <GmapMarker
        :position="marker.position"
        :clickable="true"
        :draggable="true"
        @dragend="getUpdatedLocation"
      />
    </GmapMap>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      marker: { position: { lat: 40.73061, lng: -73.935242 } },

      mapOptions: {
        disableDefaultUI: false,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        keyboardShortcuts: false,
        zoomControl: false,
      },
      address: "",
      geocoder: null,

      getMapLocation: { lat: 40.73061, lng: -73.935242 },
      latLng: "",
    };
  },
  watch: {
    getMapLocation(e) {
      const location = {
        lat: e.lat,
        lng: e.lng,
      };
      this.marker.position = location;
      this.$refs.mapRef.panTo(location);

      this.getAddress();
    },
  },
  mounted() {
    setTimeout(() => {
      console.log("true");
      this.geocoder = new google.maps.Geocoder();
    }, 1000);
  },
  methods: {
    checkCenter(latLng) {
      this.latLng = latLng;
      this.marker.position = { lat: latLng.lat(), lng: latLng.lng() };
    },
    async handleMapClick(e) {
      console.log("handleMapClick", e);
    },
    getUpdatedLocation(e) {
      this.marker.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      this.latLng = this.marker.position;
      this.getAddress();
    },
    async getAddress(setAddress = true) {
      try {
        const resultTypes = [
          { type: "street_address", location_type: "ROOFTOP" },
          { type: "premise", location_type: "ROOFTOP" },
          { type: "street_address", location_type: "RANGE_INTERPOLATED" },
          { type: "route", location_type: "ROOFTOP" },
          { type: "premise", location_type: "RANGE_INTERPOLATED" },
          { type: "route", location_type: "RANGE_INTERPOLATED" },
          { type: "intersection", location_type: "ROOFTOP" },
          { type: "intersection", location_type: "RANGE_INTERPOLATED" },
        ];
        this.geocoder.geocode({ location: this.latLng }, (results, status) => {
          if (status === "OK") {
            let formattedAddress, addressComponents;
            for (let i = 0; i < resultTypes.length; i++) {
              const resultType = resultTypes[i];
              const result = results.find((result) => {
                const addressType = result.types.includes(resultType.type);
                const locationType =
                  result.geometry.location_type === resultType.location_type;
                return addressType && locationType;
              });
              if (result) {
                formattedAddress = result.formatted_address;
                addressComponents = result.address_components;
                break;
              }
            }
            if (!formattedAddress || !addressComponents) {
              formattedAddress = results[0].formatted_address;
              addressComponents = results[0].address_components;
            }
            if (setAddress) {
              const postalCode =
                addressComponents.find((component) =>
                  component.types.includes("postal_code")
                )?.long_name || "";

              this.address = formattedAddress;
              this.$emit("updateAddress", {
                address: this.address,
                postalCode: postalCode,
                lat: this.marker.position.lat,
                long: this.marker.position.lng,
              });
            } else {
              this.address = "";
            }
          } else {
            console.log("Geocoder failed due to: " + status);
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>
