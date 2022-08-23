<template>
  <b-form @submit.prevent="changeAbout">
    <b-card>
      <b-row>

        <!-- About title -->
        <b-col cols="12">
          <b-form-group :label="$t('About title')" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  :placeholder="$t('Uz About title')"
                  v-model="title_uz"
                  
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  :placeholder="$t('Ru About title')"
                  v-model="title_ru"
                 
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  :placeholder="$t('En About title')"
                  v-model="title_en"
                  
                />
              </b-tab>
            </b-tabs>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.title_uz.$dirty && !$v.title_uz.required"
              >
                {{$t('Uz About empty')}}
            </small>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.title_ru.$dirty && !$v.title_ru.required"
              >
                {{$t('Ru About empty')}}
            </small>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.title_en.$dirty && !$v.title_en.required"
              >
                {{$t('En About empty')}}
            </small>
          </b-form-group>
        </b-col>

        <!-- About content -->
        <b-col cols="12">
          <b-form-group :label="$t('About content')" label-cols-md="4" class="mt-2">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <quill-editor v-model="mission_uz" :options="snowOption" />
              </b-tab>
              <b-tab title="Ру">
                <quill-editor v-model="mission_ru" :options="snowOption" />
              </b-tab>
              <b-tab title="En">
                <quill-editor v-model="mission_en" :options="snowOption" />
              </b-tab>
            </b-tabs>
            <small
              class="text-danger mt-0"
              style="margin-left: 5px; font-size:14px;"
              v-if="$v.mission_uz.$dirty && !$v.mission_uz.required"
            >
              {{$t('Uz Mission empty')}}
            </small>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.mission_ru.$dirty && !$v.mission_ru.required"
              >
                {{$t('Ru Mission empty')}}
            </small>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.mission_en.$dirty && !$v.mission_en.required"
              >
                {{$t('En Mission empty')}}
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
  </b-form>
</template>

<script>
import axios from "axios";
import {quillEditor} from "vue-quill-editor";
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
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { required } from "vuelidate/lib/validators";
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
    quillEditor,
  },
  directives: {
    Ripple,
  },
  validations: {
    title_uz: {
      required,
    },
    title_ru: {
      required,
    },
    title_en: {
      required,
    },
    mission_uz: {
      required,
    },
    mission_ru: {
      required,
    },
    mission_en: {
      required,
    },
    
  },
  data() {
    return {
      category: {},

      title_uz:"",
      title_ru:"",
      title_en:"",

      mission_uz:"",
      mission_ru:"",
      mission_en:"",

      snowOption: {
        theme: "snow",
      },
    };
  },
  methods: {
    reset_all(){
      this.title_uz="";
      this.title_ru="";
      this.title_en="";

      this.mission_uz="";
      this.mission_ru="";
      this.mission_en="";
      
    },
    async changeAbout() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      const form = {};
      form.title = this.title_ru;
      form.title_uz = this.title_uz;
      form.title_ru = this.title_ru;
      form.title_en = this.title_en;

      form.mission = this.mission_ru;
      form.mission_uz = this.mission_uz;
      form.mission_ru = this.mission_ru;
      form.mission_en = this.mission_en;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .post(`${this.$baseUrl}/company/about/`, form, params)
        .then(() => {
          this.$router.push({name: "about"});

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Biz haqimizda sahifasi yaratildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Xatolik ketti :(",
              icon: "AlertCircleIcon",
              variant: "warning",
            },
          });
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
