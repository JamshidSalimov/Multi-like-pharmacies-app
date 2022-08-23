<template>
    <div class="language">
          <b-form-group
            class="m-0"  
          >
            <v-select
              style="min-width:90px"
              label="name"
              :value="selectedCategory"
              :options="category"
              @input="setCategory"
            >
              <template #selected-option="{ name }">
                {{ name }}<span class="flag_ico"><flag class="flagg" :iso="selectedCategory.lang_ico"></flag></span>
              </template>
            </v-select>
          </b-form-group>
    </div>
</template>

<script>
import vSelect from "vue-select";
import {
  BRow,
  BCol,
  BFormGroup,
  BCard,
} from "bootstrap-vue";
export default {
  components: {
    BRow,
    BCard,
    BCol,
    BFormGroup,
    vSelect,
  },
  data() {
    return {
      
      category: [
        {
          id: 1,
          name: "En",
          lang_ico: "us",
          lang_t: "en"
        },
        {
            id:2,
            name:"Uz",
            lang_ico:"uz",
            lang_t:"uz"
        },
        {
            id:3,
            name:"Ru",
            lang_ico:"ru",
            lang_t:"ru"
        },
          
      ],
      selectedCategory: {},
    };
  },
  mounted(){
    this.getData();
  },
  methods: {
    getData(){
      this.selectedCategory=this.category[0]
    },
    setCategory(item) {
      if(item == null){
        this.selectedCategory = this.category[0]
        console.log(this.selectedCategory)
        this.$i18n.locale = this.selectedCategory.lang_t
      }
      else{
        this.selectedCategory = item;
        this.$i18n.locale = item.lang_t
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .flag_ico{
    padding: 0 0 0 10px;
    line-height: 20px;
    .flagg{
      font-size: 20px;
    }
  }
</style>

