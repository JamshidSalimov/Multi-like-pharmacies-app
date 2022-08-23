<template>
  <div class="ecommerce-application">
    <b-form @submit.prevent="changeAddress">
      <b-card>
        <b-row>
          <!-- Phone number -->
          <b-col cols="12">
            <b-form-group :label="$t('Phone number')" label-cols-md="4">
              <b-form-input
                readonly
                type="tel"
                :placeholder="$t('Phone number')"
                v-model="user.phone_number"
              />
            </b-form-group>
          </b-col>

          <!-- User Name -->
          <b-col cols="12">
            <b-form-group :label="$t('Name')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('First name')"
                v-model="user.first_name"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- User last name -->
          <b-col cols="12">
            <b-form-group :label="$t('Last name')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Last name')"
                v-model="user.last_name"
                readonly
              />
            </b-form-group>
          </b-col>
          
          <!-- Address -->
          <b-col cols="12">
            <b-form-group :label="$t('Address')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Address')"
                v-model="user.address"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- User gender -->
          <b-col cols="12">
            <b-form-group :label="$t('Gender')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Gender')"
                :value="Gender(user.gender)"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Location -->
          <b-col cols="12">
            <b-form-group :label="$t('Location')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Location')"
                v-model="user.location"
                readonly
              />
            </b-form-group>
          </b-col>
          
          <!-- ill_history -->
          <b-col cols="12">
            <b-form-group :label="$t('Ill history')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Ill history')"
                v-model="user.ill_history"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- finance_sum -->
          <b-col cols="12">
            <b-form-group :label="$t('Finance sum')" label-cols-md="4">
              <b-form-input
                :placeholder="$t('Finance sum')"
                v-model="user.finance_sum"
                readonly
              />
            </b-form-group>
          </b-col>
          
          <!-- is_active -->
          <b-col cols="12">
            <b-form-group :label="$t('Is active')" label-cols-md="4">
              <b-form-input
                placeholder="is_active"
                v-model="user.is_active"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- is_superuser -->
          <b-col cols="12">
            <b-form-group :label="$t('Is superuser')" label-cols-md="4">
              <b-form-input
                placeholder="is_superuser"
                v-model="user.is_superuser"
                readonly
              />
            </b-form-group>
          </b-col>
          
          <!-- is_staff -->
          <b-col cols="12">
            <b-form-group :label="$t('Is staff')" label-cols-md="4">
              <b-form-input
                placeholder="is_staff"
                v-model="user.is_staff"
                readonly
              />
            </b-form-group>
          </b-col>
          
        </b-row>
      </b-card>
    </b-form>

    <h2 class="my-2">
      Most used drugs:
    </h2>
    <e-commerce-wishlist :products="user.most_user_drugs" />
  </div>
</template>

<script>
import axios from "axios";
import ECommerceWishlist from "./ECommerceWishlist.vue";
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
    ECommerceWishlist,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      user: {
        address: "",
        birthday: "",
        finance_sum: null,
        first_name: "",
        full_name: "",
        gender: null,
        ill_history: "",
        is_active: null,
        is_staff: null,
        is_superuser: null,
        last_name: "",
        location: "",
        most_user_drugs: [],
        phone_number: "",
      },
    };
  },
  mounted() {
    this.getData();
    console.log(this.getData())
  },
  methods: {
    Gender(value) {
      switch (value) {
        case "M":
          return "Male";
        case "F":
          return "Female";

        default:
          return "";
      }
    },
    async getData() {
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .get(`${this.$baseUrl}/user/profile/${this.$route.params.id}/`, params)
        .then((res) => {
          console.log('res Data',res.data)
          this.user = res.data;
        });
    },
  },
};
</script>
