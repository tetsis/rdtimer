<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <!--<meta http-equiv="refresh" content="43200">-->
    <meta http-equiv="refresh" content="5000;URL=index.php">
    <title>研究締め切りタイマー</title>
    <script type="text/javascript" src="research_deadline_timer.js"></script>
    <link rel="stylesheet" type="text/css" href="main.css">
</head>
<body>

<?php
$fp = fopen("admin/date.dat", "r");
if ($fp) {
    $timeShuAbst = fgetcsv($fp);
    $timeShuPaper = fgetcsv($fp);
    $timeShuPresen = fgetcsv($fp);
    $timeSotsuAbst = fgetcsv($fp);
    $timeSotsuPaper = fgetcsv($fp);
    $timeSotsuPresen = fgetcsv($fp);
}
fclose($fp);

$jsonShuAbst = json_encode($timeShuAbst);
$jsonShuPaper = json_encode($timeShuPaper);
$jsonShuPresen = json_encode($timeShuPresen);
$jsonSotsuAbst = json_encode($timeSotsuAbst);
$jsonSotsuPaper = json_encode($timeSotsuPaper);
$jsonSotsuPresen = json_encode($timeSotsuPresen);
?>

    <script type=text/javascript>var timeShuAbst = <?php echo $jsonShuAbst; ?>;</script>
    <script type=text/javascript>var timeShuPaper = <?php echo $jsonShuPaper; ?>;</script>
    <script type=text/javascript>var timeShuPresen = <?php echo $jsonShuPresen; ?>;</script>
    <script type=text/javascript>var timeSotsuAbst = <?php echo $jsonSotsuAbst; ?>;</script>
    <script type=text/javascript>var timeSotsuPaper = <?php echo $jsonSotsuPaper; ?>;</script>
    <script type=text/javascript>var timeSotsuPresen = <?php echo $jsonSotsuPresen; ?>;</script>

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
            print "提出期限：{$timeShuAbst[0]}年{$timeShuAbst[1]}月{$timeShuAbst[2]}日 {$timeShuAbst[3]}時";
            if ($timeShuAbst[4]) {
                print "{$timeShuAbst[4]}分";
            }
            ?>
            </h3>
        </td>
        <td>
            <div id="sotsu_abst" class="research_deadline_timer">
            </div>
            <h3>
            <?php
            print "提出期限：{$timeSotsuAbst[0]}年{$timeSotsuAbst[1]}月{$timeSotsuAbst[2]}日 {$timeSotsuAbst[3]}時";
            if ($timeSotsuAbst[4]) {
                print "{$timeSotsuAbst[4]}分";
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
            print "提出期限：{$timeShuPaper[0]}年{$timeShuPaper[1]}月{$timeShuPaper[2]}日 {$timeShuPaper[3]}時";
            if ($timeShuPaper[4]) {
                print "{$timeShuPaper[4]}分";
            }
            ?>
            </h3>
        </td>
        <td>
            <div id="sotsu_paper" class="research_deadline_timer">
            </div>
            <h3>
            <?php
            print "提出期限：{$timeSotsuPaper[0]}年{$timeSotsuPaper[1]}月{$timeSotsuPaper[2]}日 {$timeSotsuPaper[3]}時";
            if ($timeSotsuPaper[4]) {
                print "{$timeSotsuPaper[4]}分";
            }
            ?>
            </h3>
        </td>
    </tr>
    <tr>
        <td>
            <h2>発表</h2>
        </td>
        <td>
            <div id="shu_presen" class="research_deadline_timer">
            </div>
            <h3>
            <?php
            print "発表時間：{$timeShuPresen[0]}年{$timeShuPresen[1]}月{$timeShuPresen[2]}日 {$timeShuPresen[3]}時";
            if ($timeShuPresen[4]) {
                print "{$timeShuPresen[4]}分";
            }
            print "～{$timeShuPresen[5]}時";
            if ($timeShuPresen[6]) {
                print "{$timeShuPresen[6]}分";
            }
            ?>
            </h3>
        </td>
        <td>
            <div id="sotsu_presen" class="research_deadline_timer">
            </div>
            <h3>
            <?php
            print "発表時間：{$timeSotsuPresen[0]}年{$timeSotsuPresen[1]}月{$timeSotsuPresen[2]}日 {$timeSotsuPresen[3]}時";
            if ($timeSotsuPresen[4]) {
                print "{$timeSotsuPresen[4]}分";
            }
            print "～{$timeSotsuPresen[5]}時";
            if ($timeSotsuPresen[6]) {
                print "{$timeSotsuPresen[6]}分";
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
