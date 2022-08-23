<template>
  <b-row>
    <b-col cols="12" class="addBtn mb-2" style="" v-if="!busy">
      <router-link :to="{name: 'drug-category-add'}">
        <b-button variant="primary">
          <feather-icon icon="PlusIcon" />
          {{$t('Add categroy')}}
        </b-button>
      </router-link>
    </b-col>
    <b-col cols="12" >
      <b-table class="drag_table"
        show-empty
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="0"
        striped
        responsive
      >
        <template #cell(name)="data" class="name_drag">
          <div >
            {{ data.item.name }}
          </div>
        </template>

        <template #cell(image)="data">
          <b-img :src="data.value" width="50" height="50" fluid />
        </template>

        <template #cell(actions)="data" >
          <div class="boxx">
              <router-link
                :to="{name: 'drug-category-edit', params: {id: data.item.id}}"
              >
                <div class="btnn">
                  <b-button variant="primary" class="btn-icon">
                    <feather-icon icon="EditIcon" />
                  </b-button>
                </div>
              </router-link>
              <div class="btnnn">
                <b-button
                  variant="danger"
                  class="btn-icon ml-md-1"
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
          key: "image",
          label: "Image",
          image: true,
        },
        {
          key: "name",
          label: "Name",
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
        .get(`${this.$baseUrl}/product/category`, params)
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
        .delete(`${this.$baseUrl}/product/category/${id}/`)
        .then(() => {
          this.fetchData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Kategoriya o'chirildi",
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
  justify-content: center;
}

</style>