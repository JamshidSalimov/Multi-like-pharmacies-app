<template>
  <b-row>
    <b-col cols="12">
      <b-table
        show-empty
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="0"
        striped
        responsive
      >
        <template #cell(name)="data">
          <div>
            {{ data.item.name }}
          </div>
        </template>

        <template #cell(default_price)="data">
          {{ data.item.default_price }} so'm
        </template>

        <template #cell(image)="data">
          <b-img :src="data.value" width="50" height="50" fluid />
        </template>

        <template #cell(actions)="data">
          <router-link :to="{name: 'diagnos-view', params: {id: data.item.id}}">
            <b-button variant="success" class="btn-icon">
              <feather-icon icon="EyeIcon" />
            </b-button>
          </router-link>
          <!-- <b-button
            variant="danger"
            class="btn-icon"
            @click="deleteItem(data.item.id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button> -->
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
  },
  data() {
    return {
      items: [],
      busy: true,
      fields: [
        {
          key: "id",
          label: "ID",
        },
        {
          key: "user",
          label: "user",
        },
        {
          key: "title",
          label: "title",
        },
        {
          key: "user",
          label: "user",
        },
        {
          key: "created_at",
          label: "created_at",
        },
        {
          key: "actions",
          label: "Actions",
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
    async fetchData() {
      const params = {
        params: {
          limit: this.perPage,
          offset: this.perPage * (this.currentPage - 1),
        },
      };

      this.items = await axios
        .get(`${this.$baseUrl}/dashboard/perception-dashboard/`, params)
        .then((res) => {
          this.totalItems = res.data.count;
          console.log("res.data.count",res.data.count)
          this.busy = false;
          return res.data.results;
        });
    },
    // deleteItem(id) {
    //   this.$bvModal
    //     .msgBoxConfirm("Are you sure?", {
    //       cancelVariant: "outline-secondary",
    //       centered: true,
    //     })
    //     .then((value) => {
    //       if (value) {
    //         this.delete(id);
    //       }
    //     });
    // },
    // async delete(id) {
    //   await axios
    //     .delete(`${this.$baseUrl}/product/${id}/`)
    //     .then(() => {
    //       this.fetchData();
    //       this.$toast({
    //         component: ToastificationContent,
    //         position: "top-right",
    //         props: {
    //           title: "Mahsulot o'chirildi",
    //           icon: "TrashIcon",
    //           variant: "success",
    //         },
    //       });
    //     })
    //     .catch((err) => {
    //       this.$toast({
    //         component: ToastificationContent,
    //         position: "top-right",
    //         props: {
    //           title: err,
    //           icon: "TrashIcon",
    //           variant: "warning",
    //         },
    //       });
    //     });
    // },
  },
};
</script>
