<template>
    <div class="w-100">
        <b-row>
            <!-- Main btnn -->
            <b-col cols="12" class="addBtn" v-if="!busy">
                <router-link :to="{ name: 'drug-stores-add' }">
                    <b-button variant="primary" class="addBtnn">
                        <feather-icon icon="PlusIcon" />
                        Add Drag Store
                    </b-button>
                </router-link>
            </b-col>
        </b-row>
        <b-row class="Sewarch_and_category">
            <!-- Search inputt -->
            <b-col cols="5" class="search_input">
                <b-input-group size="md">
                    <b-form-input class="input_search" v-model="filter" type="search" placeholder="Type to Search" />
                    <b-input-group-append class="clear_btn">
                        <b-button class="clear" :disabled="!filter" @click="filter = ''">
                            Clear
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>

            <!-- Select inputt -->
            <b-col cols="5">
                <v-select :value="selectedCategory" label="name" :options="category" :required="!selectedCategory"
                    placeholder="Category" @input="setCategory">
                    <!-- <template #selected-option="tanlang"></template> -->
                    <template #selected-option="{ name }">
                        {{ name }}
                    </template>
                </v-select>
            </b-col>
        </b-row>
        <b-row>
            <!-- Main table  -->
            <b-table hover show-empty :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage"
                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" :filter="filter"
                :filter-included-fields="filterOn" @filtered="onFiltered" striped responsive @row-clicked="passStpre">
                <template #cell(title)="data">
                    <div>
                        {{ data.item.title }}
                    </div>
                </template>

                <template #cell(actions)="data">
                    <div class="boxx">

                        <router-link :to="{name: 'drug-stores-edit', params: {id: data.item.id}}">
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

            <!-- Pagination -->

            <b-col cols="12" v-if="!busy">
                <b-pagination v-model="currentPage" :per-page="perPage" align="center" size="md" class="my-2"
                    :total-rows="totalRows" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from "@axios";
import vSelect from "vue-select";

import {
    BTable,
    BRow,
    BCol,
    BPagination,
    BImg,
    BButton,
    BOverlay,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
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
        vSelect,
        BFormGroup,
        BInputGroup,
        BFormInput,
        BInputGroupAppend,
    },
    data() {
        return {
            selectedCategory: {
                id:0,
                name:"Tanlang"
            },
            category: [
                {
                    id:0,
                    name:"Tanlang",
                }
            ],
            busy: true,
            items: [],
            itemss: [
                {
                    id: 1,
                    store_name: "Drug Stores 1",
                    name: "maxsus tavsiya etilgan"
                },
                {
                    id: 2,
                    store_name: "Drug Stores 2",
                    name: "Maxsus dorilar"
                },
                {
                    id: 3,
                    store_name: "Drug Stores 3",
                    name: "Psehatropik dorilar"
                },
                {
                    id: 4,
                    store_name: "Drug Stores 4",
                    name: "Bolalar uchun dorilar"
                },
                {
                    id: 5,
                    store_name: "Drug Stores 5",
                    name: "Antebyoteklar"
                },
                {
                    id: 6,
                    store_name: "Drug Stores 6",
                    name: "Antibyotik dorila"
                },
                {
                    id: 7,
                    store_name: "Drug Stores 7",
                    name: "Antibyotik dorila"
                },
                {
                    id: 8,
                    store_name: "Drug Stores 8",
                    name: "Bolalar uchun dorilar"
                },
            ],
            fields: [
                {
                    key: "id",
                    label: "ID",
                    sortable: true,
                },
                {
                    key: "store_name",
                    label: "Store Name",
                    sortable: true,
                },
                {
                    key: "name",
                    label: "Stores Category",
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
            totalItems: 1,
            sortBy: "",
            sortDesc: false,
            sortDirection: "asc",
            filter: null,
            filterOn: [],
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
        this.getData();
    },
    methods: {
        // Get Drug Stor Categories 
        async getData() {
            await axios
                .get(`${this.$baseUrl}/product/category/`, {
                    headers: {
                        "Accept-Language": "ru",
                    },
                })
                .then((res) => {
                    for(let i=0; i<res.data.results.length; i++){
                        this.category.push(res.data.results[i])
                    }
                });
        },
        // Select Category func======================
        setCategory(item) {
            if(item == null){
                this.selectedCategory=this.category[0]
                this.items = this.itemss
            }
            else {
                if(item.name == "Tanlang"){
                    this.selectedCategory = this.category[0]
                    this.items = this.itemss
                }
                else{
                    var feltredCategory = [];
                    for (let i = 0; i < this.itemss.length; i++) {
                        if (this.itemss[i].name == item.name) {
                            feltredCategory.push(this.itemss[i])
                        }
                    }
                    this.items = feltredCategory
                    for (let k = 0; k < this.category.length; k++) {
                        if (this.category[k].name ==item.name){
                            this.selectedCategory = this.category[k]
                        }
                    }
                    
                }
                
            }
        },

        // Change Format Func=======================

        // formatTo(item) {
        //   return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        // },


        async fetchData() {
            const params = {
                params: {
                    limit: this.perPage,
                    offset: this.perPage * (this.currentPage - 1),
                },
            };
            this.items = this.itemss
            // await axios.get(`${this.$baseUrl}/user/profile`).then((res) => {
            //   this.busy = false;
            //   this.items = res.data;
            //   console.log("Jamshid Qara",this.items)
            // });
            this.totalRows = this.items.length;
            this.busy = false;
        },


        // Delete Methods Alert  ==============================

        deleteItem(id) {
          this.$bvModal
            .msgBoxConfirm("Are you sure?", {
              cancelVariant: "outline-secondary",
              centered: true,
            })
            .then((value) => {
              if (value) {
                // this.delete(id);

                // sinov uchun 
                this.Deletee(id)
              }
            });
        },


        // sinov uchun
        Deletee(id){
            console.log("deleted id",id,this.items)
            this.items.splice((id-1),1)
        
        },


        // Delete Methods  ==============================
        
        async delete(id) {
          this.busy = true;
          await axios
            .delete(`${this.$baseUrl}/product/dragstores-delete/${id}/`)
            .then(() => {
              this.fetchData();
              this.$toast({
                component: ToastificationContent,
                position: "top-right",
                props: {
                  title: "Magazin ruyhatdan uchirildi",
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


        // Felter Func==================
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        passStpre(event){
            localStorage.store = event.store_name
            localStorage.category=event.name
            console.log("Salom",localStorage.category)
            this.$router.push(`/product/drug-stores/${event.id}/store`)
            console.log("Cleked Row",event)
        },
    },
};
</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.pagination {
    margin-top: 25px;
}

.row_dragStore {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;

}

.addBtn {
    margin-bottom: 20px;
}

.addBtnn {
    padding: 11px 20px;
}

.Sewarch_and_category {
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search_input {
        .input_search {
            padding-left: 15px;
        }

        .clear_btn {
            .clear {
                padding-right: 20px;
                padding-left: 20px;
            }
        }
    }
}

.btnn {
    display: inline-block;
    justify-content: center;
    align-items: center;
    padding-right: 5px;
}

.btnnn {
    display: inline-block;
    justify-content: center;
    align-items: center;
    padding-left: 5px;
}

.boxx {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

