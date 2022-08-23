<template>
  <div class="user_box" @click="show_hede1">
    <div class="lang_header">
      <div class="logo_globus">
        <feather-icon size="24" icon="GlobeIcon" class="lang_icon" />
      </div>
      <div class="globus_flag">
        <flag class="flag" :iso="selectedFlag.lang_ico"></flag>
      </div>
      <div class="chevron_dovn">
        <chevron-down-icon size="1.5x" class="custom-class"></chevron-down-icon>
      </div>
    </div>

    <div class="dropDownOne" v-if="show_hide1">
      <div
        class="w-100 sub_box"
        v-for="(item, i) in category"
        :key="i"
        @click="setCategory(item)"
      >
        <div class="boxx">
          <flag class="flagg" :iso="item.lang_ico"></flag>
        </div>
        <div class="box_title">
          <span class="country_name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from "vue-feather-icons";
import vSelect from "vue-select";
import { BRow, BCol, BFormGroup, BCard } from "bootstrap-vue";
export default {
  components: {
    ChevronDownIcon,
    BRow,
    BCard,
    BCol,
    BFormGroup,
    vSelect,
  },
  data() {
    return {
      show_hide1: false,
      category: [
        {
          id: 1,
          name: "En",
          lang_ico: "us",
          lang_t: "en",
        },
        {
          id: 2,
          name: "Uz",
          lang_ico: "uz",
          lang_t: "uz",
        },
        {
          id: 3,
          name: "Ru",
          lang_ico: "ru",
          lang_t: "ru",
        },
      ],
      selectedCategory: {},
      selectedFlag: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    show_hede1() {
      this.show_hide1 = !this.show_hide1;
      this.num = 0;
      document.addEventListener("click", this.add_fun);
    },
    add_fun(e) {
      if (this.num != 0) {
        if (e.target.closest(".dropDownOne")) return;
        this.show_hide1 = false;
        document.removeEventListener("click", this.add_fun);
      }
      this.num++;
    },

    getData() {
      this.selectedCategory = this.category[0];
      this.selectedFlag = this.category[0];
    },
    setCategory(item) {
      console.log("Jamshid Qara", item);
      this.selectedCategory = item;
      this.$i18n.locale = this.selectedCategory.lang_t;

      this.selectedFlag = item;
      console.log("selrcted Flag", this.selectedFlag);
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
</style>
