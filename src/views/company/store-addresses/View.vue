<template>
  <b-form @submit.prevent="changeAddress">
    <b-card>
      <b-row>
        <!-- Address Name -->
        <b-col cols="12">
          <b-form-group :label="$t('Address')" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  :placeholder="$t('Uz Address')"
                  v-model="addressName.uz"
                  readonly
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  :placeholder="$t('Ru Address')"
                  v-model="addressName.ru"
                  readonly
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  :placeholder="$t('En Address')"
                  v-model="addressName.en"
                  readonly
                />
              </b-tab>
            </b-tabs>
          </b-form-group>
        </b-col>
        <!-- City -->
        <b-col cols="12">
          <b-form-group :label="$t('City')" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  :placeholder="$t('Uz City')"
                  v-model="cityName.uz"
                  readonly
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  :placeholder="$t('Ru City')"
                  v-model="cityName.ru"
                  readonly
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  :placeholder="$t('En City')"
                  v-model="cityName.en"
                  readonly
                />
              </b-tab>
            </b-tabs>
          </b-form-group>
        </b-col>
        <!-- Location -->
        <b-col cols="12">
          <b-form-group :label="$t('Location')" label-cols-md="4">
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
        <!-- Phone number -->
        <b-col cols="12">
          <b-form-group :label="$t('Phone number')" label-cols-md="4">
            <b-form-input
              readonly
              type="tel"
              :placeholder="$t('Phone number')"
              v-model="address.phone_number"
              required
            />
          </b-form-group>
        </b-col>
        <!-- Email -->
        <b-col cols="12">
          <b-form-group :label="$t('Email')" label-cols-md="4">
            <b-form-input
              readonly
              type="email"
              :placeholder="$t('Email')"
              v-model="address.email"
              required
            />
          </b-form-group>
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
      brand: {},
      address: {},
      addressName: {
        uz: "",
        ru: "",
        en: "",
      },
      cityName: {
        uz: "",
        ru: "",
        en: "",
      },
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
        .get(`${this.$baseUrl}/map/detail/${this.$route.params.id}/`, params)
        .then((res) => {
          this.address = res.data;
          this.address.location = this.address.lat + ", " + this.address.long;
          this.addressName.uz = this.address.address_uz;
          this.addressName.ru = this.address.address_ru;
          this.addressName.en = this.address.address_en;

          this.cityName.uz = this.address.city_uz;
          this.cityName.ru = this.address.city_ru;
          this.cityName.en = this.address.city_en;

          this.busy = false;
        });
    },
  },
};
</script>
<style scoped lang="scss"></style>
