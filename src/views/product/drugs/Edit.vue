<template>
  <b-form @submit.stop.prevent="changeDrugItem">
    <div>
      <b-card>
        <b-row>
          <!-- Category -->
          <b-col cols="12">
            <b-form-group
              :label="$t('Category')"
              label-for="h-catogory"
              label-cols-md="4"
            >
              <v-select
                id="h-catogory"
                :value="selectedCategory"
                label="name"
                :options="category"
                :placeholder="$t('Category')"
                @input="setCategory"
              >
                <template #selected-option="{ name }">
                  {{ name }}
                </template>
              </v-select>
              <br>
              <small
                  class="text-danger"
                  style="margin-left: 5px; font-size:14px; margin-top:20px"
                  v-if="$v.selectedCategory.$dirty && !$v.selectedCategory.required"
                >
                  {{$t('Select Category')}}
              </small>
            </b-form-group>
          </b-col>

          <!-- Type -->
          <b-col cols="12">
            <b-form-group :label="$t('Type')"  label-for="h-type" label-cols-md="4">
              <v-select
                id="h-type"
                :value="selectedType"
                label="title"
                :options="type"
                :placeholder="$t('Type')"
                @input="setType"
              >
                <template #selected-option="{ title }">
                  {{ title }}
                </template>
              </v-select>
              <br>
              <small
                  class="text-danger"
                  style="margin-left: 5px; font-size:14px; margin-top:20px"
                  v-if="$v.selectedType.$dirty && !$v.selectedType.required"
                >
                  {{$t('Select Type')}}
              </small>
            </b-form-group>
          </b-col>

          <!-- Brand -->
          <b-col cols="12">
            <b-form-group :label="$t('Brand')" label-for="h-brand" label-cols-md="4"
            >
              <v-select
                id="h-brand"
                :value="selectedBrand"
                label="title"
                :options="brand"
                :placeholder="$t('Brand')"
                @input="setBrand"
              >
                <template #selected-option="{ title }">
                  {{ title }}
                </template>
              </v-select>
              <br>
              <small
                class="text-danger"
                style="margin-left: 5px; font-size:14px; margin-top:20px"
                v-if="$v.selectedBrand.$dirty && !$v.selectedBrand.required"
              >
                {{$t('Select Brand')}}
            </small>
            </b-form-group>
          </b-col>

          <!-- Name -->
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
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.name_uz.$dirty && !$v.name_uz.required"
              >
                {{$t('Uz Name empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.name_ru.$dirty && !$v.name_ru.required"
                >
                  {{$t('Ru Name empty')}}
              </small>
              <small
                  class="text-danger mt-0"
                  style="margin-left: 5px; font-size:14px;"
                  v-if="$v.name_en.$dirty && !$v.name_en.required"
                >
                  {{$t('En Name empty')}}
              </small>
            </b-form-group>
          </b-col>

          <!-- Drug price -->
          <b-col lg="12">
            <b-form-group
              :label="$t('Drug price')"
              label-for="drugPrice"
              label-cols-md="4"
            >
              <b-form-input
                id="drugPrice"
                :placeholder="$t('Drug price')"
                v-model="product_price"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.product_price.$dirty && !$v.product_price.required"
              >
                {{$t('Product price empty')}}
              </small>
            </b-form-group>
          </b-col>

          <!-- Amount in store -->
          <b-col lg="12">
            <b-form-group
              :label="$t('Amount in store')"
              label-for="drugCount"
              label-cols-md="4"
            >
              <b-form-input
                :type="'number'"
                id="drugCount"
                :placeholder="$t('Amount in store')"
                v-model="product_amount_in_store"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.product_amount_in_store.$dirty && !$v.product_amount_in_store.required"
              >
                {{$t('Amount in store empty')}}
            </small>
            </b-form-group>
          </b-col>

          <!-- code -->
          <b-col lg="12">
            <b-form-group :label="$t('Code*')"  label-for="drugCode" label-cols-md="4">
              <b-form-input
                id="drugCode"
                :placeholder="$t('Code*')"
                v-model="product_code"
              />
              <small
                class="text-danger mt-0"
                style="margin-left: 5px; font-size:14px;"
                v-if="$v.product_code.$dirty && !$v.product_code.required"
              >
                {{$t('Enter a code.')}}
            </small>
            </b-form-group>
          </b-col>

          <!-- Available -->
          <b-col cols="12">
            <b-form-group :label="$t('Available')" label-cols-md="4">
              <b-form-checkbox
                v-model="product.available"
                class="custom-control-primary"
              >
                {{$t('Available')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <!-- Active -->
          <b-col cols="12">
            <b-form-group :label="$t('Active')" label-cols-md="4">
              <b-form-checkbox
                v-model="product.active"
                class="custom-control-primary"
              >
                {{$t('Active')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <!-- Recommended -->
          <b-col cols="12">
            <b-form-group :label="$t('Recommended')"  label-cols-md="4">
              <b-form-checkbox
                v-model="product.recommended"
                class="custom-control-primary"
              >
                {{$t('Recommended')}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <!-- Information -->
      <b-card>
        <app-collapse>
          <app-collapse-item :title="$t('Information')">
            <b-tabs pills align="left" v-if="product">
              <b-tab title="Uz" active>
                <quill-editor v-model="content.uz" :options="snowOption" />
              </b-tab>
              <b-tab title="Ру">
                <quill-editor v-model="content.ru" :options="snowOption" />
              </b-tab>
              <b-tab title="En">
                <quill-editor v-model="content.en" :options="snowOption" />
              </b-tab>
            </b-tabs>
          </app-collapse-item>
        </app-collapse>
      </b-card>

      <!-- Main image -->
      <b-card>
        <b-form-group :label="$t('Main image*')"  label-cols-md="4">
          <b-form-file
            v-model="mainImage"
            :placeholder="$t('Choose a file or drop')"
            :drop-placeholder="$t('Drop file here...')"
            @change="onFileChange"
            accept="image/png, image/gif, image/jpeg"
          />
          <img
            class="mt-1"
            v-if="mainImageUrl"
            :src="mainImageUrl"
            data-fancybox-image="mainImageUrl"
            alt="main Image"
            style="height: 150px; object-fit: contain"
          />
        </b-form-group>
      </b-card>

      <!-- Image Galley -->
      <b-card>
        <b-form-group :label="$t('Image gallery')"  label-cols-md="4">
          <b-form-file
            v-model="imageGallery"
            multiple
            :placeholder="$t('Choose a file or drop')"
            :drop-placeholder="$t('Drop file here...')"
            @change="onImageGalleryChange"
            accept="image/png, image/gif, image/jpeg"
          />
          
          <swiper
            class="mt-1 swiper-multiple swiper-centered-slides d-flex align-items-center"
            :options="swiperOptions"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          >
            <swiper-slide v-for="image in imageGalleryUrls" :key="image.id">
              <b-img
                style="height: 150px; object-fit: contain"
                :src="image.image"
                data-fancybox="image.image"
                fluid
              />
            </swiper-slide>

            <div slot="pagination" class="swiper-pagination" />
            <!-- Add Arrows -->
            <div slot="button-next" class="swiper-button-next" />
            <div slot="button-prev" class="swiper-button-prev" />
          </swiper>
        </b-form-group>
      </b-card>

      <!-- Sumbit -->
      <b-card>
        <b-row>
          <!-- submit and reset -->
          <b-col offset-md="4">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
            >
              {{$t('Submit')}}
            </b-button>
            <!-- <button @click="reset_all">
              click me
            </button> -->
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
              type="reset"
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
import {Fancybox} from "@fancyapps/ui";
import { required } from "vuelidate/lib/validators";
import "@fancyapps/ui/dist/fancybox.css";
import "@fancyapps/ui/dist/panzoom.controls.css";
import {quillEditor} from "vue-quill-editor";
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
  BOverlay,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import {heightTransition} from "@core/mixins/ui/transition";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
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
    ToastificationContent,
    BImg,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  validations:{
    selectedCategory: {
      required,
    },
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
    product_price:{
      required,
    },
    product_amount_in_store:{
      required
    },
    product_code:{
      required,
    },
   
  },
  data() {
    return {
      busy: true,
      swiperOptions: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      snowOption: {
        theme: "snow",
      },
      product_price:"",
      product_amount_in_store:"",
      product_code:null,

      product: {
        recommended: false,
        active: false,
        available: false,
      },

      category: [],
      selectedCategory: {},

      type: [],
      selectedType: {},

      brand: [],
      selectedBrand: {},

      content: {
        uz: "",
        ru: "",
        en: "",
      },
      name_uz:'',
      name_ru:"",
      name_en:"",

      imageGallery: null,
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
    reset_all(){
      this.selectedCategory={};

      this.selectedType={};

      this.selectedBrand={};

      this.mainImageUrl= null;

      this.mainImage= null;

      this.imageGallery= null;

      this.imageGalleryUrls= null;

      // console.log("this.imageGalleryArr",this.imageGalleryArr)

      this.imageGalleryArr= [];
      // console.log("this.imageGalleryArr",this.imageGalleryArr)

      this.product_price = "";
      this.product_amount_in_store = "";
      this.product_code=null;

      this.name_uz="";
      this.name_ru="";
      this.name_en="";

      this.content.uz='';
      this.content.ru='';
      this.content.en='';
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.mainImageUrl = URL.createObjectURL(file);
    },
    onImageGalleryChange(e) {
      this.imageGalleryUrls = [];
      this.imageGalleryArr = e.target.files;
      for (let index = 0; index < e.target.files.length; index++) {
        let file = URL.createObjectURL(e.target.files[index]);
        this.imageGalleryUrls[index] = {
          image: file,
        };
      }
    },

    async getData() {
      await axios
        .get(`${this.$baseUrl}/product/${this.$route.params.id}/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.product = res.data;
          console.log("Jamshid Qaraaaaaaaaaaaaaa",this.product)
          this.content.uz = this.product.info_uz;
          this.content.ru = this.product.info_ru;
          this.content.en = this.product.info_en;

          this.name_uz = this.product.name_uz;
          this.name_ru = this.product.name_ru;
          this.name_en = this.product.name_en;

          this.mainImageUrl = this.product?.image;
          this.imageGalleryUrls = this.product.images;
          this.busy = false;
          this.product_price=this.product.price;
          this.product_amount_in_store=this.product.amount_in_store;
        });

      await axios
        .get(`${this.$baseUrl}/product/category/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.category = res.data.results;
        });

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

      this.selectedCategory = this.category.find(
        (item) => item.id === this.product.category
      );
      this.selectedType = this.type.find(
        (item) => item.id === this.product.type
      );
      this.selectedBrand = this.brand.find(
        (item) => item.id === this.product.brand
      );
    },

    setCategory(item) {
      this.selectedCategory = item;
    },
    setType(item) {
      this.selectedType = item;
    },
    setBrand(item) {
      this.selectedBrand = item;
    },
    async changeDrugItem() {
      // debugger;
      if (this.$v.$invalid){
             this.$v.$touch();
             return false;
      }

      const form = new FormData();
      if (this.selectedCategory?.id) {
        form.append("category", this.selectedCategory?.id);
      }
      if (this.selectedBrand?.id) {
        form.append("brand", this.selectedBrand?.id);
      }
      if (this.selectedType?.id) {
        form.append("type", this.selectedType?.id);
      }

      form.append("name", this.name_ru);
      form.append("name_en", this.name_en);
      form.append("name_ru", this.name_ru);
      form.append("name_uz", this.name_uz);

      form.append("price", this.product_price);
      form.append("amount_in_store", this.product_amount_in_store);
      form.append("code", this.product_code);
      form.append("available", this.product?.available);
      form.append("recommended", this.product?.recommended);
      form.append("active", this.product?.active);


      form.append("info", this.content?.ru);
      form.append("info_en", this.content?.en);
      form.append("info_ru", this.content?.ru);
      form.append("info_uz", this.content?.uz);

      if (this.mainImage) {
        form.append("image", this.mainImage);
      }

      if (this.imageGalleryArr.length > 0) {
        for (let index = 0; index < this.imageGalleryArr.length; index++) {
          let file = this.imageGalleryArr[index];
          form.append("images", file);
        }
      }

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // console.log(form);
      await axios
        .patch(
          `${this.$baseUrl}/product/${this.$route.params.id}/`,
          form,
          params
        )
        .then((res) => {
          if (res) {
            // this.getData();

            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: "Muvaffaqiyatli yangilandi!",
                icon: "CheckCircleIcon",
                variant: "success",
              },
            });
            this.$router.push({name: "drugs"});
          }
        })
        .catch((err) => {
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
  }
}
</style>
