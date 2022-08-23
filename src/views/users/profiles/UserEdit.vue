<template>
  <div class="ecommerce-application">
    <b-form @submit.stop.prevent="changeUserItem">
      <b-card>
        <b-row>
          <!-- Phone number -->
          <b-col cols="12">
            <b-form-group
             :label="$t('Phone number')" 
             label-for="Phone_number"
             label-cols-md="4">
              <b-form-input
                type="tel"
                id="Phone_number"
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
            <b-form-group :label="$t('Password')"  label-cols-md="4" label-for="Password">
              <b-form-input
                id="Password"
                type="password"
                :placeholder="$t('Password')"
                v-model="user_password"
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
          <!-- User Name -->
          <b-col cols="12">
            <b-form-group :label="$t('Name')"
            label-cols-md="4"
            label-for="Name">
              <b-form-input
                id="Name"
                :placeholder="$t('First name')"
                v-model="user_first_name"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.user_first_name.$dirty && !$v.user_first_name.required"
              >
                {{$t('First name empty')}}
            </small>
            </b-form-group>
          </b-col>
          <!-- User last name -->
          <b-col cols="12">
            <b-form-group :label="$t('Last name')" label-cols-md="4"
            label-for="LastName">
              <b-form-input
              id="LastName"
                :placeholder="$t('Last name')"
                v-model="user_last_name"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.user_last_name.$dirty && !$v.user_last_name.required"
              >
                {{$t('Last name empty')}}
              </small>
            </b-form-group>
          </b-col>
          <!-- Brithday -->
          <b-col cols="12">
            <b-form-group :label="$t('Brithday')" label-cols-md="4"
            label-for="Brithday">
              <b-form-input
                id="Brithday"
                :placeholder="$t('Brithday')"
                v-model="user_birthday"
                type="date"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.user_birthday.$dirty && !$v.user_birthday.required"
              >
                 {{$t('Brithday empty')}}
              </small>
            </b-form-group>
          </b-col>
          <!-- Address -->
          <b-col cols="12">
            <b-form-group :label="$t('Address')" label-cols-md="4"
            label-for="Address">
              <b-form-input
                id="Address"
                :placeholder="$t('Address')"
                v-model="user_address"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.user_address.$dirty && !$v.user_address.required"
              >
                 {{$t('Address empty')}}
              </small>
            </b-form-group>
          </b-col>
          <!-- Gender -->
          <b-col cols="12">
            <b-form-group
                :label="$t('Gender')"
                label-for="h-gender"
                label-cols-md="4"
            >
                <v-select
                id="h-gender"
                :value="user_gender"
                label="name"
                :options="Genders"
                :placeholder="$t('Gender')"
                @input="setGender"
                >
                <template #selected-option="{ name }">
                    {{ name }}
                </template>
                </v-select>
                <br>
                <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.user_gender.$dirty && !$v.user_gender.required"
              >
                  {{$t('Gender empty')}}
              </small>
            </b-form-group>
          </b-col>
          <!-- Location -->
          <b-col cols="12">
            <b-form-group :label="$t('Location')" label-cols-md="4"
            label-for="location">
              <b-form-input
                id="location"
                :placeholder="$t('Location')"
                v-model="user_location"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.user_location.$dirty && !$v.user_location.required"
              >
                 {{$t('Location empty')}}
              </small>
            </b-form-group>
          </b-col>
          <!-- ill_history -->
          <b-col cols="12">
            <b-form-group :label="$t('Ill history')" label-cols-md="4"
            label-for="ill_hestory">
              <b-form-input
                id="ill_hestory"
                :placeholder="$t('Ill history')"
                v-model="user_ill_history"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.user_ill_history.$dirty && !$v.user_ill_history.required"
              >
                {{$t('Ill history empty')}}
              </small>
            </b-form-group>
          </b-col>
          <!-- finance_sum -->
          <b-col cols="12">
            <b-form-group :label="$t('Finance sum')" label-cols-md="4"
            label-for="summ">
              <b-form-input
              id="summ"
                :placeholder="$t('Finance sum')"
                v-model="user_finance_sum"
                type="number"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.user_finance_sum.$dirty && !$v.user_finance_sum.required"
              >
                {{$t('Finance sum empty')}}
              </small>
            </b-form-group>
          </b-col>
          <!-- Is Active -->
          <b-col cols="12">
          <b-form-group :label="$t('Is active')"  label-cols-md="4"
          label-for="is_active">
            <b-form-checkbox
              id="is_active"
              v-model="user_is_active"
              class="custom-control-primary"
            >
              {{$t('Is active')}}
            </b-form-checkbox>
          </b-form-group>
          </b-col>
          <!-- Is superuser -->
          <b-col cols="12">
            <b-form-group :label="$t('Is superuser')"  label-cols-md="4"
            label-for="is_superuser">
                <b-form-checkbox
                id="is_superuser"
                v-model="user_is_superuser"
                class="custom-control-primary"
                >
               {{$t('Is superuser')}}
                </b-form-checkbox>
            </b-form-group>
          </b-col>
          <!-- is staff -->
          <b-col cols="12">
            <b-form-group :label="$t('Is staff')" label-cols-md="4"
            label-for="is_staff">
                <b-form-checkbox
                id="is_staff"
                v-model="user_is_staff"
                class="custom-control-primary"
                >
                {{$t('Is staff')}}
                </b-form-checkbox>
            </b-form-group>
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
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import { required,minLength } from "vuelidate/lib/validators";

// import ECommerceWishlist from "./ECommerceWishlist.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BCard,
  BTab,
  BTabs,
  BCardText,
  BFormFile,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
export default {
  components: {
    vSelect,
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
    // ECommerceWishlist,
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
    user_first_name:{
      required,
    },
    user_last_name:{
      required,
    },
    user_birthday:{
      required,
    },
    user_address:{
      required,
    },
    user_gender:{
      required
    },
    user_finance_sum:{
      required,
    },
    user_location:{
      required,
    },
    user_ill_history:{
      required,
    }
  },
  data() {
    return {
     Genders: ["M","F"],
      user_phone_number: "",
      user_first_name: "",
      user_password: "",
      user_last_name: "",
      user_birthday: null,
      user_address: null,
      user_gender: null,
      user_location:null,
      user_ill_history:null,
      user_finance_sum:null,
      user_is_active: false,
      user_is_superuser: false,
      user_is_staff:false,
      user_number:"",
    };
  },
  mounted(){
      this.getData();
  },
  methods: {
    reset_all(){
        this.user_is_active = false;
        this.user_is_superuser= false;
        this.user_is_staff= false;
        this.user_gender = null;
        this.user_phone_number= "";
        this.user_first_name="";
        this.user_password="";
        this.user_last_name="";
        this.user_birthday=null;
        this.user_address=null;
        this.user_location=null;
        this.user_ill_history=null;
        this.user_finance_sum=null;
        this.user_number="";
    },
    setGender(item) {
      this.user_gender = item;
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
      console.log("this.user_number=",this.user_number)
      console.log("this.user_phone_number",this.user_phone_number)
     
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
        .get(`${this.$baseUrl}/user/profile/${this.$route.params.id}/`,params)
        .then((res) => {
          console.log('EditAddress data',res.data)
            this.user_phone_number = res.data.phone_number;
            this.user_number = res.data.phone_number;
            this.user_first_name = res.data.first_name;
            this.user_last_name = res.data.last_name;
            this.user_birthday = res.data.birthday;
            this.user_gender = res.data.gender;
            this.user_address = res.data.address;
            this.user_location = res.data.location;
            this.user_ill_history = res.data.ill_history;
            this.user_finance_sum = res.data.finance_sum;
            this.user_is_active = res.data.is_active;
            this.user_is_superuser = res.data.is_superuser;
            this.user_is_staff = res.data.is_staff;
        });
    },
    async changeUserItem() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      const form = new FormData();
      form.append("phone_number", this.user_number);
      form.append("first_name", this.user_first_name);
      form.append("last_name", this.user_last_name);
      form.append("birthday", this.user_birthday);
      form.append("address", this.user_address);
      form.append("gender", this.user_gender);
      form.append("location", this.user_location);
      form.append("ill_history", this.user_ill_history);
      form.append("finance_sum", this.user_finance_sum);
      form.append("is_active", this.user_is_active);
      form.append("is_superuser", this.user_is_superuser);
      form.append("is_staff", this.user_is_staff);

      this.changePassword()

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      }
      await axios
        .patch(`${this.$baseUrl}/user/profile-update/${this.$route.params.id}/`, form, params)
        .then((res) => {
          this.getData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Yangi user yaratildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
          this.$router.push({name: "users"});
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

    async changePassword() {
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
           console.log('Password Funktion',res)
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
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/quill.scss";

</style>
