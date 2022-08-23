<template>
  <b-form @submit.prevent="changeFaq">
    <div>
      <b-card>
        <b-row>
          <b-col cols="12">

            <!-- Faq title -->
            <b-form-group :label="$t('Faq title')" label-cols-md="4">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <b-form-input
                    :placeholder="$t('Uz Faq title')"
                    v-model="question_uz"
                    
                  />
                </b-tab>
                <b-tab title="Ру">
                  <b-form-input
                    :placeholder="$t('Ru Faq title')"
                    v-model="question_ru"
                    
                  />
                </b-tab>
                <b-tab title="En">
                  <b-form-input
                    :placeholder="$t('En Faq title')"
                    v-model="question_en"
                    
                  />
                </b-tab>
              </b-tabs>
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.question_uz.$dirty && !$v.question_uz.required"
              >
                {{$t('Uz Faq empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.question_ru.$dirty && !$v.question_ru.required"
                >
                  {{$t('Ru Faq empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.question_en.$dirty && !$v.question_en.required"
                >
                  {{$t('En Faq empty')}}
              </small>
            </b-form-group>

          </b-col>

          <b-col cols="12">

            <!-- Faq content -->
            <b-form-group :label="$t('Faq content')" label-cols-md="4">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <label for="faq-uz"></label>
                  <b-form-textarea
                    id="faq-uz"
                    :placeholder="$t('Uz Faq content')"
                    rows="3"
                    v-model="answer_uz"
                  />
                </b-tab>
                <b-tab title="Ру">
                  <label for="faq-ru"></label>
                  <b-form-textarea
                    id="faq-ru"
                    :placeholder="$t('Ru Faq content')"
                    rows="3"
                    v-model="answer_ru"
                  />
                </b-tab>
                <b-tab title="En">
                  <label for="faq-en"></label>
                  <b-form-textarea
                    id="faq-en"
                    :placeholder="$t('En Faq content')"
                    rows="3"
                    v-model="answer_en"
                  />
                </b-tab>
              </b-tabs>
              <small
              class="text-danger mt-0"
              style="margin-left: 5px; font-size:14px;"
              v-if="$v.answer_uz.$dirty && !$v.answer_uz.required"
            >
              {{$t('Uz Faq Content empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.answer_ru.$dirty && !$v.answer_ru.required"
                >
                  {{$t('Ru Faq Content empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.answer_en.$dirty && !$v.answer_en.required"
                >
                  {{$t('En Faq Content empty')}}
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
  BFormTextarea,
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
    BFormTextarea,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  validations: {
    question_uz: {
      required,
    },
    question_ru: {
      required,
    },
    question_en: {
      required,
    },
    answer_uz: {
      required,
    },
    answer_ru: {
      required,
    },
    answer_en: {
      required,
    },
    
  },
  data() {
    return {
      busy: true,
      faq: {},

      question_uz:"",
      question_ru:"",
      question_en:"",

      answer_uz:"",
      answer_ru:"",
      answer_en:"",

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

      this.question_uz="";
      this.question_ru="";
      this.question_en="";

      this.answer_uz="";
      this.answer_ru="";
      this.answer_en="";
      
    },

    async getData() {
      await axios
        .get(`${this.$baseUrl}/company/faq/${this.$route.params.id}/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.faq = res.data;
          console.log("salom",this.faq)
          this.question_uz = this.faq.question_uz;
          this.question_ru = this.faq.question_ru;
          this.question_en = this.faq.question_en;

          this.answer_uz = this.faq.answer_uz;
          this.answer_ru = this.faq.answer_ru;
          this.answer_en = this.faq.answer_en;
          this.busy = false;
        });
    },
    async changeFaq() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      } 
      const form = {};
      form.question = this.question_ru;
      form.question_uz = this.question_uz;
      form.question_ru = this.question_ru;
      form.question_en = this.question_en;

      form.answer = this.answer_ru;
      form.answer_uz = this.answer_uz;
      form.answer_ru = this.answer_ru;
      form.answer_en = this.answer_en;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .patch(
          `${this.$baseUrl}/company/faq/${this.$route.params.id}/`,
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
            this.$router.push({name: "faq"});
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
