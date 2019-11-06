<template>
    <div class="price" id="price-filter">
        <b-dropdown size="lg" :text="text" class="m-2" id="dropdown">
          <div class="dropdown-menu-item">
            <template>
              <v-card flat color="transparent">
              <v-card-text>
                <v-range-slider
                  v-model="value1"
                ></v-range-slider>
              </v-card-text>
              </v-card>
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
        value1: [30, 60]
      }
    },
  }
</script>
<style scoped>


.price{
    display: inline-block;
    max-width: 330px;
    margin: 0;
}

ul.dropdown-menu {
    min-width: 488px;
}
li.dropdown-menu-items{
    display: inline-block;
}
.dropdown-menu-items p{
    margin: 0;
    font-family: "Panton";
    font-size: 11px;
    font-weight: 600;
    text-align: center;
}
li.dropdown-menu-items a{
    padding: 0 !important;
}
</style>