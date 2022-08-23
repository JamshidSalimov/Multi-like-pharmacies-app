<template>
  <b-card>

    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <b-img
            ref="previewEl"
            rounded
            :src="optionsLocal.avatar"
            height="80"
          />
        </b-link>
        <!--/ avatar -->
      </b-media-aside>

      <b-media-body class="mt-75 ml-75">
        <!-- upload button -->
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          size="sm"
          class="mb-75 mr-75"
          @click="$refs.refInputEl.$el.click()"
        >
          {{$t('Upload')}}
        </b-button>
        <b-form-file
          ref="refInputEl"
          v-model="profileFile"
          accept=".jpg, .png, .gif"
          :hidden="true"
          plain
          @input="inputImageRenderer"
        />
        <!--/ upload button -->

        <!-- reset -->
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="outline-secondary"
          size="sm"
          class="mb-75 mr-75"
        >
          {{$t('Reset')}}
        </b-button>
        <!--/ reset -->
        <b-card-text>{{$t('Allowed JPG, GIF or PNG. Max size of 800kB')}}</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2" @submit.prevent="createUserGeneral">
      <b-row>
        <b-col sm="6">
          <b-form-group
            :label="$t('Username')"
            label-for="account-username"
          >
            <b-form-input
              v-model="optionsLocal_username"
              :placeholder="$t('Username')"
              name="username"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.optionsLocal_username.$dirty && !$v.optionsLocal_username.required"
              >
                 {{$t('Username empty')}}
              </small>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            :label="$t('Name')"
            label-for="account-name"
          >
            <b-form-input
              v-model="optionsLocal_fullName"
              name="name"
              :placeholder="$t('Name')"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.optionsLocal_fullName.$dirty && !$v.optionsLocal_fullName.required"
              >
                 {{$t('Name empty')}}
            </small>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            :label="$t('Email')"
            label-for="account-e-mail"
          >
            <b-form-input
              v-model="optionsLocal_email"
              name="email"
              :placeholder="$t('Email')"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.optionsLocal_email.$dirty && !$v.optionsLocal_email.required"
              >
                 {{$t('Email empty')}}
            </small>

          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            :label="$t('Company')"
            label-for="account-company"
          >
            <b-form-input
              v-model="optionsLocal_company"
              name="company"
              :placeholder="$t('Company name')"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.optionsLocal_company.$dirty && !$v.optionsLocal_company.required"
              >
                 {{$t('Company name empty')}}
            </small>
          </b-form-group>
        </b-col>

        <!-- alert -->
        <b-col
          cols="12"
          class="mt-75"
        >
          <b-alert
            show
            variant="warning"
            class="mb-50"
          >
            <h4 class="alert-heading">
              {{$t('Your email is not confirmed. Please check your inbox')}}
            </h4>
            <div class="alert-body">
              <b-link class="alert-link">
                {{$t('Resend confirmation')}}
              </b-link>
            </div>
          </b-alert>
        </b-col>
        <!--/ alert -->

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1"
            type="submit"
          >
            {{$t('Save changes')}}
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            type="reset"
            class="mt-2"
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
  BFormFile, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BAlert, BCard, BCardText, BMedia, BMediaAside, BMediaBody, BLink, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api';
import { required} from "vuelidate/lib/validators";

export default {
  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
  },
  validations: {
    
    optionsLocal_username:{
      required,
    },
    optionsLocal_fullName:{
      required,
    },
    optionsLocal_email:{
      required,
    },
    optionsLocal_company:{
      required,
    },
 
  },
  data() {
    return {
      optionsLocal: JSON.parse(JSON.stringify(this.generalData)),
      profileFile: null,

      optionsLocal_username:"",
      optionsLocal_fullName:"",
      optionsLocal_email:"",
      optionsLocal_company:"",

    }
  },
  methods: {
    reset_all(){
        this.optionsLocal_username = "";
        this.optionsLocal_fullName= "";
        this.optionsLocal_email="";
        this.optionsLocal_company="";
    },

    createUserGeneral(){
      console.log("function is working")
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      
    },
    resetForm() {
      this.optionsLocal = JSON.parse(JSON.stringify(this.generalData))
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    return {
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
  
}
</script>
