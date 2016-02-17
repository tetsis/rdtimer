
//入力した時間を確認する関数
function checkInput() {
    var shuPresenStartHour = parseInt(document.form.shu_presen_start_hour.value);
    var shuPresenStartMinute = parseInt(document.form.shu_presen_start_minute.value);
    var shuPresenEndHour = parseInt(document.form.shu_presen_end_hour.value);
    var shuPresenEndMinute = parseInt(document.form.shu_presen_end_minute.value);
    var sotsuPresenStartHour = parseInt(document.form.sotsu_presen_start_hour.value);
    var sotsuPresenStartMinute = parseInt(document.form.sotsu_presen_start_minute.value);
    var sotsuPresenEndHour = parseInt(document.form.sotsu_presen_end_hour.value);
    var sotsuPresenEndMinute = parseInt(document.form.sotsu_presen_end_minute.value);

    var flag = 0;

    //修論
    if (shuPresenStartHour > shuPresenEndHour) {
        flag = 1;
    }
    else if (shuPresenStartHour == shuPresenEndHour) {
        if (shuPresenStartMinute > shuPresenEndMinute) {
            flag = 1;
        }
    }

    if (flag) {
        alert("修論の発表時間が不正な値です。");
        return false;
    }

    //卒論
    if (sotsuPresenStartHour > sotsuPresenEndHour) {
        flag = 1;
    }
    else if (sotsuPresenStartHour == sotsuPresenEndHour) {
        if (sotsuPresenStartMinute > sotsuPresenEndMinute) {
            flag = 1;
        }
    }

    if (flag) {
        alert("卒論の発表時間が不正な値です。");
        return false;
    }

    var res = confirm("時間を変更します。よろしいですか？");
    if (res) {
        return true;
    }

    return false;
}
