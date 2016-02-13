var timeShuAbst = '2016-02-04T16:00:00.000';
var timeShuPaper = '2016-02-09T15:00:00.000';
var timeShuPresenStart = '2016-02-12T13:00:00.000';
var timeShuPresenEnd = '2016-02-12T13:30:00.000';
var timeSotsuAbst = '2016-02-15T17:00:00.000';
var timeSotsuPaper = '2016-02-18T15:00:00.000';
var timeSotsuPresenStart = '2016-02-23T11:10:00.000';
var timeSotsuPresenEnd = '2016-02-23T12:00:00.000';

var counterShuAbst = 0;
var counterShuPaper = 0;
var counterShuPresen = 0;
var counterSotsuAbst = 0;
var counterSotsuPaper = 0;
var counterSotsuPresen = 0;

//ロード関数
window.addEventListener('load',
    function (event) {
        setInterval(display, 100);
    }
, false);

//タイマー表示のメイン関数
function display() {
    //タイマー表示
    //shu_abst
    counterShuAbst = displayTimeOfAbstAndPaper(timeShuAbst, 'shu_abst', counterShuAbst);
    //shu_paper
    counterShuPaper = displayTimeOfAbstAndPaper(timeShuPaper, 'shu_paper', counterShuPaper);
    //shu_presen
    counterShuPresen = displayTimeOfPresen(timeShuPresenStart, timeShuPresenEnd, 'shu_presen', counterShuPresen);
    //sotsu_abst
    counterSotsuAbst = displayTimeOfAbstAndPaper(timeSotsuAbst, 'sotsu_abst', counterSotsuAbst);
    //sotsu_paper
    counterSotsuPaper = displayTimeOfAbstAndPaper(timeSotsuPaper, 'sotsu_paper', counterSotsuPaper);
    //sotsu_presen
    counterSotsuPresen = displayTimeOfPresen(timeSotsuPresenStart, timeSotsuPresenEnd, 'sotsu_presen', counterSotsuPresen);

    //オワタ表示
    var flagTimeOver = 0;
    //shu_abst
    flagTimeOver += isTimerOver(timeShuAbst);
    //shu_paper
    flagTimeOver += isTimerOver(timeShuPaper);
    //shu_presen
    flagTimeOver += isTimerOver(timeShuPresenEnd);
    //sotsu_abst
    flagTimeOver += isTimerOver(timeSotsuAbst);
    //sotsu_paper
    flagTimeOver += isTimerOver(timeSotsuPaper);
    //sotsu_presen
    flagTimeOver += isTimerOver(timeSotsuPresenEnd);

    if (flagTimeOver == 6) {
        document.getElementById('table').style.display = 'none';
        document.getElementById('owata').style.display = 'block';
    }

    //現在時刻表示
    displayCurrentTime();
}

//アブスト欄と論文欄を表示する関数
function displayTimeOfAbstAndPaper(timeStr, element, counter) {
    var now = new Date();
    var time = new Date(timeStr);
    var lap = time.getTime() - now.getTime();

    if (lap > 0) {
        //残り時間を表示
        counter = displayTime(lap, element, counter);
    }
    else {
        //「終了」を表示
        displayClose(element);
    }

    return counter;
}

//発表欄を表示する関数
function displayTimeOfPresen(startTimeStr, endTimeStr, element, counter) {
    var now = new Date();
    var startTime = new Date(startTimeStr);
    var endTime = new Date(endTimeStr);
    var startLap = startTime.getTime() - now.getTime();
    var endLap = endTime.getTime() - now.getTime();

    if (startLap > 0) {
        //残り時間を表示
        counter = displayTime(startLap, element, counter);
    }
    else if (endLap > 0) {
        //「発表中」を表示
        displayInTime(element);
    }
    else {
        //「終了」を表示
        displayClose(element);
    }

    return counter;
}

//残り時間を表示する関数（返り値 カウンターの値）
function displayTime(lap, element, counter) {
    var SECOND_MILLISECOND = 1000;
    var MINUTE_MILLISECOND = 60 * SECOND_MILLISECOND;
    var HOUR_MILLISECOND = 60 * MINUTE_MILLISECOND;
    var DAY_MILLISECOND = 24 * HOUR_MILLISECOND;

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

    var text = document.getElementById(element);

    //文字色の変更
    if (date < 3) {
        text.style.color = 'red';
    }
    else {
        text.style.color = 'white';
    }

    //点滅
    //counterが0になった時のみ文字色を黒にする
    //ことで点滅に見せる
    if (date <= 0) {
        if (counter <= 0) {
            text.style.color = 'black';
            if (hour <= 11) {
                if (hour <= 2) {
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

    text.innerHTML = 'あと ' + strDate + ' 日 ' + strHour + ' 時間 ' + strMinute + ' 分 ' + strSecond + ' 秒';

    return counter;
}

//「発表中」を表示する関数
function displayInTime(element) {
    var text = document.getElementById(element);
    text.style.color = 'red';
    text.innerHTML = '-- 発表中 --';
}

//「終了」を表示する関数
function displayClose(element) {
    var text = document.getElementById(element);
    text.style.color = 'cyan';
    text.innerHTML = '-- 終了 --';
}

//現在時刻を表示する関数
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

//タイマーの終了を判断する関数（返り値 0：終了していない、1：終了）
function isTimerOver(timeStr) {
    var now = new Date();
    var time = new Date(timeStr);
    var lap = time.getTime() - now.getTime();

    if (lap < 0) {
        return 1;
    }

    return 0;
}
