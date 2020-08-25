getWeather();

//发送请求，获取数据
function getWeather() {
    $.getJSON('https://yiketianqi.com/api?version=v9&appid=91761117&appsecret=yX0F1SZH', function (result) {
        var update_time = Date.parse(result.update_time);
        update_time = getTime(update_time);
        $('.tianqi_icon').html(setWeatherIcon(result.data[0].wea));
        $('.tianqi_bg').css('background-image', setBgImg(result.data[0].wea));
        $('.wea-header-city').append(result.city);
        $('.wea-header-time').html(update_time + ' 更新');
        $('.wea-content-content .wea').html(result.data[0].wea);
        $('.wea-content-content .tem').html(result.data[0].hours[0].tem);

        $('.wea-content-right .win').html(result.data[0].hours[0].win + '&nbsp;' + result.data[0].hours[0].win_speed);
        $('.wea-content-right .air_level').html('空气&nbsp;' + result.data[0].air_level);
        $('.wea-content-right .humidity').html('相对湿度&nbsp;' + result.data[0].humidity);

        $('.wea-list').html('');
        var str = '';
        var tianqi_icon = setWeatherIcon(result.data[0].wea);
        var wea = result.data[0].wea;
        var tem = result.data[0].hours[0].tem;
        var week = '今天';
        for (var i = 0; i < 3; i++) {
            if (i > 0) {
                tianqi_icon = setWeatherIcon(result.data[i].hours[0].wea);
                week = result.data[i].week;
                wea = result.data[i].hours[0].wea;
                tem = result.data[i].hours[0].tem;
            }
            str += '<ul>\n' +
                '            <li>' + week + '</li>\n' +
                '            <li>' + tianqi_icon + '</li>\n' +
                '            <li class="text">' + wea + '</li>\n' +
                '            <li>' + tem + '</li>\n' +
                '        </ul>';
        }
        $('.wea-list').html(str);
    })
}

// 根据天气设置背景图片
function setBgImg(wea) {
    var bg_img = '';
    if (wea.indexOf("晴") >= 0) {
        bg_img = 'url("../image/bg/qingtian.jpg"';
    } else if (wea.indexOf("雷") >= 0) {
        bg_img = 'url("../image/bg/lei.gif"';
    } else if (wea.indexOf("雨") >= 0) {
        bg_img = 'url("../image/bg/rain.gif"';
    } else if (wea.indexOf("雪") >= 0) {
        bg_img = 'url("../image/bg/xue.jpg"';
    } else if (wea.indexOf("多云") >= 0) {
        if (wea.indexOf("雨") >= 0) {
            bg_img = 'url("../image/bg/rain.gif"';
        } else {
            bg_img = 'url("../image/bg/qingtian.jpg"';
        }
    } else {
        bg_img = 'url("../image/bg/qingtian.jpg"';
    }
    return bg_img;
}

// 根据天气设置图标
function setWeatherIcon(wea) {
    var wea_img = '';
    if (wea.indexOf("晴") >= 0) {
        if (wea.indexOf("雨") >= 0) {
            wea_img = '<img src="../image/icon/clearr.png" />';
        } else if (wea.indexOf("云") >= 0) {
            wea_img = '<img src="../image/icon/clear.png" />';
        } else {
            wea_img = '<img src="../image/icon/sunny.png" />';
        }
    } else if (wea.indexOf("雷") >= 0) {
        if (wea.indexOf("暴") >= 0) {
            wea_img = '<img src="../image/icon/blusteryr.png" />';
        } else {
            wea_img = '<img src="../image/icon/blustery.png" />';
        }
    } else if (wea.indexOf("雨") >= 0) {
        if (wea.indexOf("晴") >= 0) {
            wea_img = '<img src="../image/icon/clearr.png" />';
        } else {
            wea_img = '<img src="../image/icon/rainy.png" />';
        }
    } else if (wea.indexOf("雪") >= 0) {
        wea_img = '<img src="../image/icon/xue.png" />'
    } else {
        wea_img = '<img src="../image/icon/cloudy.png" />';
    }

    return wea_img;
}

//获取更新时间
function getTime(timestamp) {
    var date = new Date(timestamp);
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    return h + m;
}
