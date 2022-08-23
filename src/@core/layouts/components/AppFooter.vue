<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT  © {{ new Date().getFullYear() }}
      <b-link
        class="ml-25"
        href="https://greatsoft.uz/uz"
        target="_blank"
      >GreatSoft</b-link>
      <span class="d-none d-sm-inline-block">, {{$t('All rights Reserved')}}</span>
    </span>

    <span class="float-md-right d-none d-md-block">{{$t('Hand-crafted')}} &amp; {{$t('Made with')}}
      <feather-icon
        icon="HeartIcon"
        size="21"
        class="text-danger stroke-current"
      />
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
