var flagShuAbst = 0;
var flagShuPaper = 0;
var flagShuPresen = 0;
var flagSotsuAbst = 0;
var flagSotsuPaper = 0;
var flagSotsuPresen = 0;

window.addEventListener('load',
    function (event) {
        setInterval('display()', 100);
    }
, false);

function display() {
    //shu_abst
    flagShuAbst = displayTimeAtElement('2016-02-04T16:00:00.000', 'shu_abst', flagShuAbst);
    //shu_paper();
    flagShuPaper = displayTimeAtElement('2016-02-09T15:00:00.000', 'shu_paper', flagShuPaper);
    //shu_presen();
    flagShuPresen = displayTimeAtElement('2016-02-12T13:00:00.000', 'shu_presen', flagShuPresen);
    //sotsu_abst
    flagSotsuAbst = displayTimeAtElement('2016-02-15T17:00:00.000', 'sotsu_abst', flagSotsuAbst);
    //sotsu_paper();
    flagSotsuPaper = displayTimeAtElement('2016-02-18T15:00:00.000', 'sotsu_paper', flagSotsuPaper);
    //sotsu_presen();
    flagSotsuPresen = displayTimeAtElement('2016-02-23T11:10:00.000', 'sotsu_presen', flagSotsuPresen);
    //now
    displayCurrentTime();
}
function displayTimeAtElement(deadlineStr, element, flag) {
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
        var strDate = ('0' + date).slice(-2);
        lap -= date * DAY_MILLISECOND;
        var hour = Math.floor(lap/HOUR_MILLISECOND);
        var strHour = ('0' + hour).slice(-2);
        lap -= hour * HOUR_MILLISECOND;
        var minute = Math.floor(lap/MINUTE_MILLISECOND);
        var strMinute = ('0' + minute).slice(-2);
        lap -= minute * MINUTE_MILLISECOND;
        var second = Math.floor(lap/SECOND_MILLISECOND);
        var strSecond = ('0' + second).slice(-2);

        var tempText = 'あと ' + strDate + ' 日 ' + strHour + ' 時間 ' + strMinute + ' 分 ' + strSecond + ' 秒';

        if (date <= 0) {
            if (flag <= 0) {
                tempText = '　';
                if (hour <= 0) {
                    if (minute <= 0) {
                        flag = 2;
                    }
                    else {
                        flag = 4;
                    }
                }
                else {
                    flag = 8;
                }
            }
            flag--;
        }

        text.innerHTML = tempText;

        if (date <= 3) {
            text.style.color = 'red';
        }
    }

    return flag;
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
