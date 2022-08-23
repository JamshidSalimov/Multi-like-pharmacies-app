<template>
  <b-form @submit.prevent="changeCategory">
    <b-card>
      <b-row>
        <!-- Category Name -->
        <b-col cols="12">
          <b-form-group :label="$t('Category name')" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  :placeholder="$t('Uz Category name')"
                  v-model="title_uz"
                />
              </b-tab>
              
              <b-tab title="Ру">
                <b-form-input
                  :placeholder="$t('Ru Category name')"
                  v-model="title_ru"
                />
              </b-tab>
              
              <b-tab title="En">
                <b-form-input
                  :placeholder="$t('En Category name')"
                  v-model="title_en"
                />
              </b-tab>
            </b-tabs>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.title_uz.$dirty && !$v.title_uz.required"
              >
                {{$t('Uz Category name is empty.')}}
            </small>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.title_ru.$dirty && !$v.title_ru.required"
              >
                {{$t('Ru Category name is empty.')}}
            </small>
            <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.title_en.$dirty && !$v.title_en.required"
              >
                {{$t('En Category name is empty.')}}
              </small>
          </b-form-group>
        </b-col>
        <!-- code -->
        <b-col lg="12">
          <b-form-group :label="$t('Code*')" label-for="drugCode" label-cols-md="4">
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
      <hr />
      <!-- Category image -->
      <b-form-group :label="$t('Category image')" label-cols-md="4">
        <b-form-file
          :placeholder="$t('Choose a file or drop it here...')"
          :drop-placeholder="$t('Drop file here...')"
          @change="onFileChange"
          accept="image/png, image/gif, image/jpeg"
          v-model="mainImage"
        />
        <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.mainImage.$dirty && !$v.mainImage.required"
              >
                {{$t('Choose a file or drop')}}
        </small>
        <br>
        <img
          class="mt-1"
          v-if="mainImageUrl"
          :src="mainImageUrl"
          data-fancybox-image="mainImageUrl"
          alt="Category image"
          style="height: 150px; object-fit: contain"
        />
        <img
          style="height: 150px; object-fit: contain"
          v-else
          src="@/assets/img/noimage.png"
          alt="noimage"
        />
      </b-form-group>
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
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import "@fancyapps/ui/dist/panzoom.controls.css";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { required } from "vuelidate/lib/validators";

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
    mainImage:{
      required,
    }
    // otdelId: {
    //   required,
    // },
    // skladId: {
    //   required,
    // },
  },
  data() {
    return {
      category: {},
      title_uz:'',
      title_ru: '',
      title_en: '',
      code:null,
      mainImage: null,
      mainImageUrl: null,
      imageFile: null,
      imageFileName: null,
      imageFileType: null,
      changed: false,
    };
  },
  mounted() {
    Fancybox.bind("[data-fancybox-image]", {
      Image: {
        zoom: true,
      },
    });
  },
  methods: {
    resetAll(){
      this.mainImageUrl= null;
      this.imageFile= null;
      this.title_uz="";
      this.title_ru="";
      this.title_en="";
      this.code=null;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      
      this.mainImageUrl = URL.createObjectURL(file);
      this.imageFile = file;
      this.imageFileName = file.name.split(".")[0];
      this.changed = true;
    },
    async changeCategory() {
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }
      const form = new FormData();
      form.append("name", this.title_ru);
      form.append("name_uz", this.title_uz);
      form.append("name_ru", this.title_ru);
      form.append("name_en", this.title_en);

      form.append("code", this.code);
      
      if (this.changed) {
        form.append("image", this.imageFile);
        this.changed = false;
      }

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .post(`${this.$baseUrl}/product/category/`, form, params)
        .then(() => {
          this.$router.push({name: "drug-categories"});

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Yangi kategorya yaratildi!",
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
