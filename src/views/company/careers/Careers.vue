<template>
  <b-row>
    <b-col cols="12" class="addBtn mb-2" style="" v-if="!busy">
      <router-link :to="{name: 'career-add'}">
        <b-button variant="primary">
          <feather-icon icon="PlusIcon" />
          {{$t('Add career')}}
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

          <router-link :to="{name: 'career-edit', params: {id: data.item.id}}">
                
                  <b-button variant="primary" class="btn-icon">
                    <feather-icon icon="EditIcon" />
                  </b-button>
              
          </router-link>

          <b-button
            variant="danger"
            class="btn-icon ml-md-1"
            @click="deleteItem(data.item.id)"
          >
            <feather-icon icon="TrashIcon" />
          </b-button>

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
          key: "career",
          label: "Career",
        },
        {
          key: "actions",
          label: "Actions",
          class:"text-center"
        },
      ],
      currentPage: 1,
      perPage: 12,
      totalRows: 1,
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
      await axios.get(`${this.$baseUrl}/company/career`).then((res) => {
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
        .delete(`${this.$baseUrl}/company/career/${id}/`)
        .then(() => {
          this.fetchData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Ish o'rini o'chirildi",
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
              title: err.response.data.detail,
              icon: "TrashIcon",
              variant: "warning",
            },
          });
        });
    },
  },
};
</script>
