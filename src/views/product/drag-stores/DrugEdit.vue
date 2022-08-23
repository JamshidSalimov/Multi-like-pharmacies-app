<template>
  <!-- Add Drug for Selected Store -->
  <b-form @submit.prevent="createDrugItem">

    <!-- Drug Name and Description -->
    <b-card>
      <b-row>
        <b-col cols="12">
          <b-form-group :label="$t('Name')" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input :placeholder="$t('Uz Name')" v-model="name_uz" />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input :placeholder="$t('Ru Name')" v-model="name_ru" />
              </b-tab>
              <b-tab title="En">
                <b-form-input :placeholder="$t('En Name')" v-model="name_en" />
              </b-tab>
            </b-tabs>
            <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
              v-if="$v.name_uz.$dirty && !$v.name_uz.required">
              {{ $t('Uz Name empty') }}
            </small>
            <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
              v-if="$v.name_ru.$dirty && !$v.name_ru.required">
              {{ $t('Ru Name empty') }}
            </small>
            <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
              v-if="$v.name_en.$dirty && !$v.name_en.required">
              {{ $t('En Name empty') }}
            </small>
          </b-form-group>
        </b-col>

        <b-col lg="12">
          <b-form-group :label="$t('Description')" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-textarea :placeholder="$t('Uz Description')" v-model="descript_uz">
                </b-form-textarea>
              </b-tab>

              <b-tab title="Ру">
                <b-form-textarea :placeholder="$t('Ru Description')" v-model="descript_ru">
                </b-form-textarea>
              </b-tab>

              <b-tab title="En">
                <b-form-textarea :placeholder="$t('En Description')" v-model="descript_en">
                </b-form-textarea>
              </b-tab>
            </b-tabs>
            <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
              v-if="$v.descript_uz.$dirty && !$v.descript_uz.required">
              {{ $t('Uz description empty.') }}
            </small>
            <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
              v-if="$v.descript_ru.$dirty && !$v.descript_ru.required">
              {{ $t('Ru description empty.') }}
            </small>
            <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
              v-if="$v.descript_en.$dirty && !$v.descript_en.required">
              {{ $t('En description empty.') }}
            </small>
          </b-form-group>
        </b-col>

      </b-row>
    </b-card>

    <b-card>
      <b-row>
        <b-row>
          <!-- Drug Store Name -->
          <b-col cols="12">
            <b-form-group class="m-0" :label="$t('Store Name')" label-for="h-catogory" label-cols-md="4">
              <v-select id="h-catogory" disabled :value="selectedStore" label="name" :options="category">
                <template #selected-option="{ name }">
                  {{ name }}
                </template>
              </v-select>
              <br>
            </b-form-group>
          </b-col>

          <!-- Drug Category -->
          <b-col cols="12">
            <b-form-group class="m-0" :label="$t('Category')" label-for="h-catogory" label-cols-md="4">
              <v-select id="h-catogory" disabled :value="selectedCategory" label="name" :options="category">
                <template #selected-option="{ name }">
                  {{ name }}
                </template>
              </v-select>
              <br>
            </b-form-group>
          </b-col>

          <!-- Type -->
          <b-col cols="12">
            <b-form-group :label="$t('Type')" label-for="h-type" label-cols-md="4" class="m-0">
              <v-select id="h-type" :value="selectedType" label="title" :options="type" :placeholder="$t('Type')"
                @input="setType">
                <template #selected-option="{ title }">
                  {{ title }}
                </template>
              </v-select>
              <br>
              <small class="text-danger" style="margin-left: 5px; font-size:14px; margin-top:20px"
                v-if="$v.selectedType.$dirty && !$v.selectedType.required">
                {{ $t('Select Type') }}
              </small>
            </b-form-group>
          </b-col>

          <!-- Brand -->
          <b-col cols="12">
            <b-form-group :label="$t('Brand')" label-for="h-brand" label-cols-md="4" class="m-0">
              <v-select id="h-brand" :value="selectedBrand" label="title" :options="brand" :placeholder="$t('Brand')"
                @input="setBrand">
                <template #selected-option="{ title }">
                  {{ title }}
                </template>
              </v-select>
              <br>
              <small class="text-danger" style="margin-left: 5px; font-size:14px; margin-top:20px"
                v-if="$v.selectedBrand.$dirty && !$v.selectedBrand.required">
                {{ $t('Select Brand') }}
              </small>
            </b-form-group>
          </b-col>

          <!-- Drug price -->
          <b-col lg="12">
            <b-form-group :label="$t('Drug price')" label-for="drugPrice" label-cols-md="4" class="m-0">
              <b-form-input :type="'number'" id="drugPrice" :placeholder="$t('Drug price')" v-model="product_price" />
              <br>
              <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                v-if="$v.product_price.$dirty && !$v.product_price.required">
                {{ $t('Product price empty') }}
              </small>
            </b-form-group>
          </b-col>

          <!-- code -->
          <b-col lg="12">
            <b-form-group :label="$t('Code*')" label-for="drugCode" label-cols-md="4" class="m-0">
              <b-form-input id="drugCode" :placeholder="$t('Code*')" v-model="product_code" />
              <br>
              <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                v-if="$v.product_code.$dirty && !$v.product_code.required">
                {{ $t('Enter a code.') }}
              </small>
            </b-form-group>
          </b-col>

          <!-- Available -->
          <b-col cols="12">
            <b-form-group :label="$t('Available')" label-cols-md="4">
              <b-form-checkbox v-model="product.available" class="custom-control-primary">
                {{ $t('Available') }}
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <!-- Active -->
          <b-col cols="12">
            <b-form-group :label="$t('Active')" label-cols-md="4">
              <b-form-checkbox v-model="product.active" class="custom-control-primary">
                {{ $t('Active') }}
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <!-- Recommended -->
          <b-col cols="12">
            <b-form-group :label="$t('Recommended')" label-cols-md="4">
              <b-form-checkbox v-model="product.recommended" class="custom-control-primary">
                {{ $t('Recommended') }}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </b-row>
    </b-card>

    <!-- Main image -->
    <b-card>
      <b-form-group :label="$t('Drug img')" label-cols-md="4">
        <b-form-file v-model="mainImage" :placeholder="$t('Choose a file or drop')"
          :drop-placeholder="$t('Drop file here...')" @change="onFileChange"
          accept="image/png, image/gif, image/jpeg" />
        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
          v-if="$v.mainImage.$dirty && !$v.mainImage.required">
          {{ $t('Choose a file or drop') }}
        </small>
        <br>
        <img class="mt-1" v-if="mainImageUrl" :src="mainImageUrl" data-fancybox-image="mainImageUrl" alt="main Image"
          style="height: 150px; object-fit: contain" />
        <img style="height: 150px; object-fit: contain" v-else src="@/assets/img/noimage.png" alt="noimage" />
      </b-form-group>
    </b-card>

    <!-- Sumbit -->
    <b-card>
      <b-row>
        <!-- submit and reset -->
        <b-col offset-md="8">
          <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1">
            {{ $t('Submit') }}
          </b-button>
          <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary"
            @click="reset_all">
            {{ $t('Reset') }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-form>
</template>

<script>
import { Fancybox } from "@fancyapps/ui";
import { required } from "vuelidate/lib/validators";
import "@fancyapps/ui/dist/fancybox.css";
import "@fancyapps/ui/dist/panzoom.controls.css";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { quillEditor } from "vue-quill-editor";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import vSelect from "vue-select";
import axios from "axios";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BCard,
  BTab,
  BTabs,
  BCardText,
  BFormFile,
  BBadge,
  BFormTextarea,
  BImg,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { heightTransition } from "@core/mixins/ui/transition";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    vSelect,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BCard,
    Ripple,
    BTabs,
    BTab,
    quillEditor,
    BCardText,
    AppCollapse,
    AppCollapseItem,
    BFormFile,
    BBadge,
    BFormTextarea,
    heightTransition,
    Swiper,
    SwiperSlide,
    BImg,
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  validations: {

    selectedType: {
      required,
    },
    selectedBrand: {
      required,
    },
    name_uz: {
      required,
    },
    name_ru: {
      required,
    },
    name_en: {
      required,
    },
    product_price: {
      required,
    },

    product_code: {
      required,
    },
    mainImage: {
      required,
    },
    descript_uz: {
      required,
    },
    descript_ru: {
      required,
    },
    descript_en: {
      required,
    },

  },
  data() {
    return {
      descript_uz: "",
      descript_ru: "",
      descript_en: "",

      product_price: "",

      product_code: "",
      product: {
        recommended: false,
        active: false,
        available: false,
      },
      category: [],
      selectedCategory: "",
      selectedStore: "",

      type: [],
      selectedType: {},

      brand: [],
      selectedBrand: {},

      name_uz: '',
      name_ru: "",
      name_en: "",

      imageGalleryUrls: null,
      imageGalleryArr: [],
      mainImage: null,
      mainImageUrl: null,
    };
  },
  mounted() {
    this.getData();
    Fancybox.bind("[data-fancybox]", {
      Image: {
        zoom: true,
      },
    });
    Fancybox.bind("[data-fancybox-image]", {
      Image: {
        zoom: true,
      },
    });
  },
  methods: {
    resetAll() {
      this.descript_en = "";
      this.descript_ru = "";
      this.descript_uz = "";
      this.mainImageUrl = null;
      this.imageFile = null;
      this.imageGallery = null;
      this.imageGalleryUrls = null;
      this.imageGalleryUrls = [];
      this.code = null;
      
      this.selectedType = {};

      this.selectedBrand = {};
      this.name_uz = "";
      this.name_ru = "";
      this.name_en = "";

      this.product_price = "";
      this.product_code = "";

    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.mainImageUrl = URL.createObjectURL(file);
    },

    // Get Some Information for add Drug
    async getData() {
      this.selectedStore = localStorage.store
      this.selectedCategory = localStorage.category

      // await axios
      //   .get(`${this.$baseUrl}/product/${this.$route.params.id}/`, {
      //     headers: {
      //       "Accept-Language": "ru",
      //     },
      //   })
      //   .then((res) => {
      //     this.editDrug = res.data;
      //     console.log("Jamshid Qaraaaaaaaaaaaaaa", this.editDrug)
      //     // Drug Name
      //     this.name_uz = this.editDrug.name_uz;
      //     this.name_ru = this.editDrug.name_ru;
      //     this.name_en = this.editDrug.name_en;
      //     // Description
      //     this.descript_uz = this.editDrug.descript_uz;
      //     this.descript_ru = this.editDrug.descript_ru;
      //     this.descript_en = this.editDrug.descript_en;
      //     // Drug Price
      //     this.product_price = this.editDrug.product_price;
      //     // Drug Code
      //     this.product_code = this.editDrug.product_code;
          
      //     this.mainImageUrl = this.editDrug?.image;

      //     this.imageGalleryUrls = this.editDrug.images;
      //     this.product_price = this.editDrug.price;
      //     this.product_amount_in_store = this.editDrug.amount_in_store;

      //     this.busy = false;

      //   });

      await axios
        .get(`${this.$baseUrl}/product/type/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.type = res.data.results;
        });

      await axios
        .get(`${this.$baseUrl}/product/brand/`, {
          headers: {
            "Accept-Language": "uz",
          },
        })
        .then((res) => {
          this.brand = res.data.results;
        });
    },
    async createDrugItem() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      }

      // const form = new FormData();
      // if (this.selectedCategory?.id) {
      //     form.append("category", this.selectedType?.id);
      // }
      // if (this.selectedBrand?.id) {
      //     form.append("brand", this.selectedBrand?.id);

      // }
      // if (this.selectedType?.id) {
      //     form.append("type", this.selectedType?.id);

      // }

      // form.append("name", this.name_ru);
      // form.append("name_en", this.name_en);
      // form.append("name_ru", this.name_ru);
      // form.append("name_uz", this.name_uz);

      // form.append("price", this.product_price);
      // form.append("amount_in_store", this.product_amount_in_store);
      // form.append("code", this.product_code);
      // form.append("available", this.product?.available);
      // form.append("active", this.product?.active);
      // form.append("recommended", this.product?.recommended);

      // form.append("info", this.content?.contentRu);
      // form.append("info_en", this.content?.contentEn);
      // form.append("info_ru", this.content?.contentRu);
      // form.append("info_uz", this.content?.contentUz);

      // form.append("image", this.mainImage);

      for (let index = 0; index < this.imageGalleryArr.length; index++) {
        let file = this.imageGalleryArr[index];
        form.append("images", file);

      }
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios
        .post(`${this.$baseUrl}/product/`, form, params)
        .then(() => {

          this.$router.push({ name: "drugs" });

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Yangi dori yaratildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
        })
        .catch((err) => {
          console.log('bu yrga keldi')
          const errors = Object.values(err.response.data);
          console.log(errors);
          for (let index = 0; index < errors.length; index++) {
            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: "Xato ketdi! - " + errors[index],
                icon: "CheckCircleIcon",
                variant: "danger",
              },
            });
          }
        });
    },

    setType(item) {
      this.selectedType = item;
    },
    setBrand(item) {
      this.selectedBrand = item;
    },
    reset_all() {
      console.log('salom dunyo')

      this.selectedType = {};

      this.selectedBrand = {};

      this.imageGalleryUrls = [];

      this.mainImageUrl = null;

      this.content.contentUz = '';
      this.content.contentRu = '';
      this.content.contentEn = '';
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/quill.scss";

.swiper-centered-slides {
  .swiper-wrapper {
    align-items: center !important;
    display: flex !important;
    text-align: center;
  }
}
</style>
