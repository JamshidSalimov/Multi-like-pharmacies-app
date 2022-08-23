<template>
  <b-row>
    <b-col cols="12" class="addBtn mb-2" style="" v-if="!busy">
      <router-link :to="{name: 'add-user-add'}">
        <b-button variant="primary">
          <feather-icon icon="PlusIcon" />
          {{$t('Add User')}}
        </b-button>
      </router-link>
    </b-col>
    <b-col cols="12">
      <b-col md="6" class="my-1 ml-auto">
        <b-form-group
          :label="$t('Search')"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              :placeholder="$t('Type to Search')"
            />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
                {{$t('Clear')}}
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-table
        show-empty
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
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
            <router-link :to="{name: 'user-view', params: {id: data.item.id}}">
              <div class="btnn">
                <b-button variant="success" class="btn-icon">
                <feather-icon icon="EyeIcon" />
                </b-button>
              </div>
            </router-link>
            <router-link :to="{name: 'user-edit', params: {id: data.item.id}}">
                  <div>
                      <b-button variant="primary" class="btn-icon">
                        <feather-icon icon="EditIcon" />
                      </b-button>
                  </div>
            </router-link>
            <b-button variant="danger" class="btn-icon ml-md-1" @click="deleteItem(data.item.id)">
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
  BFormGroup,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
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
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
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
          sortable: true,
        },
        {
          key: "first_name",
          label: "First Name",
          sortable: true,
        },
        {
          key: "phone_number",
          label: "Phone number",
          sortable: true,
        },
        {
          key: "actions",
          label: "Actions",
          class: "text-center"
        },
      ],
      currentPage: 1,
      perPage: 12,
      totalRows: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
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
      await axios.get(`${this.$baseUrl}/user/profile`).then((res) => {
        this.busy = false;
        this.items = res.data;
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
      this.busy = true;
      await axios
        .delete(`${this.$baseUrl}/user/profile-delete/${id}/`)
        .then(() => {
          this.fetchData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Foydalanuvchi o'chirildi",
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
              icon: "AlertTriangleIcon",
              variant: "danger",
            },
          });
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
<style lang="scss" scoped>
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
