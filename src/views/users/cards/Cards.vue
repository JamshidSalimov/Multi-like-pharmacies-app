<template>
  <div class="orders">
    <b-row>
      <!-- <router-link :to="{name: 'cards-view'}">
            <b-button variant="success" class="btn-icon">
              <feather-icon icon="EyeIcon" />
            </b-button>
      </router-link> -->
      <b-col cols="12">
        <b-table
          show-empty
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="0"
          striped
          responsive
          :sticky-header="true"
        >
        <template #cell(actions)="data">
          <router-link :to="{name: 'cards-view', params: {id: data.item.id}}">
            <b-button variant="success" class="btn-icon">
              <feather-icon icon="EyeIcon" />
            </b-button>
          </router-link>
        </template>
        </b-table>
        <b-overlay :show="busy" no-wrap></b-overlay>
      </b-col>
      <b-col cols="12" v-if="!busy">
        <b-pagination
          v-model="currentPage"
          :per-page="perPage"
          align="center"
          size="sm"
          class="my-0"
          :total-rows="totalItems"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "@axios";
import {
  BTable,
  BRow,
  BCol,
  BPagination,
  BImg,
  BButton,
  BOverlay,
  BBadge,
} from "bootstrap-vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    ToastificationContent,
    BTable,
    BRow,
    BCol,
    BPagination,
    BImg,
    BButton,
    BOverlay,
    BBadge,
  },
  data() {
    return {
      items: [],
      busy: true,
      fields: [
        {
          key: "id",
          label: "id",
        },
        {
          key: "card_number",
          label: "card_number",
        },
        {
          key: "type",
          label: "type",
        },
        {
          key: "cvv",
          label: "cvv",
        },
        {
          key: "expire_at",
          label: "expire_at",
        },
        {
          key: "expire_at",
          label: "expire_at",
          formatter: (value) =>
            value != null
              ? value.slice(0, 10) + " " + value.slice(11, 19)
              : "- : - : -",
        },
      ],
      currentPage: 1,
      perPage: 12,
      totalItems: 0,
    };
  },
  watch: {
    currentPage: {
      handler() {
        this.fetchData();
      },
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    formatTo(item) {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    Status(key) {
      switch (key) {
        case "Paid":
          return "success";
        case "Hold":
          return "warning";

        default:
          break;
      }
    },
    DeliveryStatus(key) {
      switch (key) {
        case "Received":
          return "primary";
        case "In_collect":
          return "info";
        case "Being_Delivered":
          return "success";

        default:
          break;
      }
    },
    async fetchData() {
      const params = {
        params: {
          limit: this.perPage,
          offset: this.perPage * (this.currentPage - 1),
        },
      };

      this.items = await axios
        .get(`${this.$baseUrl}/product/card-dashboard/`, params)
        .then((res) => {
          this.totalItems = res.data.count;
          this.busy = false;
          return res.data.results;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.orders {
  .b-table-sticky-header {
    max-height: 70vh;
  }
}
</style>
