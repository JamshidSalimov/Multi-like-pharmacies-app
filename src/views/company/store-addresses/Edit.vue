<template>
  <b-form @submit.prevent="changeAddress">
    <div>
      <b-card>
        <b-row>
          <!-- Address Name -->
          <b-col cols="12">
            <b-form-group :label="$t('Address')" label-cols-md="4">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <b-form-input
                    :placeholder="$t('Uz Address')"
                    v-model="addressName_uz"
                    
                  />
                </b-tab>
                <b-tab title="Ру">
                  <b-form-input
                    :placeholder="$t('Ru Address')"
                    v-model="addressName_ru"
                    
                  />
                </b-tab>
                <b-tab title="En">
                  <b-form-input
                    :placeholder="$t('En Address')"
                    v-model="addressName_en"
                    
                  />
                </b-tab>
              </b-tabs>
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.addressName_uz.$dirty && !$v.addressName_uz.required"
              >
                {{$t('Uz Address empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.addressName_ru.$dirty && !$v.addressName_ru.required"
                >
                  {{$t('Ru Address empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.addressName_en.$dirty && !$v.addressName_en.required"
                >
                  {{$t('En Address empty')}}
              </small>
            </b-form-group>
          </b-col>
          <!-- City -->
          <b-col cols="12">
            <b-form-group :label="$t('City')" label-cols-md="4">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <b-form-input
                    :placeholder="$t('Uz City')"
                    v-model="cityName_uz"
                    
                  />
                </b-tab>
                <b-tab title="Ру">
                  <b-form-input
                    :placeholder="$t('Ru City')"
                    v-model="cityName_ru"
                    
                  />
                </b-tab>
                <b-tab title="En">
                  <b-form-input
                    :placeholder="$t('En City')"
                    v-model="cityName_en"
                    
                  />
                </b-tab>
              </b-tabs>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.cityName_uz.$dirty && !$v.cityName_uz.required"
                >
                  {{$t('Uz City empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.cityName_ru.$dirty && !$v.cityName_ru.required"
                >
                  {{$t('Ru City empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.cityName_en.$dirty && !$v.cityName_en.required"
                >
                  {{$t('En City empty')}}
              </small>
            </b-form-group>
          </b-col>

          <!-- Location -->
          <b-col cols="12">
            <b-form-group :label="$t('Location')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Location')"
                v-model="address.location"
                
              />
            </b-form-group>
          </b-col>

          <!-- Map -->
          <b-col cols="12" class="mt-1 mb-2">
            <MapUpdate
              v-if="address && address.lat && address.long"
              :latlng="[address.lat, address.long]"
              class="my-map-cabinet"
              @getMapData="getMapData"
            />
          </b-col>

          <!-- Phone number -->
          <b-col cols="12">
            <b-form-group :label="$t('Phone number')" label-cols-md="4">
              <b-form-input
                type="tel"
                :placeholder="$t('Phone number')"
                v-model="address_phone_number"
                @input="changeInput"
                maxlength="13"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_phone_number.$dirty && !$v.address_phone_number.required"
              >
                {{$t('Phone number empty')}}
              </small>
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_phone_number.$dirty && !$v.address_phone_number.minLength"
              >
                {{$t('Phone number must have at least 7 number')}}
              </small>
            </b-form-group>
          </b-col>

          <!-- Email -->
          <b-col cols="12">
            <b-form-group :label="$t('Email')" label-cols-md="4">
              <b-form-input
                type="email"
                :placeholder="$t('Email')"
                v-model="address_email"
                
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_email.$dirty && !$v.address_email.required"
              >
                {{$t('Email empty')}}
              </small>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <!-- Sumbit -->
      <b-card>
        <b-row>
          <!-- submit and reset -->
          <b-col class="d-flex justify-content-center">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
            >
              {{$t('Submit')}}
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
              @click="reset_all"
            >
              {{$t('Reset')}}
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <b-overlay :show="busy" no-wrap></b-overlay>
  </b-form>
</template>

<script>
import axios from "axios";
import { required,minLength } from "vuelidate/lib/validators";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import MapUpdate from "./MapUpdate.vue";
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
    MapUpdate,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  validations: {
    addressName_uz: {
      required,
    },
    addressName_ru: {
      required,
    },
    addressName_en: {
      required,
    },
    cityName_uz:{
      required,
    },
    cityName_ru:{
      required,
    },
    cityName_en:{
      required,
    },
    address_email:{
      required,
    },
    address_phone_number:{
      required,
      minLength: minLength(13)
    }
    
  },
  data() {
    return {
      busy: true,
      brand: {},
      address: {},
      
      addressName_uz:"",
      addressName_ru:"",
      addressName_en:"",
      address_phone_number:"",
      address_number:"",
      address_email:"",

      cityName_uz:"",
      cityName_ru:"",
      cityName_en:"",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    changeInput(){
        var x = this.address_phone_number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.address_phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        this.address_number="";
        for(let i=0; i<this.address_phone_number.length; i++){
          if(this.address_phone_number[i]!=="(" && this.address_phone_number[i] !==")" && this.address_phone_number[i]!=="-" && this.address_phone_number[i]!==" "){
            this.address_number+=this.address_phone_number[i]
          }
          
        }
        console.log("this_number=",this.address_number)
        console.log("this_user.phone_number",this.address_phone_number)
    },
     reset_all(){
      this.addressName_uz="";
      this.addressName_ru="";
      this.addressName_en="";
      this.cityName_uz="";
      this.cityName_ru="";
      this.cityName_en="";
      this.address_phone_number="";
      this.address_email="";
      this.address_number="";
    },
    getMapData(data) {
      
      this.latlong = data;
      this.address.location = this.latlong.lat + ", " + this.latlong.lng;
      this.address.lat = this.latlong.lat;
      this.address.long = this.latlong.lng;
    },
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
          console.log('salom',res)
          this.address = res.data;
          this.address.location = this.address.lat + ", " + this.address.long;
          this.addressName_uz = this.address.address_uz;
          this.addressName_ru = this.address.address_ru;
          this.addressName_en = this.address.address_en;

          this.cityName_uz = this.address.city_uz;
          this.cityName_ru = this.address.city_ru;
          this.cityName_en = this.address.city_en;
          this.address_phone_number=this.address.phone_number;
          this.address_email= this.address.email;
          this.busy = false;
        });
    },
    async changeAddress() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      const form = {};
      form.address = this.addressName_ru;
      form.address_uz = this.addressName_uz;
      form.address_ru = this.addressName_ru;
      form.address_en = this.addressName_en;

      form.city = this.cityName_ru;
      form.city_uz = this.cityName_uz;
      form.city_ru = this.cityName_ru;
      form.city_en = this.cityName_en;

      form.location = this.address.location;
      form.lat = this.address.lat;
      form.long = this.address.long;

      form.phone_number = this.address_number;
      form.email = this.address_email;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .patch(
          `${this.$baseUrl}/map/detail/${this.$route.params.id}/`,
          form,
          params
        )
        .then((res) => {
          if (res) {
            this.getData();

            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: "Muvaffaqiyatli yangilandi!",
                icon: "CheckCircleIcon",
                variant: "success",
              },
            });
            this.$router.push({name: "store-addresses"});
          }
        })
        .catch((err) => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: err.response.data.detail,
              icon: "CheckCircleIcon",
              variant: "warning",
            },
          });
        });
    },
  },
};
</script>
