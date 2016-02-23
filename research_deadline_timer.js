var SECOND_MILLISECOND = 1000;
var MINUTE_MILLISECOND = 60 * SECOND_MILLISECOND;
var HOUR_MILLISECOND = 60 * MINUTE_MILLISECOND;
var DAY_MILLISECOND = 24 * HOUR_MILLISECOND;

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

var counterGanbare = 0;
var counterOppai = 0;

//ロード関数
window.addEventListener('load',
    function (event) {

        //PHPから受け取った時間変数から文字列を生成
        timeShuAbstStr = createTimeString(timeShuAbst);
        timeShuPaperStr = createTimeString(timeShuPaper);
        timeShuPresenStartStr = createTimeString(timeShuPresenStart);
        timeShuPresenEndStr = createTimeString(timeShuPresenEnd);
        timeSotsuAbstStr = createTimeString(timeSotsuAbst);
        timeSotsuPaperStr = createTimeString(timeSotsuPaper);
        timeSotsuPresenStartStr = createTimeString(timeSotsuPresenStart);
        timeSotsuPresenEndStr = createTimeString(timeSotsuPresenEnd);

        //一定時間ごとに画面表示を実行
        setInterval(display, 100);
    }
, false);

//タイマー表示のメイン関数
function display() {
    //タイマー表示
    counterShuAbst = displayTimeOfAbstAndPaper(timeShuAbstStr, 'shu_abst', counterShuAbst);
    counterShuPaper = displayTimeOfAbstAndPaper(timeShuPaperStr, 'shu_paper', counterShuPaper);
    counterShuPresen = displayTimeOfPresen(timeShuPresenStartStr, timeShuPresenEndStr, 'shu_presen', counterShuPresen);
    counterSotsuAbst = displayTimeOfAbstAndPaper(timeSotsuAbstStr, 'sotsu_abst', counterSotsuAbst);
    counterSotsuPaper = displayTimeOfAbstAndPaper(timeSotsuPaperStr, 'sotsu_paper', counterSotsuPaper);
    counterSotsuPresen = displayTimeOfPresen(timeSotsuPresenStartStr, timeSotsuPresenEndStr, 'sotsu_presen', counterSotsuPresen);

    //締切表示
    displayDateOfAbstAndPaper(timeShuAbst, 'shu_abst_date');
    displayDateOfAbstAndPaper(timeShuPaper, 'shu_paper_date');
    displayDateOfPresen(timeShuPresenStart, timeShuPresenEnd, 'shu_presen_date');
    displayDateOfAbstAndPaper(timeSotsuAbst, 'sotsu_abst_date');
    displayDateOfAbstAndPaper(timeSotsuPaper, 'sotsu_paper_date');
    displayDateOfPresen(timeSotsuPresenStart, timeSotsuPresenEnd, 'sotsu_presen_date');

    //がんばれAAとがんばれAA（おっぱいver）表示の初期化
    displayGanbare(false);
    displayOppai(false);

    //すべてが終わったらオワタ表示
    var flagTimeOver = 0;
    flagTimeOver += isTimerOver(timeShuAbstStr);
    flagTimeOver += isTimerOver(timeShuPaperStr);
    flagTimeOver += isTimerOver(timeShuPresenEndStr);
    flagTimeOver += isTimerOver(timeSotsuAbstStr);
    flagTimeOver += isTimerOver(timeSotsuPaperStr);
    flagTimeOver += isTimerOver(timeSotsuPresenEndStr);
    if (flagTimeOver == 6) {
        document.getElementById('main').style.display = 'none';
        document.getElementById('owata').style.display = 'block';
    }
    else {
        //1日未満のタイマーがあればがんばれAA（おっぱいver）表示
        var flagOppai = 0;
        flagOppai += isOppai(timeShuAbstStr);
        flagOppai += isOppai(timeShuPaperStr);
        flagOppai += isOppai(timeShuPresenEndStr);
        flagOppai += isOppai(timeSotsuAbstStr);
        flagOppai += isOppai(timeSotsuPaperStr);
        flagOppai += isOppai(timeSotsuPresenEndStr);
        if (flagOppai > 0) {
            displayOppai(true);
        }
        else {
            //あと3日～1日のタイマーがあればがんばれAA表示
            var flagGanbare = 0;
            flagGanbare += isGanbare(timeShuAbstStr);
            flagGanbare += isGanbare(timeShuPaperStr);
            flagGanbare += isGanbare(timeShuPresenEndStr);
            flagGanbare += isGanbare(timeSotsuAbstStr);
            flagGanbare += isGanbare(timeSotsuPaperStr);
            flagGanbare += isGanbare(timeSotsuPresenEndStr);
            if (flagGanbare > 0) {
                displayGanbare(true);
            }
        }
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

//アブスト欄と論文欄の締切を表示する関数
function displayDateOfAbstAndPaper(timeStr, element) {
    var text = document.getElementById(element);

    text.innerHTML = '提出期限：' + timeStr[0] + '年' + timeStr[1] + '月' + timeStr[2] + '日 ' + timeStr[3] + '時';

    if (timeStr[4] != '0') {
        text.innerHTML += timeStr[4] + '分';
    }
}

//発表欄の締切を表示する関数
function displayDateOfPresen(startTimeStr, endTimeStr,element) {
    var text = document.getElementById(element);

    text.innerHTML = '発表時間：' + startTimeStr[0] + '年' + startTimeStr[1] + '月' + startTimeStr[2] + '日 ' + startTimeStr[3] + '時';
    if (startTimeStr[4] != '0') {
        text.innerHTML += startTimeStr[4] + '分';
    }

    text.innerHTML += '～' + endTimeStr[3] + '時';
    if (endTimeStr[4] != '0') {
        text.innerHTML += endTimeStr[4] + '分';
    }
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

//残り時間を表示する関数（返り値 カウンターの値）
function displayTime(lap, element, counter) {
    var day = Math.floor(lap/DAY_MILLISECOND);
    var strDay = ('0' + day).slice(-3);
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

//がんばれAAの表示を判断する関数（返り値 0：がんばれじゃない、1：がんばれ）
//残り時間が3日～1日の間にあれば1を返す
function isGanbare(timeStr) {
    var now = new Date();
    var time = new Date(timeStr);
    var lap = time.getTime() - now.getTime();
    var day = Math.floor(lap/DAY_MILLISECOND);

    if (day < 3 && day > 0) {
        return 1;
    }

    return 0;
}

//がんばれAA（おっぱいver）の表示を判断する関数（返り値 0：がんばれじゃない、1：がんばれ）
//残り時間が1日未満になれば1を返す
function isOppai(timeStr) {
    var now = new Date();
    var time = new Date(timeStr);
    var lap = time.getTime() - now.getTime();
    var day = Math.floor(lap/DAY_MILLISECOND);

    if (day == 0) {
        return 1;
    }

    return 0;
}

//PHPから送られてきた時間変数からJavaScript用時間文字列を生成する関数（返り値 文字列）
function createTimeString(time) {
    year = ('0' + time[0]).slice(-4);
    month = ('0' + time[1]).slice(-2);
    day = ('0' + time[2]).slice(-2);
    hour = ('0' + time[3]).slice(-2);
    minute = ('0' + time[4]).slice(-2);
    timeStr = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00.000+09:00';

    return timeStr;
}

//がんばれAAを表示する関数
function displayGanbare(flag) {
    var ganbare = document.getElementById('ganbare');
    if (flag == false) {
        ganbare.style.display = 'none';
    }
    else {
        var ganbare1 = document.getElementById('ganbare1');
        var ganbare2 = document.getElementById('ganbare2');
        var ganbare3 = document.getElementById('ganbare3');
        var ganbare4 = document.getElementById('ganbare4');
        ganbare.style.display = 'block';
        ganbare1.style.display = 'none';
        ganbare2.style.display = 'none';
        ganbare3.style.display = 'none';
        ganbare4.style.display = 'none';
        if (counterGanbare <= 8) {
            ganbare1.style.display = 'block';
            ganbare1.style.color = 'white';
        }
        else if (counterGanbare <= 16) {
            ganbare2.style.display = 'block';
            ganbare2.style.color = 'white';
        }
        else if (counterGanbare <= 24) {
            ganbare3.style.display = 'block';
            ganbare3.style.color = 'white';
        }
        else if (counterGanbare <= 34) {
            ganbare4.style.display = 'block';
            ganbare4.style.color = 'white';
            if (counterGanbare == 34){
                counterGanbare = 0;
            }
        }

        counterGanbare++;
    }
}

//がんばれAA（おっぱいver）を表示する関数
function displayOppai(flag) {
    var oppai = document.getElementById('oppai');
    if (flag == false) {
        oppai.style.display = 'none';
    }
    else {
        var oppai1 = document.getElementById('oppai1');
        var oppai2 = document.getElementById('oppai2');
        oppai.style.display = 'block';
        oppai1.style.display = 'none';
        oppai2.style.display = 'none';
        if (counterOppai <= 4) {
            oppai1.style.display = 'block';
            oppai1.style.color = 'white';
        }
        else if (counterOppai <= 8) {
            oppai2.style.display = 'block';
            oppai2.style.color = 'white';
            if (counterOppai == 8){
                counterOppai = 0;
            }
        }

        counterOppai++;
    }
}
