<template lang="pug">
  v-app
      documentation
      
</template>

<script>
import Documentation from '@/documentation'

export default {
  name: 'carosel',
  components: { Documentation },
  data: () => ({
    ready: false,
    offsetTop: 0,
    goTopHidden: true
  }),
  created () {
    setTimeout(() => (this.ready = true), 500)
  },
  methods: {
    onScroll () {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.goTopHidden = this.offsetTop < 200
    }
  }
}
</script>

<style lang="scss">
$main-text: #888;

* {
  margin: 0;
  padding: 0;
}

.main-content {
  max-width: 800px;
  height: 650px;
}

.v-card {box-shadow: none;}

// FOOTER
//=================================================//
.v-application--wrap footer.v-footer {
  background: none;
  font-style: italic;
  color: $main-text;
  font-size: 0.9em;
  margin: 3em 0 5em;

  i {
    font-size: 1.2em;
    vertical-align: middle;
    transition: 1s ease-out;
    cursor: pointer;

    &.fa-vuejs:hover,
    &.fa-html5:hover,
    &.fa-css3:hover,
    &.fa-sass:hover {
      transform: rotate(360deg);
    }

    &.heart:hover {
      animation: pulse 1.8s ease-out infinite;
    }
  }
}
</style>
