<template>
  <b-form @submit.prevent="changeCourier">
    <b-card>
      <b-row>
        <!-- Courier Name -->
        <b-col cols="12">
          <b-form-group :label="$t('Courier name')" label-cols-md="4">
            <b-form-input
              :placeholder="$t('Courier name')"
              v-model="name"
            />
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.name.$dirty && !$v.name.required"
              >
                {{$t('Courier empty')}}
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
    name: {
      required,
    },
  },
  data() {
    return {
      category: {},
      name: "",
    };
  },
  methods: {
    reset_all(){
        this.name="";
    },
    async changeCourier() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      const form = new FormData();
      form.append("name", this.name);

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .post(`${this.$baseUrl}/dashboard/courier-dashboard/`, form, params)
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Yangi dori turi yaratildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
          this.$router.push({name: "courier"});
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
