<template>
  <section class="grid-view wishlist-items">
    <b-card
      v-for="product in products"
      :key="product.drug.id"
      class="ecommerce-card"
      no-body
    >
      <div class="item-img text-center w-100">
        <b-link
          :to="{
            name: 'drug-edit',
            params: {id: product.drug.id},
          }"
          class="d-flex justify-content-center align-items-center w-100 h-100"
        >
          <b-img
            :alt="`${product.drug.name}-${product.drug.id}`"
            class=""
            style="max-height: 150px; width: 100%; object-fit: contain"
            v-if="product.drug.image"
            :src="'http://api.multilek.uz' + product.drug.image"
          />
        </b-link>
      </div>

      <!-- Product Details -->
      <b-card-body class="d-flex justify-content-end flex-column">
        <div class="item-wrapper">
          <div>
            <h6 class="item-price">{{ product.drug.default_price }} so'm</h6>
          </div>
        </div>
        <h6 class="item-name">
          <b-link
            class="text-body"
            :to="{
              name: 'drug-edit',
              params: {id: product.drug.id},
            }"
          >
            {{ product.drug.name }}
          </b-link>
          <b-card-text class="item-title mt-1">
            {{$t('Sold count')}}
            <span class="ml-25">{{ product.sold_count }}</span>
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
