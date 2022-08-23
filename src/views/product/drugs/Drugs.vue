<template>
  <b-row>
    <b-col cols="12" class="addBtn mb-2" style="" v-if="!busy">
      <router-link :to="{name: 'drug-add'}">
        <b-button variant="primary">
          <feather-icon icon="PlusIcon" />
          {{$t('Add drug')}}
        </b-button>
      </router-link>
    </b-col>
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

        <template #cell(recommended)="data">
          <div>
            <b-badge pill :variant="data.item.recommended ? 'success' : ''">
              {{ data.item.recommended ? "Yes" : "No status" }}
            </b-badge>
          </div>
        </template>
        <template #cell(active)="data">
          <div>
            <b-badge pill :variant="data.item.active ? 'success' : 'danger'">
              {{ data.item.active ? "Yes" : "No" }}
            </b-badge>
          </div>
        </template>
        <template #cell(available)="data">
          <div>
            <b-badge pill :variant="data.item.available ? 'success' : 'danger'">
              {{ data.item.available ? "Yes" : "No" }}
            </b-badge>
          </div>
        </template>

        <template  #cell(price)="data">
          <div class="sinovv">{{ data.item.price }} so'm</div>
        </template>

        <template #cell(image)="data">
         <div><b-img :src="data.value" width="50" height="50" fluid /></div>
        </template>

        <template #cell(actions)="data">
            <div class="boxx">
              <router-link :to="{name: 'drug-edit', params: {id: data.item.id}}">
                <div class="btnn">
                    <b-button variant="primary" class="btn-icon">
                      <feather-icon icon="EditIcon" />
                    </b-button>
                </div>
              </router-link>
              <div class="btnnn">
                <b-button
                  variant="danger"
                  class="btn-icon "
                  @click="deleteItem(data.item.id)"
                >
                  <feather-icon icon="TrashIcon" />
                </b-button>
              </div>
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
          label: "ID",
        },
        {
          key: "image",
          label: "Image",
          image: true,
        },
        {
          key: "name",
          label: "Name",
        },
        {
          key: "price",
          label: "Price",
        },
        {
          key: "active",
          label: "Active",
        },
        {
          key: "available",
          label: "Available",
        },
        {
          key: "recommended",
          label: "Recommended",
        },
        {
          key: "brand.title",
          label: "Brand",
        },
        {
          key: "type.title",
          label: "Type",
        },
        {
          key: "actions",
          label: "Actions",
          class:"text-center"
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
        .get(`${this.$baseUrl}/product/`, params)
        .then((res) => {
          this.totalItems = res.data.count;
          this.busy = false;
          return res.data.results;
        });
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
        .delete(`${this.$baseUrl}/product/${id}/`)
        .then(() => {
          this.fetchData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Mahsulot o'chirildi",
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
  padding-right:5px;
}
.btnnn{
  display: inline-block;
  justify-content: center;
  align-items: center;
  padding-left:5px;
}
.boxx{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
