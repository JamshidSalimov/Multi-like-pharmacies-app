<template>
  <b-form @submit.prevent="ViewAddress">
    <b-card>
      <b-row>

        <!-- Address Name -->
        <b-col cols="12">
          <b-form-group :label="$t('Address')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Address')"
              v-model="address.address"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- entrance -->
        <b-col cols="12">
          <b-form-group :label="$t('Entrance')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Entrance')"
              v-model="address.entrance"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- floor -->
        <b-col cols="12">
          <b-form-group :label="$t('Floor')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Floor')"
              v-model="address.floor"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- flat -->
        <b-col cols="12">
          <b-form-group :label="$t('Flat')" label-cols-md="4">
            <b-form-input 
            :placeholder="$t('Flat')"
             v-model="address.flat" readonly />
          </b-form-group>
        </b-col>

        <!-- landmark -->
        <b-col cols="12">
          <b-form-group :label="$t('Landmark')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Landmark')"
              v-model="address.landmark"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- note -->
        <b-col cols="12">
          <b-form-group :label="$t('Note')" label-cols-md="4">
            <b-form-input :placeholder="$t('Note')" v-model="address.note" readonly />
          </b-form-group>
        </b-col>

        <!-- Phone number -->
        <b-col cols="12">
          <b-form-group :label="$t('Phone number')" label-cols-md="4">
            <b-form-input
              readonly
              type="tel"
              :placeholder="$t('Phone number')"
              v-model="address.phone_number"
            />
          </b-form-group>
        </b-col>

        <!-- Location -->
        <b-col cols="12">
          <b-form-group :label="$t('Location(lat, lang)')" label-cols-md="4">
            <b-form-input
              readonly
              :placeholder="$t('Location')"
              v-model="address.location"
              required
            />
          </b-form-group>
        </b-col>

        <!-- Map -->
        <b-col cols="12" class="mt-1 mb-2">
          <MapView
            v-if="address && address.lat && address.long"
            :latlng="[address.lat, address.long]"
            class="my-map-cabinet"
          />
        </b-col>
        
      </b-row>
    </b-card>
    <b-overlay :show="busy" no-wrap></b-overlay>
  </b-form>
</template>

<script>
import axios from "axios";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import MapView from "./MapView.vue";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BCard,
  BTab,
  BTabs,
  BCardText,
  BFormFile,
  BOverlay,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BCard,
    Ripple,
    BTabs,
    BTab,
    BCardText,
    BFormFile,
    ToastificationContent,
    MapView,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      busy: true,
      address: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .get(
          `${this.$baseUrl}/product/location-dashboard/${this.$route.params.id}/`,
          params
        )
        .then((res) => {
          this.address = res.data;
          this.address.location = this.address.lat + ", " + this.address.long;
          this.busy = false;
        });
    },
  },
};
</script>
<style scoped lang="scss"></style>
