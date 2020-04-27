<template>
    <div class="price" id="price-filter">
        <b-dropdown size="lg" :text="text" class="m-2" id="dropdown">
          <div class="dropdown-menu-item">
            <template>
              <template>
              <v-card flat color="transparent">
                <v-card-text>
                  <v-row>
                    <v-col class="px-4">
                      <vue-slider
                      v-model="value"
                      :enable-cross = "false"
                      :min="min"
                      :max="max"
                      :tooltip="'always'"
                      :tooltip-formatter="formatTooltip"
                      @change="callAPI(value)"
                      >

                      </vue-slider>
<!--                      <vue-range-slider-->
<!--                        v-model="value"-->
<!--                        :min="40"-->
<!--                        :max="max"-->
<!--                        :formatter="formatter"-->
<!--                        :tooltip-merge="tooltipMerge"-->
<!--                        :enable-cross="enableCross">-->
<!--                      </vue-range-slider>-->
<!--                      <v-range-slider-->
<!--                        :max="max"-->
<!--                        :min="min"-->
<!--                        :step="1"-->
<!--                        v-model="range"-->
<!--                        hide-details-->
<!--                        thumb-label="always"-->
<!--                        class="align-center"-->
<!--                      >-->
<!--                      </v-range-slider>-->
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
            </template>
          </div>
        </b-dropdown>
      </div>
</template>
<script>
  import { EventBus } from '../../../main';
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/default.css';
  export default {
    props: ['newLang'],
    data () {
      return {
        text:this.newLang.price,
        min: 0,
        max: 250,
        value: [100, 170],
        enableCross: false,
        tooltipMerge: false,
        formatter: '',
        formatTooltip: '${value}'
      }
    },
  methods: {
    setText() {
            this.text = this.newLang.price;
        },
      callAPI(value) {
        console.log('methodCalled',value);
        this.text = value[0] + "$"+ " - "+value[1]+"$"
        this.$emit('callAPI', value);
        this.$root.$emit('price',value);
      }
  },
    components: {
      VueSlider
    },
    created() {

      this.formatter = value => `$${value}`
    },
    mounted() {
      this.setText();
      EventBus.$on("resetFilter", () => {
            // this.text = "Price";
            this.setText();
        })
    }
  }
</script>
<style scoped>


.price{
    display: inline-block;
    /*max-width: 330px;*/
  width: 100%;
  /*margin: 0;*/
  /*margin-bottom: 20px;*/

}

ul.dropdown-menu {
    /*min-width: 488px;*/
  width: 100%;
}
li.dropdown-menu-items{
    display: inline-block;
}
.dropdown-menu-items p{
    margin: 0;
    /*font-family: "Panton";*/
    font-size: 11px;
    font-weight: 600;
    text-align: center;
}
li.dropdown-menu-items a{
    padding: 0 !important;
}
</style>
