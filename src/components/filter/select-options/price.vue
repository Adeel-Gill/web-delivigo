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
                      <v-range-slider
                        v-model="range"
                        :max="max"
                        :min="min"
                        hide-details
                        class="align-center"
                        thumb-label="always"
                      >
                      </v-range-slider>
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
  export default {
    data () {
      return {
        text:'Price',
        min: 0,
        max: 250,
        range: [123, 223],
      }
    },
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