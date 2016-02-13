<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <!--<meta http-equiv="refresh" content="43200">-->
    <meta http-equiv="refresh" content="5000;URL=index.php">
    <title>研究締め切りタイマー</title>
    <link rel="stylesheet" type="text/css" href="main.css">
    <script type="text/javascript" src="research_deadline_timer.js"></script>
</head>
<body>

<?php
$fp = fopen("admin/date.dat", "r");
if ($fp) {
    $shuAbst = fgetcsv($fp);
    $shuPaper = fgetcsv($fp);
    $shuPresen = fgetcsv($fp);
    $sotsuAbst = fgetcsv($fp);
    $sotsuPaper = fgetcsv($fp);
    $sotsuPresen = fgetcsv($fp);
}
fclose($fp);
?>

<h1>研究締め切りタイマー</h1>
<br/>
<div id="table">
    <table>
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
            <div id="shu_abst" class="research_deadline_timer">
            </div>
            <h3>
            <?php
            print "提出期限：{$shuAbst[0]}年{$shuAbst[1]}月{$shuAbst[2]}日 {$shuAbst[3]}時";
            if ($shuAbst[4]) {
                print "{$shuAbst[4]}分";
            }
            ?>
            </h3>
        </td>
        <td>
            <div id="sotsu_abst" class="research_deadline_timer">
            </div>
            <h3>
            <?php
            print "提出期限：{$sotsuAbst[0]}年{$sotsuAbst[1]}月{$sotsuAbst[2]}日 {$sotsuAbst[3]}時";
            if ($sotsuAbst[4]) {
                print "{$sotsuAbst[4]}分";
            }
            ?>
            </h3>
        </td>
    </tr>
    <tr>
        <td>
            <h2>論文</h2>
        </td>
        <td>
            <div id="shu_paper" class="research_deadline_timer">
            </div>
            <h3>
            <?php
            print "提出期限：{$shuPaper[0]}年{$shuPaper[1]}月{$shuPaper[2]}日 {$shuPaper[3]}時";
            if ($shuPaper[4]) {
                print "{$shuPaper[4]}分";
            }
            ?>
            </h3>
        </td>
        <td>
            <div id="sotsu_paper" class="research_deadline_timer">
            </div>
            <h3>
            <?php
            print "提出期限：{$sotsuPaper[0]}年{$sotsuPaper[1]}月{$sotsuPaper[2]}日 {$sotsuPaper[3]}時";
            if ($sotsuPaper[4]) {
                print "{$sotsuPaper[4]}分";
            }
            ?>
            </h3>
        </td>
    </td>
    <tr>
        <td>
            <h2>発表</h2>
        </td>
        <td>
            <div id="shu_presen" class="research_deadline_timer">
            </div>
            <h3>
            <?php
            print "発表時間：{$shuPresen[0]}年{$shuPresen[1]}月{$shuPresen[2]}日 {$shuPresen[3]}時";
            if ($shuPresen[4]) {
                print "{$shuPresen[4]}分";
            }
            print "～{$shuPresen[5]}時";
            if ($shuPresen[6]) {
                print "{$shuPresen[6]}分";
            }
            ?>
            </h3>
        </td>
        <td>
            <div id="sotsu_presen" class="research_deadline_timer">
            </div>
            <h3>
            <?php
            print "発表時間：{$sotsuPresen[0]}年{$sotsuPresen[1]}月{$sotsuPresen[2]}日 {$sotsuPresen[3]}時";
            if ($sotsuPresen[4]) {
                print "{$sotsuPresen[4]}分";
            }
            print "～{$sotsuPresen[5]}時";
            if ($sotsuPresen[6]) {
                print "{$sotsuPresen[6]}分";
            }
            ?>
            </h3>
        </td>
    </tr>
    </table>
</div>
<div id="owata">
ｵﾜﾀ ＼(^o^)／
</div>
<br/>
<br/>
<br/>
<div id="now"></div>
<br/>
</body>
</html>
