<template>
  <div class="about">
    <h1>About页面</h1>
    <h1>从story中获取值(0=>1):{{ num }}</h1>
    <el-button type="primary" @click="add()">+2</el-button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  asyncData({store}) {
    return store.dispatch("addNum", 2);
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["num"]),
  },
  created() {
    this.$store.dispatch("addNum", 2);
  },
  methods:{
    add(){
      this.$store.dispatch("addNum", 2);
    }
  }
};
</script>
