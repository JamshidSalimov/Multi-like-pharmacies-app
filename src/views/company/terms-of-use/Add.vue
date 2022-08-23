<template>
  <b-form @submit.prevent="changeTerms">
    <b-card>
      <b-row>
        <b-col cols="12">
          <!-- Terms content -->
          <b-col cols="12">
            <b-form-group :label="$t('Terms content')" label-cols-md="4" class="mt-2">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <quill-editor v-model="terms_of_use_uz" :options="snowOption" />
                </b-tab>
                <b-tab title="Ру">
                  <quill-editor v-model="terms_of_use_ru" :options="snowOption" />
                </b-tab>
                <b-tab title="En">
                  <quill-editor v-model="terms_of_use_en" :options="snowOption" />
                </b-tab>
              </b-tabs>
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.terms_of_use_uz.$dirty && !$v.terms_of_use_uz.required"
              >
                {{$t('Uz Terms content empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.terms_of_use_ru.$dirty && !$v.terms_of_use_ru.required"
                >
                  {{$t('Ru Terms content empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.terms_of_use_en.$dirty && !$v.terms_of_use_en.required"
                >
                  {{$t('En Terms content empty')}}
              </small>
            </b-form-group>
          </b-col>
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
import { required } from "vuelidate/lib/validators";
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
    terms_of_use_uz: {
      required,
    },
    terms_of_use_ru: {
      required,
    },
    terms_of_use_en: {
      required,
    },
    
  },
  data() {
    return {
      terms_of_use_uz:"",
      terms_of_use_ru:"",
      terms_of_use_en:"",
      snowOption: {
        theme: "snow",
      },
    };
  },
  methods: {
    reset_all(){

      this.terms_of_use_uz="";
      this.terms_of_use_ru="";
      this.terms_of_use_en="";

    },
    async changeTerms() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      const form = {};

      form.terms_of_use = this.terms_of_use_ru;
      form.terms_of_use_uz = this.terms_of_use_uz;
      form.terms_of_use_ru = this.terms_of_use_ru;
      form.terms_of_use_en = this.terms_of_use_en;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .post(`${this.$baseUrl}/company/terms-of-use/`, form, params)
        .then(() => {
          this.$router.push({name: "terms-of-use"});

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Maxfiylik siyosati yaratildi!",
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
