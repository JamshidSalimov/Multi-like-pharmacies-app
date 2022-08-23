<template>
  <b-form @submit.prevent="createAddress">
    <b-card>
      <b-row>
        
        <!-- Address Name -->
        <b-col cols="12">
          <b-form-group :label="$t('Address')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Address')"
              v-model="address_address"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_address.$dirty && !$v.address_address.required"
              >
                {{$t('Address empty')}}
            </small>
          </b-form-group>
        </b-col>
        
        <!-- entrance -->
        <b-col cols="12">
          <b-form-group :label="$t('Entrance')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Entrance')"
              v-model="address_entrance"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_entrance.$dirty && !$v.address_entrance.required"
              >
                {{$t('Entrance empty')}}
            </small>
          </b-form-group>
        </b-col>

        <!-- floor -->
        <b-col cols="12">
          <b-form-group :label="$t('Floor')" label-cols-md="4">
            <b-form-input 
             :placeholder="$t('Floor')"
             v-model="address_floor"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_floor.$dirty && !$v.address_floor.required"
              >
                {{$t('Floor empty')}}
            </small>
          </b-form-group>
        </b-col>

        <!-- flat -->
        <b-col cols="12">
          <b-form-group :label="$t('Flat')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Flat')"
              v-model="address_flat"
      
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_flat.$dirty && !$v.address_flat.required"
              >
                {{$t('Flat empty')}}
            </small>
          </b-form-group>
        </b-col>

        <!-- landmark -->
        <b-col cols="12">
          <b-form-group :label="$t('Landmark')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Landmark')"
              v-model="address_landmark"
      
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_landmark.$dirty && !$v.address_landmark.required"
              >
                {{$t('Landmark empty')}}
            </small>
          </b-form-group>
        </b-col>

        <!-- note -->
        <b-col cols="12">
          <b-form-group :label="$t('Note')" label-cols-md="4">
            <b-form-input 
            :placeholder="$t('Note')" 
            v-model="address_note"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_note.$dirty && !$v.address_note.required"
              >
                {{$t('Note empty')}}
            </small>    
          </b-form-group>
        </b-col>

        <!-- Lat -->
        <b-col cols="12">
          <b-form-group :label="$t('Lat')" label-cols-md="4">
            <b-form-input
      
              :placeholder="$t('Lat')" 
              v-model="address_lat"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_lat.$dirty && !$v.address_lat.required"
              >
                {{$t('Lat empty')}}
            </small>
          </b-form-group>
        </b-col>

        <!-- Long -->
        <b-col cols="12">
          <b-form-group :label="$t('Long')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Long')"
              v-model="address_long"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.address_long.$dirty && !$v.address_long.required"
              >
                {{$t('Long empty')}}
            </small>
          </b-form-group>
        </b-col>

        <!-- Is permament -->
        <b-col cols="12">
            <b-form-group :label="$t('Is permament')" label-cols-md="4" label-for="is_permament">
                <b-form-checkbox
                id="is_permament"
                v-model="address_is_permament"
                class="custom-control-primary"
                >
                {{$t('Is permament')}}
                </b-form-checkbox>
            </b-form-group>
        </b-col>
        
        <!-- Map -->
        <b-col cols="12" class="mt-1 mb-2">
          <MapView
            v-if="address_address && address_lat && address_long"
            :latlng="[address_lat, address_long]"
            class="my-map-cabinet"
          />
        </b-col>

      </b-row>

      </b-card>
      <b-card>
        <b-row>
        <!-- submit and reset -->
        <b-col offset-md="4">
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
    <!-- <b-overlay :show="busy" no-wrap></b-overlay> -->
  </b-form>
</template>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
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
  BFormCheckbox,
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
    BFormCheckbox,
    ToastificationContent,
    MapView,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  validations: {
    address_address: {
      required,
    },
    
    address_entrance:{
      required,
    },
    address_floor:{
      required,
    },
    address_flat:{
      required,
    },
    address_landmark:{
      required,
    },
    address_note:{
      required,
    },
    address_lat:{
      required
    },
    address_long:{
      required,
    },
  },
  data() {
    return {
      busy: true,
      address_address:"",
      address_entrance:"",
      address_floor:"",
      address_flat:"",
      address_landmark:"",
      address_note: "",
      address_lat:"",
      address_long:"",
      address_is_permament:true,
    };
  },
  methods: {
    reset_all(){
        this.address_address = "";
        this.address_entrance= "";
        this.address_floor = "";
        this.address_flat= "";
        this.address_landmark = "";
        this.address_note= "";
        this.address_lat= "";
        this.address_long = "";
        this.address_is_permament= true;
    },
    async createAddress() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      const form = new FormData();
      form.append("address", this.address_address);
      form.append("entrance", this.address_entrance);
      form.append("floor", this.address_floor);
      form.append("flat", this.address_flat);
      form.append("landmark", this.address_landmark);
      form.append("note", this.address_note);
      form.append("lat", this.address_lat);
      form.append("long", this.address_long);
      form.append("is_permament", this.address_is_permament);

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios
      
        .post(`${this.$baseUrl}/product/address/`, form, params)
        .then((res) => {
          console.log('kelgan Response',res)
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Yangi address yaratildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
          this.$router.push({name: "user-addresses"});
        })
        .catch((err) => {
          const errors = Object.values(err.response.data);
          console.log(errors);
          for (let index = 0; index < errors.length; index++) {
            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: "Xato ketdi! - " + errors[index],
                icon: "CheckCircleIcon",
                variant: "danger",
              },
            });
          }
        });
    },
  },
};
</script>
<style scoped lang="scss"></style>
