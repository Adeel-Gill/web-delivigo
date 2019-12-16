<template lang="pug">
.documentation
  

  
  vueper-slides.no-shadow.ex--show-multiple-slides.ex1(:visible-slides="3" :slide-ratio="1/4" :dragging-distance="70")
    vueper-slide(v-for="i in 9" :key="i" :title="i.toString()").
    

  

  
</template>

<script>
import { VueperSlides, VueperSlide } from '@/components/vueperslides/'
// import Highlight from '@/components/highlight-message/index'

import '@/components/vueperslides/styles.scss'
import './examples.scss'

export default {
  components: {
    VueperSlides,
    VueperSlide,
    // Highlight
  },
  data: () => ({
    events: '',
    slideshowDisabled: false,
    parallax: 1,
    slidesTimeTimerId: null,
    highlightWhatAreClones: false,
    contentPosition: 'false',
    breakpoints: {
      1200: { slideRatio: 1 / 5 },
      1100: { slideRatio: 1 / 4 },
      900: { slideRatio: 1 / 3 },
      600: { slideRatio: 1 / 2, arrows: false, bulletsOutside: true }
    },
    colors: ['#42b983', '#2196f3', '#ffc107', '#ff5252'],
    
    slides3: [
      { title: 'Slide 1', content: 'Slide 1 content.' },
      { title: 'Slide 2', content: 'Slide 2 content.' }
    ]
  }),
  methods: {
    onWhatAreClonesClick () {
      this.highlightWhatAreClones = true
      setTimeout(() => (this.highlightWhatAreClones = false), 3000)
    },
    logEvents (eventName, params) {
      this.events += `<b>&bull; Event:</b> ${eventName}, <b>Params:</b> ${JSON.stringify(params, null, 0)}<br>`
    },
    appendSlide () {
      this.slides3.push({
        title: `Programmagically appended slide ${this.slides3.length + 1}`,
        content: `Programmagically appended slide ${this.slides3.length + 1} content.`
      })
    },
    removeSlide () {
      this.slides3.pop()
    },
    toggleSlideshow () {
      this.slideshowDisabled = !this.slideshowDisabled
    },
    toggleSlidesTime () {
      if (this.slidesTimeTimerId) {
        clearInterval(this.slidesTimeTimerId)
        this.slidesTimeTimerId = 0
      }
      else {
        this.updateSlidesWithTime()
        this.slidesTimeTimerId = setInterval(this.updateSlidesWithTime, 1000)
      }
    },
    
    contentPositionChange () {
      let positions = ['false', 'top', 'bottom']
      this.contentPosition = positions[(positions.indexOf(this.contentPosition) + 1) % 3]
    }
  }
}
</script>

<style lang="scss">
@import './variables';
@import './typography';

// GLOBAL
//=================================================//
a {
  text-decoration: none;

  &[name] {
    position: relative;
    top: -4em;
    display: block;
  }
}

ul, ol {
  margin-top: 1em;
  padding-left: 1.3em;
}

.code {
  font-family: monospace, sans-serif;
}

pre {
  padding: 0.5em;
  margin: 1.5em 0;
  border: 1px solid $lighter-text;
  background-color: #f8f8f8;
  border-radius: 4px;
  display: block;
  box-shadow: none;
}

.page__title {
  color: $primary;
  background-color: #fff;
  padding: 1.5em;
  display: inline-flex;
  align-items: center;
}

.max-widthed, h2, h3, h4, p, pre {
  max-width: $page-max-width;
  margin-left: auto !important;
  margin-right: auto !important;
}

// APPLICATION
//=================================================//
.v-application {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fff !important;
  padding-top: 8em;
}

.v-application--wrap {
  padding-top: 12em;
  overflow-x: hidden;
}

@keyframes pulse {
  0%, 20%, 30%, 35%, 45%, 100% {transform: scale(1);}
  25%, 40% {transform: scale(1.3);}
}

@media screen and (max-width: 1119px) {
  .max-widthed, h2, h3, h4, p, pre {
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
}

.features {
  line-height: 1.8;
  padding-left: 2.2em;
  position: relative;

  .v-icon {
    line-height: 0.8;
    position: absolute;
    left: 0;
    padding-top: 0.1em;
  }
}

.coming-soon {
  font-style: italic;

  .v-card__title {
    font-size: 1.2em;
  }

  .v-chip {
    margin: 2px 0;
  }
}

.v-chip i.v-icon {
  position: relative;
  color: rgba(0, 0, 0, .25) !important;
  margin: 0 7px 0 -7px;
}

.settings-list {
  li {
    padding: 20px 10px;
  }

  li li {
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 10px;
    margin-top: 10px;
  }

  code {
    font-size: 1.1em;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.pulse {
  animation: pulse 1.5s infinite;
}
</style>
