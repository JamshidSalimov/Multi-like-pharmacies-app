<template>
  <section class="grid-view wishlist-items">
    <b-card
      v-for="product in products"
      :key="product.id"
      class="ecommerce-card"
      no-body
    >
      <div class="item-img text-center w-100">
        <b-link
          class="d-flex justify-content-center align-items-center w-100 h-100"
        >
          <b-img
            :alt="`${product.dose.title}-${product.id}`"
            class=""
            style="max-height: 150px; width: 100%; object-fit: contain"
            v-if="product.dose.image"
            :src="product.dose.image"
          />
        </b-link>
      </div>

      <!-- Product Details -->
      <b-card-body class="d-flex justify-content-end flex-column">
        <div class="item-wrapper">
          <div>
            <h6 class="item-price">{{ product.dose.price }} {{$t('som')}}</h6>
          </div>
        </div>
        <h6 class="item-name">
          <b-link class="text-body">
            {{ product.dose.title }}
          </b-link>
          <b-card-text class="item-title mt-1">
            {{$t('Sold count')}}
            <span class="ml-25">{{ product.amount }}</span>
          </b-card-text>
        </h6>
      </b-card-body>
    </b-card>
  </section>
</template>

<script>
import {BCard, BCardBody, BImg, BCardText, BLink, BButton} from "bootstrap-vue";
export default {
  components: {
    BCard,
    BCardBody,
    BImg,
    BCardText,
    BLink,
    BButton,
  },
  props: {
    products: {
      type: Array,
    },
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style>
