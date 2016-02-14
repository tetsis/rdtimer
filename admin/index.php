<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>管理者画面</title>
    <link rel="stylesheet" type="text/css" href="../main.css">
</head>
<body>

<?php
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
}
fclose($fp);
?>

<form method = 'post'>
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
        <div>
        提出期限：
        <select name='shu_abst_year'>
        <?php
            for ($i = 2015; $i <= 2030; $i++) {
                $selected = "";
                if ($i == $timeShuAbst[0]) $selected = "selected";
                print "<option value=$i $selected>$i</option>";
            }
        ?>
        </select>
        年
        <select name='shu_abst_month'>
        <?php
            for ($i = 1; $i <= 12; $i++) {
                $selected = "";
                if ($i == $timeShuAbst[1]) $selected = "selected";
                print "<option value=$i $selected>$i</option>";
            }
        ?>
        </select>
        月
        <select name='shu_abst_day'>
        <?php
            for ($i = 1; $i <= 31; $i++) {
                $selected = "";
                if ($i == $timeShuAbst[2]) $selected = "selected";
                print "<option value=$i $selected>$i</option>";
            }
        ?>
        </select>
        日
        <select name='shu_abst_hour'>
        <?php
            for ($i = 0; $i <= 23; $i++) {
                $selected = "";
                if ($i == $timeShuAbst[3]) $selected = "selected";
                print "<option value=$i $selected>$i</option>";
            }
        ?>
        </select>
        時
        <select name='shu_abst_minute'>
        <?php
            for ($i = 0; $i <= 59; $i++) {
                $selected = "";
                if ($i == $timeShuAbst[4]) $selected = "selected";
                print "<option value=$i $selected>$i</option>";
            }
        ?>
        </select>
        分
        </div>
        <div id="shu_abst" class="research_deadline_timer"></div>
    </td>
    <td>
    </td>
</tr>
<tr>
    <td>
        <h2>論文</h2>
    </td>
    <td>
    </td>
    <td>
    </td>
</tr>
<tr>
    <td>
        <h2>発表</h2>
    </td>
    <td>
    </td>
    <td>
    </td>
</tr>
</table>
<br/>
<br/>
<br/>
<input type = 'submit' name = 'update' value = '更新'/>

</form>
</body>
</html>
