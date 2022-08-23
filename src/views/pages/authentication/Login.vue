<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary">
          Multilek
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5 lang_position"
      >
        <language-drop class="lang_selector" />
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            class="mb-1 font-weight-bold mb-4"
            title-tag="h2"
          >
            {{$t('Welcome to Multilek')}}
          </b-card-title>

          <!-- form -->
          <validation-observer
            ref="loginForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="login"
            >
              <!-- phone -->
              <b-form-group
                :label="$t('Phone')"
                label-for="login-phone"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Phone"
                  vid="number"
                  rules="required"
                >
                  <b-form-input
                    id="login-phone"
                    v-model="userPhone"
                    :state="errors.length > 0 ? false:null"
                    name="login-phone"
                    :placeholder="$t('Phone number')"
                    @input="changeInput"
                    maxlength="13"

                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">{{$t('Password')}}</label>
                  <b-link :to="{name:'auth-forgot-password'}">
                    <small>{{$t('Forgot Password?')}}</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      :placeholder="$t('Password')"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  {{$t('Remember Me')}}
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
              >
                {{$t('Sign in')}}
              </b-button>
            </b-form>
          </validation-observer>

          <!-- <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{name:'auth-register'}">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text> -->
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import axios from '@axios';
import LanguageDrop from '../../../@core/layouts/components/app-navbar/components/LanguageDropDown.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox,
  // BCardText,
  BCardTitle, BImg, BForm, BButton, VBTooltip,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    LanguageDrop,
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    // BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      userPhone: '',
      number:"",
      sideImg: require('@/assets/images/pages/login-v2.svg'),

      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    changeInput(){
        var x = this.userPhone.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.userPhone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        this.number="";
        for(let i=0; i<this.userPhone.length; i++){
          if(this.userPhone[i]!=="(" && this.userPhone[i] !==")" && this.userPhone[i]!=="-" && this.userPhone[i]!==" "){
            this.number+=this.userPhone[i]
          }
          
        }
        // console.log("this.userPhone",this.userPhone)
        // console.log("this.number=",this.number)

    },
    login() {
      console.log(this.userPhone)
      console.log(this.number)
      console.log(this.password)
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          useJwt.login({
            phone_number: this.number,
            password: this.password,
          })
            .then(response => {
              console.log("Jamshid qara",response)
              this.getUserData(response.data)
            })
            .catch(() => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Nomer yoki parol xato!',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
                  text: '',
                },
              })
              // this.$refs.loginForm.setErrors(error)
            })
        }
      })
    },
    
    async getUserData(response) {
      console.log(response)
      console.log("Jamshid qara",response)
      if (response.is_superuser) {
        await axios.get(`${this.$baseUrl}/user/profile/` + response.id, {
          headers: { Authorization: `Bearer ${response.access}` },
        }).then(res => {
          const userData = res.data
          const userRole = res.data.is_superuser === true ? 'admin' : null
          useJwt.setToken(response.access)
          useJwt.setRefreshToken(response.refresh)
          if (res.data.is_superuser) {
            userData.ability = [
              {
                action: 'manage',
                subject: 'all',
              },
            ]

            localStorage.setItem('userData', JSON.stringify(userData))
            this.$ability.update(userData.ability)
          } else {
            userData.ability = [
              {
                action: 'read',
                subject: 'Auth',
              },
            ]
            localStorage.setItem('userData', JSON.stringify(userData))
            this.$ability.update(userData.ability)
          }

          // ? This is just for demo purpose as well.
          // ? Because we are showing eCommerce app's cart items count in navbar
          // this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)

          // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
          this.$router.replace(getHomeRouteForLoggedInUser(userRole))
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: `Welcome ${userData.full_name || userData.first_name}`,
                  icon: 'CoffeeIcon',
                  variant: 'success',
                  text: `You have successfully logged in as ${userRole}. Now you can start to explore!`,
                },
              })
            })
        })
      } else {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Bunday foydalanuvchi mavjud emas',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
            text: '',
          },
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/pages/page-auth.scss';
.lang_position{
  position: relative;
  height: 100vh;
  width: 100%;
  .lang_selector{
    position: fixed;
    top: 3%;
    right: 6%;
  }
}
</style>
