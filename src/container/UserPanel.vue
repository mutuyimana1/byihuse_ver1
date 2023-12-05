<template>
  <v-app>
    <vue-snotify></vue-snotify>    
    <div class="headers">
      <emb-header-v1  v-if="$route.meta.header != 2 && $route.meta.header != 3 "></emb-header-v1>
      <emb-header-v2  v-if="$route.meta.header === 2"></emb-header-v2>
      <emb-header-v3  v-if="$route.meta.header === 3"></emb-header-v3>
    </div>

    <!-- Menu for mobile -->
    <v-navigation-drawer id="navigation" v-model="mobileMenu" temporary absolute dark class="sidebar-bg">
      <emb-sidebar></emb-sidebar>
    </v-navigation-drawer>    
    <router-view></router-view>
    <emb-footer-V1>
    </emb-footer-V1>
  </v-app>
</template>
<style  scoped>
#navigation{
  background: #0D2947;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["rtlLayout"]),
    mobileMenu: {
      get() {
        return this.$store.getters.sidebarOpen;
      },
      set(val) {
        this.$store.dispatch("toggleSidebar", val);
      }
    }
  },
  /**
   * Method To set the Rtl While page is opened
  */
  mounted() {
    if(this.rtlLayout) {
      this.$vuetify.rtl = this.rtlLayout;
    }
  },
  methods: {
    /**
     * Method To Toggle The RTL Layout
     */
    toggleRTLLayout() {
      this.$vuetify.rtl = !this.rtlLayout;
      this.$store.dispatch("changeRtlLayout");
    },
  }
}
</script>