<template>
  <b-card>
    <!-- form -->
    <b-form @submit.prevent="createUserInfo">
      <b-row>
        <!-- bio -->
        <b-col cols="12">
          <b-form-group
            :label="$t('Bio')"
            label-for="bio-area"
          >
            <b-form-textarea
              id="bio-area"
              v-model="localOptions_bio"
              rows="4"
              :placeholder="$t('Your bio data here')"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.localOptions_bio.$dirty && !$v.localOptions_bio.required"
              >
                {{$t('Your bio data empty')}}
            </small>
          </b-form-group>
        </b-col>
        <!--/ bio -->

        <!-- birth date -->
        <b-col md="6">
          <b-form-group
            label-for="Brithday"
            :label="$t('Birth date')"
          >
            <!-- <flat-pickr
              v-model="localOptions_birth"
              class="form-control"
              name="date"
              type="date"
              :placeholder="$t('Birth date')"
            /> -->
            <b-form-input
                class="form-control"
                id="Brithday"
                :placeholder="$t('Birth date')"
                v-model="localOptions_birth"
                type="date"
              />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.localOptions_birth.$dirty && !$v.localOptions_birth.required"
              >
                {{$t('Birth date empty')}}
            </small>
          </b-form-group>
        </b-col>
        <!--/ birth date -->

        <!-- Country -->
        <b-col md="6">
          <b-form-group
            label-for="countryList"
            :label="$t('Country')"
          >
            <v-select
              id="countryList"
              v-model="localOptions_country"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="countryOption"
              
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.localOptions_country.$dirty && !$v.localOptions_country.required"
              >
                {{$t('Country empty')}}
            </small>
          </b-form-group>
        </b-col>
        <!--/ Country -->

        <!-- website -->
        <b-col md="6">
          <b-form-group
            label-for="website"
            :label="$t('Website')"
          >
            <b-form-input
              id="website"
              v-model="localOptions_website"
              :placeholder="$t('Website address')"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.localOptions_website.$dirty && !$v.localOptions_website.required"
              >
                {{$t('Website empty')}}
            </small>
          </b-form-group>
        </b-col>
        <!--/ website -->

        <!-- phone -->
        <b-col md="6">
          <b-form-group
            label-for="phone"
            :label="$t('Phone')"
          >
            <!-- <cleave
              id="phone"
              v-model="localOptions_phone"
              class="form-control"
              type="tel"
              :raw="false"
              :options="clevePhone"
              :placeholder="$t('Phone number')"
              @input="changeInput"
              maxlength="13"
            /> -->
            <b-form-input
                class="form-control"
                id="phone"
                type="tel"
                :placeholder="$t('Phone number')"
                v-model="localOptions_phone"
                @input="changeInput"
                maxlength="13"
              />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.localOptions_phone.$dirty && !$v.localOptions_phone.required"
              >
                {{$t('Phone number empty')}}
            </small>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.localOptions_phone.$dirty && !$v.localOptions_phone.minLength"
              >
                {{$t('Phone at least 7 number')}}
            </small>
          </b-form-group>
        </b-col>
        <!-- phone -->

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            type="submit"
          >
            {{$t('Save changes')}}
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            class="mt-1"
            variant="outline-secondary"
            @click.prevent="resetForm"
            @click="reset_all"
          >
            {{$t('Reset')}}
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BFormTextarea,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import Cleave from 'vue-cleave-component'

// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us';
import { required,minLength } from "vuelidate/lib/validators";

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BFormTextarea,
    vSelect,
    flatPickr,
    Cleave,
  },
  directives: {
    Ripple,
  },
  validations: {
    localOptions_phone: {
      required,
      minLength: minLength(13)
    },
    
    localOptions_bio:{
      required,
    },
    localOptions_birth:{
      required,
    },
    localOptions_country:{
      required,
    },

    localOptions_website:{
      required,
    }

  },
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      localOptions_bio:"",
      localOptions_birth:null,
      localOptions_country:null,
      localOptions_website:"",
      localOptions_phone:"",
      localOptions_number:"",

      countryOption: ['USA', 'Russia', 'Uzbekistan'],
      localOptions: JSON.parse(JSON.stringify(this.informationData)),
      clevePhone: {
        phone: true,
        phoneRegionCode: 'US',
      },
    }
  },
  methods: {
    changeInput(){
        var x = this.localOptions_phone.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.localOptions_phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        this.localOptions_number="";
        for(let i=0; i<this.localOptions_phone.length; i++){
          if(this.localOptions_phone[i]!=="(" && this.localOptions_phone[i] !==")" && this.localOptions_phone[i]!=="-" && this.localOptions_phone[i]!==" "){
            this.localOptions_number+=this.localOptions_phone[i]
          }
          
        }
        
    },

    reset_all(){
      this.localOptions_bio = "";
      this.localOptions_birth= null;
      this.localOptions_country= null;
      this.localOptions_website = "";
      this.localOptions_phone= "";
      this.localOptions_number="";
    },
    resetForm() {
      this.localOptions = JSON.parse(JSON.stringify(this.informationData))
    },
    createUserInfo(){
      console.log("Information yangilanadi")
      console.log("localOptions_number=",this.localOptions_number)
      console.log("localOptions_phone",this.localOptions_phone)
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
