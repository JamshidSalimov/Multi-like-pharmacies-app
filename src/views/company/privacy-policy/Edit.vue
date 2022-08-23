<template>
  <b-form @submit.prevent="changePrivacy">
    <div>
      <b-card>
        <b-row>
          <b-col cols="12">
            <!-- Privacy content -->
            <b-col cols="12">
              <b-form-group
                :label="$t('Privacy content')"
                label-cols-md="4"
                class="mt-2"
              >
                <b-tabs pills align="left">
                  <b-tab title="Uz" active>
                    <quill-editor v-model="text_uz" :options="snowOption" />
                  </b-tab>
                  <b-tab title="Ру">
                    <quill-editor v-model="text_ru" :options="snowOption" />
                  </b-tab>
                  <b-tab title="En">
                    <quill-editor v-model="text_en" :options="snowOption" />
                  </b-tab>
                </b-tabs>

                <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.text_uz.$dirty && !$v.text_uz.required"
              >
                {{$t('Uz Privacy Content empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.text_ru.$dirty && !$v.text_ru.required"
                >
                  {{$t('Ru Privacy Content empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.text_en.$dirty && !$v.text_en.required"
                >
                  {{$t('En Privacy Content empty')}}
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
    </div>
    <b-overlay :show="busy" no-wrap></b-overlay>
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
    quillEditor,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  validations: {
    text_uz: {
      required,
    },
    text_ru: {
      required,
    },
    text_en: {
      required,
    },
    
  },
  data() {
    return {
      busy: true,
      privacy: {},

      text_uz:"",
      text_ru:"",
      text_en:"",
      
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

      this.text_uz="";
      this.text_ru="";
      this.text_en="";
    },
    async getData() {
      await axios
        .get(
          `${this.$baseUrl}/company/privacy-policy/${this.$route.params.id}/`,
          {
            headers: {
              "Accept-Language": "ru",
            },
          }
        )
        .then((res) => {
          this.privacy = res.data;
          this.text_uz = this.privacy.text_uz;
          this.text_ru = this.privacy.text_ru;
          this.text_en = this.privacy.text_en;

          this.busy = false;
        });
    },
    async changePrivacy() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      const form = {};
      form.text = this.text_ru;
      form.text_uz = this.text_uz;
      form.text_ru = this.text_ru;
      form.text_en = this.text_en;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .patch(
          `${this.$baseUrl}/company/privacy-policy/${this.$route.params.id}/`,
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
            this.$router.push({name: "privacy-policy"});
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
<style scoped lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
