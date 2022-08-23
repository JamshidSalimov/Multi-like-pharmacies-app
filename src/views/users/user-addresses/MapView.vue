<template>
  <l-map
    :zoom="zoom"
    :zoomControl="zoomControl"
    ref="mapView"
    class="mapView"
    :center="latlng"
  >
    <l-tile-layer :url="url"> </l-tile-layer>
    <svg
      width="36"
      height="49"
      viewBox="0 0 36 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="map-icon"
    >
      <path
        d="M16.125 47.0625C16.9688 48.375 18.9375 48.375 19.7812 47.0625C33.4688 27.375 36 25.3125 36 18C36 8.0625 27.9375 0 18 0C7.96875 0 0 8.0625 0 18C0 25.3125 2.4375 27.375 16.125 47.0625ZM18 25.5C13.7812 25.5 10.5 22.2188 10.5 18C10.5 13.875 13.7812 10.5 18 10.5C22.125 10.5 25.5 13.875 25.5 18C25.5 22.2188 22.125 25.5 18 25.5Z"
        fill="#F44336"
      ></path>
    </svg>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LCircle, LMarker, LIcon} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LCircle,
  },
  props: {
    latlng: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 15,
      zoomControl: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.mapView.mapObject.dragging.disable();
      this.$refs.mapView.mapObject.touchZoom.disable();
      this.$refs.mapView.mapObject.doubleClickZoom.disable();
      this.$refs.mapView.mapObject.scrollWheelZoom.disable();
      this.$refs.mapView.mapObject.boxZoom.disable();
      this.$refs.mapView.mapObject.keyboard.disable();
    });
  },
};
</script>

<style lang="scss" scoped></style>
