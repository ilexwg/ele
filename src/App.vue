<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import { getSeller } from 'api'
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    // axios.get('/api/seller').then((data) => {
    //   console.log(data)
    // })
    getSeller().then((seller) => {
      this.seller = seller
    })
  },
  components: {
    VHeader
  }
}
</script>

<style lang="stylus" scoped>

</style>
