<template>
  <l-map
    :zoom="zoom"
    :center="center"
    ref="mapUpdate"
    class="mapUpdate"
    @update:center="getCenterMapAddress"
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
    <button style="" @click="findMe" type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="63"
        height="63"
        viewBox="0 0 63 63"
        class="geo-find-me"
      >
        <defs>
          <filter
            id="Rectangle_817"
            x="0"
            y="0"
            width="63"
            height="63"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="3" input="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood flood-opacity="0.161" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g
          id="Group_1045"
          data-name="Group 1045"
          transform="translate(-297 -666)"
        >
          <g
            transform="matrix(1, 0, 0, 1, 297, 666)"
            filter="url(#Rectangle_817)"
          >
            <rect
              id="Rectangle_817-2"
              data-name="Rectangle 817"
              width="45"
              height="45"
              rx="8"
              transform="translate(9 6)"
              fill="#fff"
            />
          </g>
          <g id="cursor" transform="translate(316.281 683.282)">
            <g
              id="Group_1044"
              data-name="Group 1044"
              transform="translate(0.001 0)"
            >
              <path
                id="Path_28176"
                data-name="Path 28176"
                d="M22.316.086a.813.813,0,0,0-.728,0h0L.45,10.655a.813.813,0,0,0,.218,1.527l8.389,1.526L10.583,22.1a.813.813,0,0,0,.684.659.793.793,0,0,0,.115.008.813.813,0,0,0,.728-.45L22.679,1.177A.813.813,0,0,0,22.316.086Z"
                transform="translate(-0.001 0)"
                fill="#348855"
              />
            </g>
          </g>
        </g>
      </svg>
    </button>
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
      type: [Array, Object],
    },
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 15,
      center: this.latlng,
    };
  },
  methods: {
    findMe() {
      navigator.geolocation &&
        navigator.geolocation.getCurrentPosition((e) => {
          this.$refs.mapUpdate.setCenter([
            e.coords.latitude,
            e.coords.longitude,
          ]);
        });
    },
    async getCenterMapAddress(map) {
      this.$refs.mapUpdate.mapObject.options[0] = map.lat;
      this.$refs.mapUpdate.mapObject.options[1] = map.lng;
      this.$emit("getMapData", map);
      // let params =
      //   "lat=" +
      //   this.center.lat +
      //   "&lon=" +
      //   this.center.lng +
      //   "&format=json&accept-language=" +
      //   this.$i18n.locale;
      // await this.$axios
      //   .$get(`https://nominatim.openstreetmap.org/reverse?${params}`, {
      //     headers: {
      //       Authorization: ""
      //     }
      //   })
      //   .then(res => {
      //     this.user.address = res.display_name;
      //     this.user.lat = res.lat;
      //     this.user.log = res.lon;
      //   });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.mapUpdate.mapObject.dragging.enable();
      this.$refs.mapUpdate.mapObject.touchZoom.enable();
      this.$refs.mapUpdate.mapObject.doubleClickZoom.enable();
      this.$refs.mapUpdate.mapObject.scrollWheelZoom.enable();
      this.$refs.mapUpdate.mapObject.boxZoom.enable();
      this.$refs.mapUpdate.mapObject.keyboard.enable();
    });
  },
};
</script>
<style lang="scss"></style>
