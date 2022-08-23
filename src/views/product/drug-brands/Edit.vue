<template>
  <b-form @submit.prevent="changeBrand">
    <b-card>
      <b-row>
        <!-- Brand Name -->
        <b-col cols="12">
          <b-form-group :label="$t('Brand name')" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  :placeholder="$t('Uz Brand name')"
                  v-model="title_uz"
                  
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  :placeholder="$t('Ru Brand name')"
                  v-model="title_ru"
                  
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  :placeholder="$t('En Brand name')"
                  v-model="title_en"
                  
                />
              </b-tab>
            </b-tabs>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.title_uz.$dirty && !$v.title_uz.required"
              >
                {{$t('Uz Brand name empty.')}}
            </small>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.title_ru.$dirty && !$v.title_ru.required"
              >
                {{$t('Ru Brand name empty.')}}
            </small>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.title_en.$dirty && !$v.title_en.required"
              >
                {{$t('En Brand name empty.')}}
              </small>
          </b-form-group>
        </b-col>

        <!-- code -->
        <b-col lg="12">
          <b-form-group :label="$t('Code*')"  label-for="drugCode" label-cols-md="4">
            <b-form-input
              id="drugCode"
              
              :placeholder="$t('Code*')"
              v-model="code"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.code.$dirty && !$v.code.required"
              >
                {{$t('Enter a code.')}}
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
            @click="resetAll"
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
    code: {
      required,
    },
  },
  data() {
    return {
      brand: {},
      category: {},
      title_uz:'',
      title_ru: '',
      title_en: '',
      code:null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    resetAll(){
      this.title_uz="";
      this.title_ru="";
      this.title_en="";
      this.code=null;
    },
    async getData() {
      await axios
        .get(`${this.$baseUrl}/product/brand/${this.$route.params.id}/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.brand = res.data;
          this.title_uz = this.brand.title_uz;
          this.title_ru = this.brand.title_ru;
          this.title_en = this.brand.title_en;

          this.code = this.brand?.code;
        });
    },
    async changeBrand() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      const form = new FormData();
      form.append("title", this.title_ru);
      form.append("title_uz", this.title_uz);
      form.append("title_ru", this.title_ru);
      form.append("title_en", this.title_en);
      form.append("code", this.code);
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .patch(
          `${this.$baseUrl}/product/brand/${this.$route.params.id}/`,
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
            this.$router.push('/product/drug-brands')
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
