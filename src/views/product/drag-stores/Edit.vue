<template>
    <b-form @submit.prevent="EditDrugStore">
        <b-card>
            <b-row>

                <!-- Drug Store Name -->
                <b-col lg="12">
                    <b-form-group :label="$t('Drug Store name')" label-cols-md="4" class="m-0">
                        <b-tabs pills align="left">
                            <b-tab title="Uz" active>
                                <b-form-input :placeholder="$t('Uz Drug store name')" v-model="title_uz" />
                            </b-tab>

                            <b-tab title="Ру">
                                <b-form-input :placeholder="$t('Ru Drug store name')" v-model="title_ru" />
                            </b-tab>

                            <b-tab title="En">
                                <b-form-input :placeholder="$t('En Drug store name')" v-model="title_en" />
                            </b-tab>
                        </b-tabs>
                        <br>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.title_uz.$dirty && !$v.title_uz.required">
                            {{ $t('Uz Drug store name empty.') }}
                        </small>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.title_ru.$dirty && !$v.title_ru.required">
                            {{ $t('Ru Drug store name empty.') }}
                        </small>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.title_en.$dirty && !$v.title_en.required">
                            {{ $t('En Drug store name empty.') }}
                        </small>
                    </b-form-group>
                </b-col>

                <!-- Description -->
                <b-col lg="12">
                    <b-form-group :label="$t('Description')" label-cols-md="4" class="m-0">
                        <b-tabs pills align="left">
                            <b-tab title="Uz" active>
                                <b-form-textarea :placeholder="$t('Uz Description')" v-model="descript_uz">
                                </b-form-textarea>
                            </b-tab>

                            <b-tab title="Ру">
                                <b-form-textarea :placeholder="$t('Ru Description')" v-model="descript_ru">
                                </b-form-textarea>
                            </b-tab>

                            <b-tab title="En">
                                <b-form-textarea :placeholder="$t('En Description')" v-model="descript_en">
                                </b-form-textarea>
                            </b-tab>
                        </b-tabs>
                        <br>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.descript_uz.$dirty && !$v.descript_uz.required">
                            {{ $t('Uz description empty.') }}
                        </small>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.descript_ru.$dirty && !$v.descript_ru.required">
                            {{ $t('Ru description empty.') }}
                        </small>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.descript_en.$dirty && !$v.descript_en.required">
                            {{ $t('En description empty.') }}
                        </small>
                    </b-form-group>
                </b-col>

            </b-row>
        </b-card>
        <b-card>
            <b-row>
                <!-- Category -->
                <b-col cols="12">
                    <b-form-group class="m-0" :label="$t('Drug store category')" label-for="drug_catogory"
                        label-cols-md="4">
                        <v-select id="drug_catogory" :value="selectedCategory" label="name" :options="category"
                            :placeholder="$t('Drug store category')" @input="setCategory">
                            <template #selected-option="{ name }">
                                {{ name }}
                            </template>
                        </v-select>
                        <br>
                        <small class="text-danger" style="margin-left: 5px; font-size:14px; margin-top:20px"
                            v-if="$v.selectedCategory.$dirty && !$v.selectedCategory.required">
                            {{ $t('Drug store category empty')}}
                        </small>
                    </b-form-group>
                </b-col>

                <!-- Delivery cost -->
                <b-col lg="12">
                    <b-form-group :label="$t('Delivery cost')" label-cols-md="4" label-for="delevery_cost" class="m-0">
                        <b-form-input id="delevery_cost" :placeholder="$t('Delivery cost')" type="number"
                            v-model="delevery_cost" />
                        <br>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.delevery_cost.$dirty && !$v.delevery_cost.required">
                            {{ $t('Delevery cost empty')}}
                        </small>
                    </b-form-group>
                </b-col>

                <!-- Delivery time interval -->
                <b-col cols="12">
                    <b-form-group :label="$t('Delivery time interval')" label-cols-md="4" label-for="delevery_time"
                        class="m-0">
                        <b-form-input id="delevery_time" :placeholder="$t('Delivery time interval')"
                            v-model="delevery_time" type="number" />
                        <br>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.delevery_time.$dirty && !$v.delevery_time.required">
                            {{ $t('Delivery time empty')}}
                        </small>
                    </b-form-group>
                </b-col>

                <!-- Average product price -->
                <b-col cols="12">
                    <b-form-group :label="$t('Average product price')" label-cols-md="4" label-for="average_cost"
                        class="m-0">
                        <b-form-input id="average_cost" :placeholder="$t('Average product price')"
                            v-model="average_cost" type="number" />
                        <br>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.average_cost.$dirty && !$v.average_cost.required">
                            {{ $t('Average cost empty')}}
                        </small>
                    </b-form-group>
                </b-col>

            </b-row>
        </b-card>
        <b-card>
            <b-row>

                <!-- Address Name -->
                <b-col cols="12">
                    <b-form-group :label="$t('Address')" label-cols-md="4" >
                        <b-tabs pills align="left">
                            <b-tab title="Uz" active>
                                <b-form-input :placeholder="$t('Uz Address')" v-model="addressName_uz" />
                            </b-tab>
                            <b-tab title="Ру">
                                <b-form-input :placeholder="$t('Ru Address')" v-model="addressName_ru" />
                            </b-tab>
                            <b-tab title="En">
                                <b-form-input :placeholder="$t('En Address')" v-model="addressName_en" />
                            </b-tab>
                        </b-tabs>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.addressName_uz.$dirty && !$v.addressName_uz.required">
                            {{$t('Uz Address empty')}}
                        </small>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.addressName_ru.$dirty && !$v.addressName_ru.required">
                            {{$t('Ru Address empty')}}
                        </small>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.addressName_en.$dirty && !$v.addressName_en.required">
                            {{$t('En Address empty')}}
                        </small>
                    </b-form-group>
                </b-col>

                <!-- City -->
                <b-col cols="12">
                    <b-form-group :label="$t('City')" label-cols-md="4" >
                        <b-tabs pills align="left">
                            <b-tab title="Uz" active>
                                <b-form-input :placeholder="$t('Uz City')" v-model="cityName_uz" />
                            </b-tab>
                            <b-tab title="Ру">
                                <b-form-input :placeholder="$t('Ru City')" v-model="cityName_ru" />
                            </b-tab>
                            <b-tab title="En">
                                <b-form-input :placeholder="$t('En City')" v-model="cityName_en" />
                            </b-tab>
                        </b-tabs>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.cityName_uz.$dirty && !$v.cityName_uz.required">
                            {{$t('Uz City empty')}}
                        </small>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.cityName_ru.$dirty && !$v.cityName_ru.required">
                            {{$t('Ru City empty')}}
                        </small>
                        <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                            v-if="$v.cityName_en.$dirty && !$v.cityName_en.required">
                            {{$t('En City empty')}}
                        </small>
                    </b-form-group>
                </b-col>

                <!-- Location -->
                <b-col cols="12">
                    <b-form-group :label="$t('Location')" label-cols-md="4" >
                        <b-form-input :placeholder="$t('Location')" v-model="address.location" />
                    </b-form-group>
                </b-col>

                <!-- Map -->
                <b-col cols="12" class="mt-1 mb-2">
                    <b-form-group :label="$t('Map')" label-cols-md="4" >
                        <MapCreate class="my-map-cabinet" @getMapData="getMapData" />
                    </b-form-group>
                </b-col>

            </b-row>
            <hr />

            <!-- Category image -->
            <b-form-group :label="$t('Drug store image')" label-cols-md="4">
                <b-form-file :placeholder="$t('Choose a file or drop it here...')"
                    :drop-placeholder="$t('Drop file here...')" @change="onFileChange"
                    accept="image/png, image/gif, image/jpeg" v-model="mainImage" />
                <small class="text-danger mt-0" style="margin-left: 5px; font-size:14px;"
                    v-if="$v.mainImage.$dirty && !$v.mainImage.required">
                    {{ $t('Choose a file or drop') }}
                </small>
                <br>
                <img class="mt-1" v-if="mainImageUrl" :src="mainImageUrl" data-fancybox-image="mainImageUrl"
                    alt="Category image" style="height: 150px; object-fit: contain" />
                <img style="height: 150px; object-fit: contain" v-else src="@/assets/img/noimage.png" alt="noimage" />
            </b-form-group>

        </b-card>
        <!-- Sumbit -->
        <b-card>
            <b-row>
                <!-- submit and reset -->
                <b-col class="d-flex justify-content-center">
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" class="mr-1">
                        {{ $t('Submit') }}
                    </b-button>
                    <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="outline-secondary"
                        @click="resetAll">
                        {{ $t('Reset') }}
                    </b-button>
                </b-col>

            </b-row>
        </b-card>
    </b-form>
</template>

<script>
import axios from "axios";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import "@fancyapps/ui/dist/panzoom.controls.css";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { required } from "vuelidate/lib/validators";
import vSelect from "vue-select";
import MapCreate from "../../company/store-addresses/MapCreate.vue";

import {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BCard,
    BTab,
    BTabs,
    BCardText,
    BFormFile,
    BFormTextarea,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
export default {
    components: {
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BForm,
        BButton,
        BCard,
        Ripple,
        BTabs,
        BTab,
        BCardText,
        BFormFile,
        BFormTextarea,
        vSelect,
        ToastificationContent,
        MapCreate,

    },
    directives: {
        Ripple,
    },
    validations: {
        title_uz: {
            required,
        },
        title_ru: {
            required,
        },
        title_en: {
            required,
        },
        code: {
            required,
        },
        mainImage: {
            required,
        },
        descript_uz: {
            required,
        },
        descript_ru: {
            required,
        },
        descript_en: {
            required,
        },
        delevery_cost: {
            required,
        },
        delevery_time: {
            required,
        },
        average_cost: {
            required,
        },
        selectedCategory: {
            required,
        },
        addressName_uz: {
            required,
        },
        addressName_ru: {
            required,
        },
        addressName_en: {
            required,
        },
        cityName_uz: {
            required,
        },
        cityName_ru: {
            required,
        },
        cityName_en: {
            required,
        },
    },
    data() {
        return {
            addressName_ru: "",
            addressName_uz: "",
            addressName_en: "",
            cityName_uz: "",
            cityName_ru: "",
            cityName_en: "",
            address: {
                location: "",
                lat: "",
                long: "",
            },
            category: [],
            selectedCategory: {},
            average_cost: null,
            delevery_time: null,
            delevery_cost: null,
            descript_uz: "",
            descript_ru: "",
            descript_en: "",
            title_uz: '',
            title_ru: '',
            title_en: '',
            mainImage: null,
            mainImageUrl: null,
            imageFile: null,
            imageFileName: null,
            imageFileType: null,
            changed: false,
            id: this.$route.params.id,
            StoreEdit:{}
        };
    },
    mounted() {

        Fancybox.bind("[data-fancybox-image]", {
            Image: {
                zoom: true,
            },
        });

        this.getData()
    },
    methods: {
        async getData() {
            await axios
                .get(`${this.$baseUrl}/product/${this.id}/`, {
                    headers: {
                        "Accept-Language": "ru",
                    },
                })
                .then((res) => {
                    this.StoreEdit = res.data;
                    console.log("Jamshid Qaraaaaaaaaaaaaaa", this.StoreEdit)

                    // Drug Store Name
                    this.title_uz = this.StoreEdit.title_uz;
                    this.title_ru = this.StoreEdit.title_ru;
                    this.title_en = this.StoreEdit.title_en;

                    // Descriptions
                    this.descript_uz = this.StoreEdit.descript_uz;
                    this.descript_ru = this.StoreEdit.descript_ru;
                    this.descript_en = this.StoreEdit.descript_en;
                    
                    // Delevery Cost
                    this.delevery_cost = this.StoreEdit.delevery_cost;

                    // Delevery Time
                    this.delevery_time = this.StoreEdit.delevery_time;

                    // Average Cost
                    this.average_cost = this.StoreEdit.average_cost;

                    // Adderss Name
                    this.addressName_uz = this.StoreEdit.addressName_uz;
                    this.addressName_ru = this.StoreEdit.addressName_ru;
                    this.addressName_en = this.StoreEdit.addressName_en;

                    // City Name
                    this.cityName_uz = this.StoreEdit.cityName_uz;
                    this.cityName_en = this.StoreEdit.cityName_en;
                    this.cityName_ru = this.StoreEdit.cityName_ru;
                    
                    // Location
                    this.address.location = this.StoreEdit.lat + ", " + this.StoreEdit.long;
                    
                    // Main Image of Drug Store
                    this.mainImageUrl = this.StoreEdit?.image;

                    // Loading Closed
                    this.busy = false;
                });

            await axios

                // Drug Stor Categories 
                .get(`${this.$baseUrl}/product/category/`, {
                    headers: {
                        "Accept-Language": "ru",
                    },
                })
                .then((res) => {
                    this.category = res.data.results;
                });

                // Drug Stor Category 
                this.selectedCategory=this.category[this.id]

        },
        setCategory(item) {
            this.selectedCategory = item;
        },
        resetAll() {

            this.mainImageUrl = null;

            this.imageFile = null;

            this.title_uz = "";
            this.title_ru = "";
            this.title_en = "";

            this.descript_en = "";
            this.descript_ru = "";
            this.descript_uz = "";

            this.selectedCategory = {};

            this.average_cost = null;
            this.delevery_time = null;
            this.delevery_cost = null;

            this.addressName_uz = "";
            this.addressName_ru = "";
            this.addressName_en = "";

            this.cityName_uz = "";
            this.cityName_ru = "";
            this.cityName_en = "";

        },
        getMapData(data) {
            this.address.lat = data.lat;
            this.address.long = data.lng;
            this.address.location = this.address.lat + ", " + this.address.long;
        },

        // Change Image Function
        onFileChange(e) {
            const file = e.target.files[0];
            this.mainImageUrl = URL.createObjectURL(file);
            this.imageFile = file;
            this.imageFileName = file.name.split(".")[0];
            this.changed = true;
        },

        //  Main Edit Function
        async EditDrugStore() {
            console.log("function is working")
            if (this.$v.$invalid) {
                this.$v.$touch();
                return false;
            }

            // const form = new FormData();
            // form.append("name", this.title_ru);
            // form.append("name_uz", this.title_uz);
            // form.append("name_ru", this.title_ru);
            // form.append("name_en", this.title_en);

            // form.append("code", this.code);

            // if (this.changed) {
            //     form.append("image", this.imageFile);
            //     this.changed = false;
            // }

            // const access = localStorage.getItem("access");
            // const params = {
            //     headers: {
            //         "Accept-Language": "ru",
            //         Authorization: `Bearer ${access}`,
            //     },
            // };
            // await axios
            //     .post(`${this.$baseUrl}/product/category/`, form, params)
            //     .then(() => {
            //         this.$router.push({ name: "drug-categories" });

            //         this.$toast({
            //             component: ToastificationContent,
            //             position: "top-right",
            //             props: {
            //                 title: "Add New Drug Store!",
            //                 icon: "CheckCircleIcon",
            //                 variant: "success",
            //             },
            //         });
            //     })
            //     .catch(() => {
            //         this.$toast({
            //             component: ToastificationContent,
            //             position: "top-right",
            //             props: {
            //                 title: "Something is wrong :(",
            //                 icon: "AlertCircleIcon",
            //                 variant: "warning",
            //             },
            //         });
            //     });

        },
    },
};
</script>
