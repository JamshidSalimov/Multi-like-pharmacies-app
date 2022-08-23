<template>
  <div @click="show">
    <b-nav-item @click="skin = isDark ? 'light' : 'dark'">
      <feather-icon size="21" :icon="`${isDark ? 'Sun' : 'Moon'}Icon`" />
    </b-nav-item>
  </div>
</template>

<script>
import useAppConfig from "@core/app-config/useAppConfig";
import { computed } from "@vue/composition-api";
import { BNavItem } from "bootstrap-vue";

export default {
  components: {
    BNavItem,
  },
  data() {
    return {
      change_color: false,
    };
  },
  setup() {
    const { skin } = useAppConfig();

    const isDark = computed(() => skin.value === "dark");

    return { skin, isDark };
  },
  methods: {
    show() {
      this.change_color = !this.change_color;
      localStorage.color = this.change_color;
      console.log("hwejdbwjd", localStorage.color);
    },
  },
};
</script>
