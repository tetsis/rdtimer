<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>管理者画面</title>
    <link rel="stylesheet" type="text/css" href="../main.css">
    <script type="text/javascript" src="input_checker.js"></script>
</head>
<body>

<div id="link">
<a href = "../">元の画面へ</a>
</div>
<h1>研究締め切りタイマー　管理者画面</h1>

<form method = 'post' name = 'form' onSubmit = 'return checkInput()'>

<?php

//「更新」ボタンを押した時の処理
if ($_POST['update']) {
    $shuAbstStr = createTimeStringOfAbstAndPaper('shu_abst');
    $shuPaperStr = createTimeStringOfAbstAndPaper('shu_paper');
    $shuPresenStartStr = createTimeStringOfPresen('shu_presen', 'start');
    $shuPresenEndStr = createTimeStringOfPresen('shu_presen', 'end');
    $sotsuAbstStr = createTimeStringOfAbstAndPaper('sotsu_abst');
    $sotsuPaperStr = createTimeStringOfAbstAndPaper('sotsu_paper');
    $sotsuPresenStartStr = createTimeStringOfPresen('sotsu_presen', 'start');
    $sotsuPresenEndStr = createTimeStringOfPresen('sotsu_presen', 'end');

    //データファイルの書き込み
    $fp = fopen("deadline.dat", "w");
    if ($fp) {
        fputs($fp, $shuAbstStr. "\n");
        fputs($fp, $shuPaperStr. "\n");
        fputs($fp, $shuPresenStartStr. "\n");
        fputs($fp, $shuPresenEndStr. "\n");
        fputs($fp, $sotsuAbstStr. "\n");
        fputs($fp, $sotsuPaperStr. "\n");
        fputs($fp, $sotsuPresenStartStr. "\n");
        fputs($fp, $sotsuPresenEndStr. "\n");
        fclose($fp);
    }
    else {
        echo "ファイルの書き込みに失敗しました。deadline.datファイルの権限を確認してください。";
        exit(1);
    }
}

//データファイルの読み込み
$fp = fopen("deadline.dat", "r");
if ($fp) {
    $timeShuAbst = fgetcsv($fp);
    $timeShuPaper = fgetcsv($fp);
    $timeShuPresenStart = fgetcsv($fp);
    $timeShuPresenEnd = fgetcsv($fp);
    $timeSotsuAbst = fgetcsv($fp);
    $timeSotsuPaper = fgetcsv($fp);
    $timeSotsuPresenStart = fgetcsv($fp);
    $timeSotsuPresenEnd = fgetcsv($fp);
    fclose($fp);
}
else {
    echo "ファイルの読み込みに失敗しました。";
    exit(1);
}
?>

<table id='main'>
<tr>
    <td>
    </td>
    <td>
        <h2>修論</h2>
    </td>
    <td>
        <h2>卒論</h2>
    </td>
</tr>
<tr>
    <td>
        <h2>アブスト</h2>
    </td>
    <td>
        <h3>
        <?php
            displaySettingOfAbstAndPaper($timeShuAbst, 'shu_abst');
        ?>
        </h3>
    </td>
    <td>
        <h3>
        <?php
            displaySettingOfAbstAndPaper($timeSotsuAbst, 'sotsu_abst');
        ?>
        </h3>
    </td>
</tr>
<tr>
    <td>
        <h2>論文</h2>
    </td>
    <td>
        <h3>
        <?php
            displaySettingOfAbstAndPaper($timeShuPaper, 'shu_paper');
        ?>
        </h3>
    </td>
    <td>
        <h3>
        <?php
            displaySettingOfAbstAndPaper($timeSotsuPaper, 'sotsu_paper');
        ?>
        </h3>
    </td>
</tr>
<tr>
    <td>
        <h2>発表</h2>
    </td>
    <td>
        <h3>
        <?php
            displaySettingOfPresen($timeShuPresenStart, $timeShuPresenEnd, 'shu_presen');
        ?>
        </h3>
    </td>
    <td>
        <h3>
        <?php
            displaySettingOfPresen($timeSotsuPresenStart, $timeSotsuPresenEnd, 'sotsu_presen');
        ?>
        </h3>
    </td>
</tr>
</table>
<br/>
<div id='update'>
<input type = 'submit' name = 'update' value = '更新'/>
</div>

</form>
</body>
</html>


<?php
//アブストと論文の設定画面を表示する関数
function displaySettingOfAbstAndPaper($time, $str) {
    $yearStr = $str. '_year';
    $monthStr = $str. '_month';
    $dayStr = $str. '_day';
    $hourStr = $str. '_hour';
    $minuteStr = $str. '_minute';

    print "提出期限：";
    displaySelectOfYear($yearStr, $time[0]);
    displaySelectOfMonth($monthStr, $time[1]);
    displaySelectOfDay($dayStr, $time[2]);
    displaySelectOfHour($hourStr, $time[3]);
    displaySelectOfMinute($minuteStr, $time[4]);
}

//発表の設定画面を表示する関数
function displaySettingOfPresen($startTime, $endTime, $str) {
    $yearStr = $str. '_year';
    $monthStr = $str. '_month';
    $dayStr = $str. '_day';
    $startHourStr = $str. '_start_hour';
    $startMinuteStr = $str. '_start_minute';
    $endHourStr = $str. '_end_hour';
    $endMinuteStr = $str. '_end_minute';

    print "発表時間：";
    displaySelectOfYear($yearStr, $startTime[0]);
    displaySelectOfMonth($monthStr, $startTime[1]);
    displaySelectOfDay($dayStr, $startTime[2]);
    displaySelectOfHour($startHourStr, $startTime[3]);
    displaySelectOfMinute($startMinuteStr, $startTime[4]);
    print "<br/>\n";
    print "～ ";
    displaySelectOfHour($endHourStr, $endTime[3]);
    displaySelectOfMinute($endMinuteStr, $endTime[4]);
}

//年を選択する画面を表示する関数
function displaySelectOfYear($str, $time) {
    print "<select name=$str>";
    for ($i = 2015; $i <= 2030; $i++) {
        $selected = "";
        if ($i == $time) $selected = "selected";
        print "<option value=$i $selected>$i</option>";
    }
    print "</select>";
    print "年 ";
}

//月を選択する画面を表示する関数
function displaySelectOfMonth($str, $time) {
    print "<select name=$str>";
    for ($i = 1; $i <= 12; $i++) {
        $selected = "";
        if ($i == $time) $selected = "selected";
        print "<option value=$i $selected>$i</option>";
    }
    print "</select>";
    print "月 ";
}

//日を選択する画面を表示する関数
function displaySelectOfDay($str, $time) {
    print "<select name=$str>";
    for ($i = 1; $i <= 31; $i++) {
        $selected = "";
        if ($i == $time) $selected = "selected";
        print "<option value=$i $selected>$i</option>";
    }
    print "</select>";
    print "日 ";
}

//時間を選択する画面を表示する関数
function displaySelectOfHour($str, $time) {
    print "<select name=$str>";
    for ($i = 0; $i <= 23; $i++) {
        $selected = "";
        if ($i == $time) $selected = "selected";
        print "<option value=$i $selected>$i</option>";
    }
    print "</select>";
    print "時 ";
}

//分を選択する画面を表示する関数
function displaySelectOfMinute($str, $time) {
    print "<select name=$str>";
    for ($i = 0; $i <= 59; $i++) {
        $selected = "";
        if ($i == $time) $selected = "selected";
        print "<option value=$i $selected>$i</option>";
    }
    print "</select>";
    print "分 ";
}

//アブストと論文のデータファイルに書き込む文字列を作成する関数
function createTimeStringOfAbstAndPaper($str) {
    $yearStr = $str. '_year';
    $monthStr = $str. '_month';
    $dayStr = $str. '_day';
    $hourStr = $str. '_hour';
    $minuteStr = $str. '_minute';
    $str = $_POST[$yearStr]. ','.
        $_POST[$monthStr]. ','.
        $_POST[$dayStr]. ','.
        $_POST[$hourStr]. ','.
        $_POST[$minuteStr];

    return $str;
}

//発表のデータファイルに書き込む文字列を作成する関数
function createTimeStringOfPresen($str, $startOrEnd) {
    $yearStr = $str. '_year';
    $monthStr = $str. '_month';
    $dayStr = $str. '_day';
    $hourStr = $str. '_'. $startOrEnd. '_hour';
    $minuteStr = $str. '_'. $startOrEnd. '_minute';
    $str = $_POST[$yearStr]. ','.
        $_POST[$monthStr]. ','.
        $_POST[$dayStr]. ','.
        $_POST[$hourStr]. ','.
        $_POST[$minuteStr];

    return $str;
}
?>
