window.addEventListener('load',
    function (event) {
        setInterval('display()', 100);
    }
, false);

function display() {
    //shu_abst
    displayTimeAtElement('2016-02-04T16:00:00.000', 'shu_abst');
    //shu_paper();
    displayTimeAtElement('2016-02-09T15:00:00.000', 'shu_paper');
    //shu_presen();
    displayTimeAtElement('2016-02-12T10:00:00.000', 'shu_presen');
    //sotsu_abst
    displayTimeAtElement('2016-02-15T17:00:00.000', 'sotsu_abst');
    //sotsu_paper();
    displayTimeAtElement('2016-02-18T15:00:00.000', 'sotsu_paper');
    //sotsu_presen();
    displayTimeAtElement('2016-02-23T11:10:00.000', 'sotsu_presen');
    //now
    displayCurrentTime();
}
function displayTimeAtElement(deadlineStr, element) {
    var text = document.getElementById(element);

    var SECOND_MILLISECOND = 1000;
    var MINUTE_MILLISECOND = 60 * SECOND_MILLISECOND;
    var HOUR_MILLISECOND = 60 * MINUTE_MILLISECOND;
    var DAY_MILLISECOND = 24 * HOUR_MILLISECOND;

    var now = new Date();
    var deadline = new Date(deadlineStr);
    var lap = deadline.getTime() - now.getTime();

    if (lap < 0) {
        text.style.textAlign = 'center';
        text.innerHTML = '-- 終了 --';
        text.style.color = 'cyan';
    }
    else {
        var date = Math.floor(lap/DAY_MILLISECOND);
        date = ('0' + date).slice(-2);
        lap -= date * DAY_MILLISECOND;
        var hour = Math.floor(lap/HOUR_MILLISECOND);
        hour = ('0' + hour).slice(-2);
        lap -= hour * HOUR_MILLISECOND;
        var minute = Math.floor(lap/MINUTE_MILLISECOND);
        minute = ('0' + minute).slice(-2);
        lap -= minute * MINUTE_MILLISECOND;
        var second = Math.floor(lap/SECOND_MILLISECOND);
        second = ('0' + second).slice(-2);
        text.innerHTML = 'あと ' + date + ' 日 ' + hour + ' 時間 ' + minute + ' 分 ' + second + ' 秒';
        if (date <= 3) {
            text.style.color = 'red';
        }
    }
}
function displayCurrentTime() {
    var now = new Date();
    var year = ('0' + now.getFullYear()).slice(-4);
    var month = ('0' + now.getMonth()+1).slice(-2);
    var date = ('0' + now.getDate()).slice(-2);
    var hour = ('0' + now.getHours()).slice(-2);
    var minute = ('0' + now.getMinutes()).slice(-2);
    var second = ('0' + now.getSeconds()).slice(-2);
    var text = document.getElementById('now');
    text.innerHTML ='現在時刻：' + year + ' 年 ' + month + ' 月 ' + date + ' 日 ' + hour + ' 時 ' + minute + ' 分 ' + second + ' 秒';
}
