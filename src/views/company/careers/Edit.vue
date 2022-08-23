<template>
  <b-form @submit.prevent="changeCareer">
    <div>
      <b-card>
        <b-row>
          <!-- Career title -->
          <b-col cols="12">
            <b-form-group :label="$t('Career title')"  label-cols-md="4">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <b-form-input
                    :placeholder="$t('Uz Career title')"
                    v-model="career_uz"
                   
                  />
                </b-tab>
                <b-tab title="Ру">
                  <b-form-input
                    :placeholder="$t('Ru Career title')"
                    v-model="career_ru"
                    
                  />
                </b-tab>
                <b-tab title="En">
                  <b-form-input
                    :placeholder="$t('En Career title')"
                    v-model="career_en"
                    
                  />
                </b-tab>
              </b-tabs>

              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.career_uz.$dirty && !$v.career_uz.required"
              >
                {{$t('Uz Career empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.career_ru.$dirty && !$v.career_ru.required"
                >
                  {{$t('Ru Career empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.career_en.$dirty && !$v.career_en.required"
                >
                  {{$t('En Career empty')}}
              </small>
            </b-form-group>
          </b-col>

          <!-- Career content -->
          <b-col cols="12">
            <b-form-group :label="$t('Career content')" label-cols-md="4" class="mt-2">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <quill-editor
                    
                    v-model="career_content_uz"
                    :options="snowOption"
                  />
                </b-tab>
                <b-tab title="Ру">
                  <quill-editor
                   
                    v-model="career_content_ru"
                    :options="snowOption"
                  />
                </b-tab>
                <b-tab title="En">
                  <quill-editor
                    
                    v-model="career_content_en"
                    :options="snowOption"
                  />
                </b-tab>
              </b-tabs>

              <small
              class="text-danger mt-0"
              style="margin-left: 5px; font-size:14px;"
              v-if="$v.career_content_uz.$dirty && !$v.career_content_uz.required"
            >
              {{$t('Uz Content empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.career_content_ru.$dirty && !$v.career_content_ru.required"
                >
                  {{$t('Ru Content empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.career_content_en.$dirty && !$v.career_content_en.required"
                >
                  {{$t('En Content empty')}}
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
    career_uz: {
      required,
    },
    career_ru: {
      required,
    },
    career_en: {
      required,
    },
    career_content_uz: {
      required,
    },
    career_content_ru: {
      required,
    },
    career_content_en: {
      required,
    },
    
  },
  data() {
    return {
      busy: true,
      
      career_uz:"",
      career_ru:"",
      career_en:"",

      career_content_uz:"",
      career_content_ru:"",
      career_content_en:"",

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
      this.career_uz="";
      this.career_ru="";
      this.career_en="";

      this.career_content_uz="";
      this.career_content_ru="";
      this.career_content_en="";
      
    },

    async getData() {
      await axios
        .get(`${this.$baseUrl}/company/career/${this.$route.params.id}/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.careers = res.data;
          this.career_uz = this.careers.career_uz;
          this.career_ru = this.careers.career_ru;
          this.career_en = this.careers.career_en;

          this.career_content_uz = this.careers.career_content_uz;
          this.career_content_ru = this.careers.career_content_ru;
          this.career_content_en = this.careers.career_content_en;

          this.busy = false;
        });
    },
    async changeCareer() {

      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }

      const form = {};
      form.career = this.career_ru;
      form.career_uz = this.career_uz;
      form.career_ru = this.career_ru;
      form.career_en = this.career_en;

      form.career_content = this.career_content_ru;
      form.career_content_uz = this.career_content_uz;
      form.career_content_ru = this.career_content_ru;
      form.career_content_en = this.career_content_en;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .patch(
          `${this.$baseUrl}/company/career/${this.$route.params.id}/`,
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
            this.$router.push({name: "careers"});
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
