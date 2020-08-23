/*
通过axios发送请求和响应
请求地址：https://yiketianqi.com/api
*/

var app = new Vue({
    el: "#app",
    data: {
        city: "",
        weatherList: [],
        img: "",
    },

    mounted: function () {
        this.searchWeather(); //加载完自动触发一次，显示ip所在地天气
    },
    methods: {
        searchWeather: function () {
            //console.log('天气查询');
            //调用接口
            //保存this
            var that = this;
            axios
                .get(
                    "https://yiketianqi.com/api?version=v9&appid=91761117&appsecret=yX0F1SZH&city=" +
                    this.city
                )
                .then(function (response) {
                    if (response.data.errmsg == "city不存在!") {
                        console.error("未查询到该城市!");
                        alert("未查询到该城市!");
                    }
                    console.log(response);
                    that.weatherList = response.data.data;
                })
                .catch(function (err) {});
        },
        changeCity: function (city) {
            this.city = city;
            this.searchWeather();
        },
    },
});