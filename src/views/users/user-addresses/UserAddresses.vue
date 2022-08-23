<template>
  <b-row>
    <b-col cols="12" class="addBtn mb-2" style="" v-if="!busy">
      <router-link :to="{name: 'add-addresses-add'}">
        <b-button variant="primary">
          <feather-icon icon="PlusIcon" />
          {{$t('Add address')}}
        </b-button>
      </router-link>
    </b-col>
    <b-col cols="12">
      <b-table
        show-empty
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        striped
        responsive
      >
        <template #cell(title)="data">
          <div>
            {{ data.item.title }}
          </div>
        </template>
        <template #cell(actions)="data">
          <div class="boxx">
            <router-link
            :to="{name: 'user-address-view', params: {id: data.item.id}}"
          >
              <div class="btnn">
                <b-button variant="success" class="btn-icon">
                  <feather-icon icon="EyeIcon" />
                </b-button>
              </div>
            </router-link>
            <router-link :to="{name: 'user-address-ediet', params: {id: data.item.id}}">
                <div class="btnn">
                  <div>
                    <b-button variant="primary" class="btn-icon">
                      <feather-icon icon="EditIcon" />
                    </b-button>
                  </div>
                </div>
            </router-link>
            <b-button
              variant="danger"
              class="btn-icon"
              @click="deleteItem(data.item.id)"
            >
              <feather-icon icon="TrashIcon" />
            </b-button>
          </div>
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
        :total-rows="totalRows"
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
      busy: true,
      items: [],
      fields: [
        {
          key: "id",
          label: "ID",
        },
        {
          key: "phone_number",
          label: "Phone",
        },
        {
          key: "address",
          label: "Address",
        },
        {
          key: "entrance",
          label: "Entrance",
        },
        {
          key: "flat",
          label: "Flat",
        },
        {
          key: "floor",
          label: "Floor",
        },
        {
          key: "landmark",
          label: "Landmark",
        },
        {
          key: "landmark",
          label: "Landmark",
        },
        {
          key: "note",
          label: "Note",
        },
        {
          key: "actions",
          label: "Actions",
          class: "text-center",
        },
      ],
      currentPage: 1,
      perPage: 12,
      totalRows: 1,
    };
  },
  // watch: {
  //   currentPage: {
  //     handler() {
  //       this.fetchData();
  //     },
  //   },
  // },
  mounted() {
    this.fetchData();
  },
  methods: {
    formatTo(item) {
      return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    async fetchData() {
      await axios
        .get(`${this.$baseUrl}/product/location-dashboard/`)
        .then((res) => {
          this.items = res.data;

          this.busy = false;
        });

      this.totalRows = this.items.length;
    },
    deleteItem(id) {
      this.$bvModal
        .msgBoxConfirm("Are you sure?", {
          cancelVariant: "outline-secondary",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.delete(id);
          }
        });
    },
    async delete(id) {
      await axios
        .delete(`${this.$baseUrl}/product/location-dashboard/${id}/`)
        .then(() => {
          this.fetchData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Foydalanuvchi manzili o'chirildi",
              icon: "TrashIcon",
              variant: "success",
            },
          });
        })
        .catch((err) => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: err,
              icon: "TrashIcon",
              variant: "warning",
            },
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.sinovv{
  min-width: 80px;
}
.btnn{
  display: inline-block;
  justify-content: center;
  align-items: center;
  padding-right:14px;
}
.boxx{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
