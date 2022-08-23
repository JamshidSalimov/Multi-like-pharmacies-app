<template>
  <b-form @submit.prevent="changeFaq">
    <div>
      <b-card>
        <b-row>
          <!-- user -->
          <b-col cols="12">
            <b-form-group :label="$t('Card number')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Card number')"
                v-model="cards.card_number"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- created_at -->
          <b-col cols="12">
            <b-form-group :label="$t('Cvv')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Cvv')" 
                v-model="cards.cvv"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- updated_at -->
          <b-col cols="12">
            <b-form-group :label="$t('Expire at')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Expire at')"
                v-model="cards.expire_at"
                readonly
              />
            </b-form-group>
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
    quillEditor,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      busy: true,
      cards: {},
      snowOption: {
        theme: "snow",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };

      await axios
        .get(
          `${this.$baseUrl}/product/card-dashboard/${this.$route.params.id}/`,
          params
        )
        .then((res) => {
          this.cards = res.data;
          this.busy = false;
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
