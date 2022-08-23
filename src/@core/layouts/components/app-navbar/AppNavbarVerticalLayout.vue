<template>
  <div class="navbar-container nav_bar">
    <div class="menyu_barr">
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <b-link class="nav-link" @click="toggleVerticalMenuActive">
            <feather-icon icon="MenuIcon" size="21" />
          </b-link>
        </li>
      </ul>
    </div>

    <div class="lang_user">
      <div class="lang">
        <language-drop />
      </div>
      <div class="userr">
        <b-navbar-nav class="nav align-items-center ml-auto">
          <!-- <locale /> -->
          <dark-Toggler class="d-none d-lg-block" />
          <!-- <search-bar /> -->
          <!-- <cart-dropdown /> -->
          <!-- <notification-dropdown /> -->
          <user-dropdown />
        </b-navbar-nav>
      </div>
    </div>
  </div>
</template>

<script>
import { BLink, BNavbarNav } from "bootstrap-vue";
// import Bookmarks from './components/Bookmarks.vue'
// import Locale from './components/Locale.vue'
// import SearchBar from './components/SearchBar.vue'
import DarkToggler from "./components/DarkToggler.vue";
// import CartDropdown from './components/CartDropdown.vue'
// import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from "./components/UserDropdown.vue";
import LanguageDrop from "./components/LanguageDropDown.vue";

export default {
  components: {
    BLink,

    // Navbar Components
    BNavbarNav,
    // Bookmarks,
    // Locale,
    // SearchBar,
    DarkToggler,
    // CartDropdown,
    // NotificationDropdown,
    UserDropdown,
    LanguageDrop,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>

<style scoped lang="scss">
.nav_bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .menyu_barr {
    display: none;
  }
  .lang_user {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .userr {
      padding-left: 25px;
    }
  }
}
@media screen and (max-device-width: 1199px) {
  .nav_bar {
    display: flex;
    align-items: center;
    justify-content: space-between !important;

    .menyu_barr {
      display: block;
    }
  }
}
@media screen and (max-device-width: 575px) {
  .userr {
    padding-left: 10px !important;
  }
}
</style>
