var timeShuAbst = '2016-02-04T16:00:00.000';
var timeShuPaper = '2016-02-09T15:00:00.000';
var timeShuPresen = '2016-02-12T13:00:00.000';
var timeSotsuAbst = '2016-02-15T17:00:00.000';
var timeSotsuPaper = '2016-02-18T15:00:00.000';
var timeSotsuPresen = '2016-02-23T11:10:00.000';

var counterShuAbst = 0;
var counterShuPaper = 0;
var counterShuPresen = 0;
var counterSotsuAbst = 0;
var counterSotsuPaper = 0;
var counterSotsuPresen = 0;


window.addEventListener('load',
    function (event) {
        setInterval(display, 100);
    }
, false);

function display() {
    //shu_abst
    counterShuAbst = displayTimeAtElement(timeShuAbst, 'shu_abst', counterShuAbst);
    //shu_paper
    counterShuPaper = displayTimeAtElement(timeShuPaper, 'shu_paper', counterShuPaper);
    //shu_presen
    counterShuPresen = displayTimeAtElement(timeShuPresen, 'shu_presen', counterShuPresen);
    //sotsu_abst
    counterSotsuAbst = displayTimeAtElement(timeSotsuAbst, 'sotsu_abst', counterSotsuAbst);
    //sotsu_paper
    counterSotsuPaper = displayTimeAtElement(timeSotsuPaper, 'sotsu_paper', counterSotsuPaper);
    //sotsu_presen
    counterSotsuPresen = displayTimeAtElement(timeSotsuPresen, 'sotsu_presen', counterSotsuPresen);
    //now
    displayCurrentTime();

    //check whether all time over
    var flagTimeOver = 0;
    //shu_abst
    flagTimeOver += isTimerOver(timeShuAbst);
    //shu_paper
    flagTimeOver += isTimerOver(timeShuPaper);
    //shu_presen
    flagTimeOver += isTimerOver(timeShuPresen);
    //sotsu_abst
    flagTimeOver += isTimerOver(timeSotsuAbst);
    //sotsu_paper
    flagTimeOver += isTimerOver(timeSotsuPaper);
    //sotsu_presen
    flagTimeOver += isTimerOver(timeSotsuPresen);

    if (flagTimeOver == 6) {
        document.getElementById('table').style.display = 'none';
        document.getElementById('owata').style.display = 'block';
    }
}
function displayTimeAtElement(deadlineStr, element, counter) {
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

        if (date < 3) {
            text.style.color = 'red';
        }
        else {
        text.style.color = 'white';
        }
        var strText = 'あと ' + strDate + ' 日 ' + strHour + ' 時間 ' + strMinute + ' 分 ' + strSecond + ' 秒';

        //flash
        if (date <= 0) {
            if (counter <= 0) {
                text.style.color = 'black';
                if (hour <= 0) {
                    if (minute <= 0) {
                        counter = 2;
                    }
                    else {
                        counter = 4;
                    }
                }
                else {
                    counter = 8;
                }
            }
            counter--;
        }

        text.innerHTML = strText;

    }

    return counter;
}
function displayCurrentTime() {
    var now = new Date();
    var year = ('0' + now.getFullYear()).slice(-4);
    var month = now.getMonth()+1;
    month = ('0' + month).slice(-2);
    var date = ('0' + now.getDate()).slice(-2);
    var hour = ('0' + now.getHours()).slice(-2);
    var minute = ('0' + now.getMinutes()).slice(-2);
    var second = ('0' + now.getSeconds()).slice(-2);
    var text = document.getElementById('now');
    text.innerHTML ='現在時刻：' + year + ' 年 ' + month + ' 月 ' + date + ' 日 ' + hour + ' 時 ' + minute + ' 分 ' + second + ' 秒';
}

function isTimerOver(deadlineStr) {
    var now = new Date();
    var deadline = new Date(deadlineStr);
    var lap = deadline.getTime() - now.getTime();

    if (lap < 0) {
        return 1;
    }

    return 0;
}
