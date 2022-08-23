<template>
  <b-form @submit.prevent="changeFaq">
    <b-card>
      <b-row>
        <b-col cols="12">
          <!-- Faq title -->
          <b-form-group label="Faq title" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  placeholder="Uz Faq title"
                  v-model="question.uz"
                  required
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  placeholder="Ru Faq title"
                  v-model="question.ru"
                  required
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  placeholder="En Faq title"
                  v-model="question.en"
                  required
                />
              </b-tab>
            </b-tabs>
          </b-form-group>

          <!-- Faq content -->
          <b-form-group label="Faq content" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <label for="faq-uz">Uz Faq content</label>
                <b-form-textarea
                  id="faq-uz"
                  placeholder="Uz Faq content"
                  rows="3"
                  v-model="answer.uz"
                />
              </b-tab>
              <b-tab title="Ру">
                <label for="faq-ru">Ru Faq content</label>
                <b-form-textarea
                  id="faq-ru"
                  placeholder="Ru Faq content"
                  rows="3"
                  v-model="answer.ru"
                />
              </b-tab>
              <b-tab title="En">
                <label for="faq-en">En Faq content</label>
                <b-form-textarea
                  id="faq-en"
                  placeholder="En Faq content"
                  rows="3"
                  v-model="answer.en"
                />
              </b-tab>
            </b-tabs>
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
            Submit
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-form>
</template>

<script>
import axios from "axios";
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
    BFormTextarea
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      question: {
        uz: "",
        ru: "",
        en: "",
      },
      answer: {
        uz: "",
        ru: "",
        en: "",
      },
    };
  },
  methods: {
    async changeFaq() {
      const form = {};
      form.question = this.question.ru;
      form.question_uz = this.question.uz;
      form.question_ru = this.question.ru;
      form.question_en = this.question.en;

      form.answer = this.answer.ru;
      form.answer_uz = this.answer.uz;
      form.answer_ru = this.answer.ru;
      form.answer_en = this.answer.en;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .post(`${this.$baseUrl}/company/faq/`, form, params)
        .then(() => {
          this.$router.push({name: "faq"});

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Ko'p so'raladigan savol yaratildi!",
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
