<template>
  <b-form @submit.prevent>
    <b-card>
      <b-row>
        <!-- Category -->
        <b-col cols="12">
          <b-form-group
            label="Category"
            label-for="h-catogory"
            label-cols-md="4"
          >
            <v-select
              id="h-catogory"
              :value="selectedCategory"
              label="name"
              :options="category"
              :required="!selectedCategory"
              placeholder="Category"
              @input="setCategory"
            >
              <template #selected-option="{ name }">
                {{ name }}
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <!-- Type -->
        <b-col cols="12">
          <b-form-group label="Type" label-for="h-type" label-cols-md="4">
            <v-select
              id="h-type"
              :value="selectedType"
              label="title"
              :options="type"
              :required="!selectedType"
              placeholder="Type"
              @input="setType"
            >
              <template #selected-option="{ title }">
                {{ title }}
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <!-- Brand -->
        <b-col cols="12">
          <b-form-group label="Brand" label-for="h-brand" label-cols-md="4">
            <v-select
              id="h-brand"
              :value="selectedBrand"
              label="title"
              :options="brand"
              :required="!selectedBrand"
              placeholder="Brand"
              @input="setBrand"
            >
              <template #selected-option="{ title }">
                {{ title }}
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <!-- Title -->
        <b-col cols="12">
          <b-form-group label="Title" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input placeholder="Uz Title" v-model="title.uz" />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input placeholder="Ru Title" v-model="title.ru" />
              </b-tab>
              <b-tab title="En">
                <b-form-input placeholder="En Title" v-model="title.en" />
              </b-tab>
            </b-tabs>
          </b-form-group>
        </b-col>

        <!-- Available -->
        <b-col cols="12">
          <b-form-group label="Available" label-cols-md="4">
            <b-form-checkbox v-model="available" class="custom-control-primary">
              Available
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <!-- Information -->
    <b-card>
      <app-collapse>
        <app-collapse-item title="Information">
          <b-tabs pills align="left" v-if="product">
            <b-tab title="Uz" active>
              <quill-editor v-model="content.contentUz" :options="snowOption" />
            </b-tab>
            <b-tab title="Ру">
              <quill-editor v-model="content.contentRu" :options="snowOption" />
            </b-tab>
            <b-tab title="En">
              <quill-editor v-model="content.contentEn" :options="snowOption" />
            </b-tab>
          </b-tabs>
        </app-collapse-item>
      </app-collapse>
    </b-card>

    <!-- Main image -->
    <b-card>
      <b-form-group label="Main image" label-cols-md="4">
        <b-form-file
          v-model="mainImage"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
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

    <!-- Doses -->
    <b-card>
      <b-form-group
        label="Doses"
        ref="form"
        :style="{height: trHeight}"
        class="repeater-form"
        @submit.prevent="repeateAgain"
      >
        <b-row
          v-for="(item, index) in items"
          :id="item.id"
          :key="item.id"
          ref="row"
        >
          <b-col lg="4" class="mb-50">
            <b-form-group label="Drug price" label-for="drugPrice">
              <b-form-input
                :type="'number'"
                id="drugPrice"
                placeholder="Drug price"
                :value="item.price"
              />
            </b-form-group>
            <b-form-group label="Drug count" label-for="drugCount">
              <b-form-input
                :type="'number'"
                id="drugCount"
                placeholder="Drug count"
              />
            </b-form-group>
          </b-col>
          <b-col lg="8" class="mb-50">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-group label="Drug title" label-for="titleUz">
                  <b-form-input
                    id="titleUz"
                    placeholder="Drug title uz"
                    :value="item.title"
                  />
                </b-form-group>
                <label for="drugInfoUz">Drug info</label>
                <b-form-textarea
                  id="drugInfoUz"
                  placeholder="Drug info uz"
                  rows="3"
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-group label="Drug title" label-for="titleRu">
                  <b-form-input id="titleRu" placeholder="Drug title ru" />
                </b-form-group>
                <label for="drugInfoRu">Drug info</label>
                <b-form-textarea
                  id="drugInfoRu"
                  placeholder="Drug info ru"
                  rows="3"
                />
              </b-tab>
              <b-tab title="En">
                <b-form-group label="Drug title" label-for="titleEn">
                  <b-form-input id="titleEn" placeholder="Drug title en" />
                </b-form-group>
                <label for="drugInfoEn">Drug info</label>
                <b-form-textarea
                  id="drugInfoEn"
                  placeholder="Drug info en"
                  rows="3"
                />
              </b-tab>
            </b-tabs>
          </b-col>

          <!-- Remove Button -->
          <b-col lg="12" md="12" class="mb-50 d-flex justify-content-end">
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-danger"
              class="mt-0 mt-md-2"
              @click="removeItem(index)"
            >
              <feather-icon icon="XIcon" class="mr-25" />
              <span>Delete</span>
            </b-button>
          </b-col>
          <b-col cols="12">
            <hr />
          </b-col>
        </b-row>
      </b-form-group>

      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        @click="repeateAgain"
      >
        <feather-icon icon="PlusIcon" class="mr-25" />
        <span>Add New</span>
      </b-button>
    </b-card>

    <!-- Image Galley -->
    <b-card>
      <b-form-group label="Image gallery" label-cols-md="4">
        <b-form-file
          v-model="imageGallery"
          multiple
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
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
import {Fancybox} from "@fancyapps/ui";
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
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import {heightTransition} from "@core/mixins/ui/transition";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
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
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
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
      product: {},
      category: [],
      selectedCategory: {},
      type: [],
      selectedType: [],
      brand: [],
      selectedBrand: [],
      content: {
        contentUz: "",
        contentRu: "",
        contentEn: "",
      },
      title: {
        uz: "",
        ru: "",
        en: "",
      },
      imageGallery: null,
      imageGalleryUrls: null,
      mainImage: null,
      mainImageUrl: null,
      available: null,
      items: [
        {
          id: 1,
          prevHeight: 0,
        },
      ],
      nextTodoId: 2,
    };
  },
  created() {
    window.addEventListener("resize", this.initTrHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },
  mounted() {
    this.getData();
    this.initTrHeight();
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
    repeateAgain() {
      this.items.push({
        id: (this.nextTodoId += this.nextTodoId),
      });

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
      });
    },
    removeItem(index) {
      this.items.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },
    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight);
      });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.mainImageUrl = URL.createObjectURL(file);
    },
    onImageGalleryChange(e) {
      this.imageGalleryUrls = [];
      for (let index = 0; index < e.target.files.length; index++) {
        let file = URL.createObjectURL(e.target.files[index]);
        this.imageGalleryUrls[index] = {
          image: file,
        };
      }
    },
    async getData() {
      await axios
        .get(`${this.$baseUrl}/product/category/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.category = res.data;
        });

      await axios
        .get(`${this.$baseUrl}/product/type/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.type = res.data;
        });

      await axios
        .get(`${this.$baseUrl}/product/brand/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.brand = res.data;
        });
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
