<template>
  <b-form @submit.prevent="changeFaq">
    <div>
      <b-card>
        <b-row>

          <!-- user -->
          <b-col cols="12">
            <b-form-group :label="$t('User')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('User')"
                v-model="diagnos.user"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- created_at -->
          <b-col cols="12">
            <b-form-group :label="$t('Created at')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Created at')"
                v-model="diagnos.created_at"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- updated_at -->
          <b-col cols="12">
            <b-form-group :label="$t('Updated at')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Updated at')"
                v-model="diagnos.updated_at"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Title -->
          <b-col cols="12">
            <b-form-group :label="$t('Title')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Title')"
                v-model="diagnos.title"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Info -->
          <b-col cols="12">
            <b-form-group :label="$t('Information')" label-cols-md="4" class="mt-2">
              <quill-editor
                v-model="diagnos.info"
                :options="snowOption"
                disabled
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
      diagnos: {},
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
          `${this.$baseUrl}/dashboard/perception-dashboard/${this.$route.params.id}/`,
          params
        )
        .then((res) => {
          this.diagnos = res.data;
          this.busy = false;
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
