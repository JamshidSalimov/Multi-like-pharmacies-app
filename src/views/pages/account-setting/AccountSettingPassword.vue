<template>
  <b-card>
    <!-- form -->
    <b-form @submit.prevent="changePassword">
      <b-card>
        <b-row>
          <!-- Phone number -->
          <!-- <b-col md="6">
          <b-form-group
            label="Phone number"
            label-for="phone_number"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                id="phone_number"
                v-model="user.phone_number"
                name="phone_number"
                :type="passwordFieldTypeOld"
                placeholder="Phone number"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconOld"
                  class="cursor-pointer"
                  @click="togglePasswordOld"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          </b-col> -->
          <b-col cols="12">
            <b-form-group :label="$t('Phone number')" label-cols-md="4" label-for="Phone_number">
              <b-form-input
                id="Phone_number"
                type="tel"
                :placeholder="$t('Phone number')" 
                v-model="user_phone_number"
                @input="changeInput"
                maxlength="13"
              />
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.user_phone_number.$dirty && !$v.user_phone_number.required"
                >
                  {{$t('Phone number empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.user_phone_number.$dirty && !$v.user_phone_number.minLength"
                >
                  {{$t('Phone number must have at least 7 number')}}
              </small>
            </b-form-group>
          </b-col>
          <!-- Password -->
          <b-col cols="12">
            <b-form-group :label="$t('New Password')" label-cols-md="4" label-for="account-new-password">
              <b-form-input
                id="account-new-password"
                :type="passwordFieldTypeNew"
                :placeholder="$t('New Password')"
                v-model="user_password"
                name="new-password"
              />
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.user_password.$dirty && !$v.user_password.required"
                >
                  {{$t('Password empty')}}
              </small>
            </b-form-group>
          </b-col>
          <!-- <b-col cols="12">
          <b-form-group label-for="account-new-password" label="New Password">
            <b-input-group class="input-group-merge">
              <b-form-input
                id="account-new-password"
                v-model="user.password"
                :type="passwordFieldTypeNew"
                name="new-password"
                placeholder="New Password"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconNew"
                  class="cursor-pointer"
                  @click="togglePasswordNew"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          </b-col> -->
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
      <!-- <b-row>
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
          >
            Save changes
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
            class="mt-1"
          >
            Reset
          </b-button>
        </b-col>
      </b-row> -->
    </b-form>
  </b-card>
</template>

<script>
import axios from "axios";
import { required,minLength } from "vuelidate/lib/validators";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BInputGroup,
    BInputGroupAppend,
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  validations: {
    user_phone_number: {
      required,
      minLength: minLength(13)
    },
    
    user_password:{
      required,
    },
    
  },
  data() {
    return {
      passwordValueOld: '',
      newPasswordValue: '',
      RetypePassword: '',
      passwordFieldTypeOld: 'password',
      passwordFieldTypeNew: 'password',
      passwordFieldTypeRetype: 'password',

      user_phone_number:"",
      user_password:null,
      user_number:"",
      
    }
  },
  computed: {
    // passwordToggleIconOld() {
    //   return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    // },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    // passwordToggleIconRetype() {
    //   return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    // },
  },
  methods: {
    reset_all(){
        this.user_phone_number = "";
        this.user_password= null;
        this.user_number= "";
    },
    changeInput(){
      var x = this.user_phone_number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
      this.user_phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      this.user_number="";
      for(let i=0; i<this.user_phone_number.length; i++){
        if(this.user_phone_number[i]!=="(" && this.user_phone_number[i] !==")" && this.user_phone_number[i]!=="-" && this.user_phone_number[i]!==" "){
          this.user_number+=this.user_phone_number[i]
        }
        
      }
      // console.log("this.number=",this.user_number)
      // console.log("this.user_phone_number",this.user_phone_number)

    },
    // togglePasswordOld() {
    //   this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
    // },
    togglePasswordNew() {
      this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
    },
    // togglePasswordRetype() {
    //   this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
    // },
    async changePassword() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }

      const form = new FormData();

      form.append("phone_number", this.user_number);
      form.append("password", this.user_password);


      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios
        .post(`${this.$baseUrl}/user/change-password/`, form, params)
        .then((res) => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Pasword ham uzgartirildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
        })
        .catch((err) => {
          const errors = Object.values(err.response.data);
          console.log(errors);
          for (let index = 0; index < errors.length; index++) {
            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: "Passwordni o'zgartirishda xato keldi! - " + errors[index],
                icon: "CheckCircleIcon",
                variant: "danger",
              },
            });
          }
        });
    },
  },
}
</script>