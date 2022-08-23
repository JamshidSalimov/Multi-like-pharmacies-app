<template>
  <b-form @submit.prevent="changeContact">
    <div>
      <b-card>
        <b-row>
          <!-- Contact -->
          <b-col cols="12">
            <!-- Phone number -->
            <b-form-group :label="$t('Phone number')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Phone number')"
              v-model="contact_phone_number"
              @input="changeInput"
              maxlength="13"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.contact_phone_number.$dirty && !$v.contact_phone_number.required"
              >
                {{$t('Phone number empty')}}
            </small>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.contact_phone_number.$dirty && !$v.contact_phone_number.minLength"
              >
                {{$t('Phone number must have at least 7 number')}}
            </small>
            </b-form-group>
            <!-- Email -->
            <b-form-group :label="$t('Email')"  label-cols-md="4">
            <b-form-input
              :placeholder="$t('Email')"
              v-model="contact_email"
              
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.contact_email.$dirty && !$v.contact_email.required"
              >
                {{$t('Email empty')}}
            </small>
            </b-form-group>

            <!-- Google play link -->
            <b-form-group :label="$t('Google play link')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Google play link')" 
              v-model="contact_google_play_link"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.contact_google_play_link.$dirty && !$v.contact_google_play_link.required"
              >
                {{$t('Google play link empty')}}
            </small>
            </b-form-group>

            <!-- App store list -->
            <b-form-group :label="$t('App store list')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('App store list')" 
              v-model="contact_app_store_list"
              
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.contact_app_store_list.$dirty && !$v.contact_app_store_list.required"
              >
                {{$t('App store list empty')}}
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
    BOverlay,
  },
  directives: {
    Ripple,
  },
  validations: {
    
    contact_app_store_list:{
      required,
    },
    contact_google_play_link:{
      required,
    },
    contact_email:{
      required,
    },
    contact_phone_number:{
      required,
      minLength: minLength(13)
    }
    
  },
  data() {
    return {
      busy: true,
      contact_phone_number:"",
      contact_email:"",
      contact_google_play_link:"",
      contact_app_store_list:"",
      contact_number:"",

      snowOption: {
        theme: "snow",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    reset_all(){
      this.contact_phone_number="";
      this.contact_email="";
      this.contact_google_play_link="";
      this.contact_app_store_list="";
      this.contact_number="";
    },
    changeInput(){
        var x = this.contact_phone_number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.contact_phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        this.contact_number="";
        for(let i=0; i<this.contact_phone_number.length; i++){
          if(this.contact_phone_number[i]!=="(" && this.contact_phone_number[i] !==")" && this.contact_phone_number[i]!=="-" && this.contact_phone_number[i]!==" "){
            this.contact_number+=this.contact_phone_number[i]
          }
          
        }
        console.log("this_number=",this.contact_number)
        console.log("this_user.phone_number",this.contact_phone_number)
    },
    async getData() {
      await axios
        .get(`${this.$baseUrl}/company/contact/${this.$route.params.id}/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          console.log('salom',res)
          this.contact_phone_number=res.data.phone_number;
          this.contact_app_store_list=res.data.app_store_list;
          this.contact_email=res.data.email;
          this.contact_google_play_link=res.data.google_play_link;
          this.busy = false;
        });
    },
    async changeContact() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      const form = {};
      form.phone_number = this.contact_number;
      form.email = this.contact_email;
      form.google_play_link = this.contact_google_play_link;
      form.app_store_list = this.contact_app_store_list;
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .patch(
          `${this.$baseUrl}/company/contact/${this.$route.params.id}/`,
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
            this.$router.push({name: "contact"});
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
