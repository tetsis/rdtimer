var timeShuAbstStr;
var timeShuPaperStr;
var timeShuPresenStartStr;
var timeShuPresenEndStr;
var timeSotsuAbstStr;
var timeSotsuPaperStr;
var timeSotsuPresenStartStr;
var timeSotsuPresenEndStr;

var counterShuAbst = 0;
var counterShuPaper = 0;
var counterShuPresen = 0;
var counterSotsuAbst = 0;
var counterSotsuPaper = 0;
var counterSotsuPresen = 0;

//ロード関数
window.addEventListener('load',
    function (event) {
        timeShuAbstStr = createTimeString(timeShuAbst[0], timeShuAbst[1], timeShuAbst[2], timeShuAbst[3], timeShuAbst[4]);
        timeShuPaperStr = createTimeString(timeShuPaper[0], timeShuPaper[1], timeShuPaper[2], timeShuPaper[3], timeShuPaper[4]);
        timeShuPresenStartStr = createTimeString(timeShuPresen[0], timeShuPresen[1], timeShuPresen[2], timeShuPresen[3], timeShuPresen[4])
        timeShuPresenStartStr = createTimeString(timeShuPresen[0], timeShuPresen[1], timeShuPresen[2], timeShuPresen[5], timeShuPresen[6])
        timeSotsuAbstStr = createTimeString(timeSotsuAbst[0], timeSotsuAbst[1], timeSotsuAbst[2], timeSotsuAbst[3], timeSotsuAbst[4]);
        timeSotsuPaperStr = createTimeString(timeSotsuPaper[0], timeSotsuPaper[1], timeSotsuPaper[2], timeSotsuPaper[3], timeSotsuPaper[4]);
        timeSotsuPresenStartStr = createTimeString(timeSotsuPresen[0], timeSotsuPresen[1], timeSotsuPresen[2], timeSotsuPresen[3], timeSotsuPresen[4])
        timeSotsuPresenStartStr = createTimeString(timeSotsuPresen[0], timeSotsuPresen[1], timeSotsuPresen[2], timeSotsuPresen[5], timeSotsuPresen[6])
        setInterval(display, 100);
    }
, false);

//タイマー表示のメイン関数
function display() {
    //タイマー表示
    //shu_abst
    counterShuAbst = displayTimeOfAbstAndPaper(timeShuAbstStr, 'shu_abst', counterShuAbst);
    //shu_paper
    counterShuPaper = displayTimeOfAbstAndPaper(timeShuPaperStr, 'shu_paper', counterShuPaper);
    //shu_presen
    counterShuPresen = displayTimeOfPresen(timeShuPresenStartStr, timeShuPresenEndStr, 'shu_presen', counterShuPresen);
    //sotsu_abst
    counterSotsuAbst = displayTimeOfAbstAndPaper(timeSotsuAbstStr, 'sotsu_abst', counterSotsuAbst);
    //sotsu_paper
    counterSotsuPaper = displayTimeOfAbstAndPaper(timeSotsuPaperStr, 'sotsu_paper', counterSotsuPaper);
    //sotsu_presen
    counterSotsuPresen = displayTimeOfPresen(timeSotsuPresenStartStr, timeSotsuPresenEndStr, 'sotsu_presen', counterSotsuPresen);

    //オワタ表示
    var flagTimeOver = 0;
    //shu_abst
    flagTimeOver += isTimerOver(timeShuAbstStr);
    //shu_paper
    flagTimeOver += isTimerOver(timeShuPaperStr);
    //shu_presen
    flagTimeOver += isTimerOver(timeShuPresenEndStr);
    //sotsu_abst
    flagTimeOver += isTimerOver(timeSotsuAbstStr);
    //sotsu_paper
    flagTimeOver += isTimerOver(timeSotsuPaperStr);
    //sotsu_presen
    flagTimeOver += isTimerOver(timeSotsuPresenEndStr);

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

    var day = Math.floor(lap/DAY_MILLISECOND);
    var strDay = ('0' + day).slice(-2);
    lap -= day * DAY_MILLISECOND;
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
    if (day < 3) {
        text.style.color = 'red';
    }
    else {
        text.style.color = 'white';
    }

    //点滅
    //counterが0になった時のみ文字色を黒にする
    //ことで点滅に見せる
    if (day <= 0) {
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

    text.innerHTML = 'あと ' + strDay + ' 日 ' + strHour + ' 時間 ' + strMinute + ' 分 ' + strSecond + ' 秒';

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
    var day = ('0' + now.getDate()).slice(-2);
    var hour = ('0' + now.getHours()).slice(-2);
    var minute = ('0' + now.getMinutes()).slice(-2);
    var second = ('0' + now.getSeconds()).slice(-2);

    var text = document.getElementById('now');

    text.innerHTML ='現在時刻：' + year + ' 年 ' + month + ' 月 ' + day + ' 日 ' + hour + ' 時 ' + minute + ' 分 ' + second + ' 秒';
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

//PHPから送られてきた時間変数からJavaScript用時間文字列を生成する関数（返り値 文字列）
function createTimeString(year, month, day, hour, minute) {
    year = ('0' + year).slice(-4);
    month = ('0' + month).slice(-2);
    day = ('0' + day).slice(-2);
    hour = ('0' + hour).slice(-2);
    minute = ('0' + minute).slice(-2);
    timeStr = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00.000';

    return timeStr;
}
