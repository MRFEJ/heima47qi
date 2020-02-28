import Vue from 'vue'

import moment from "moment"

Vue.filter("filterData", function (time) {
    return moment(time).format("YYYY-MM-DD")
})