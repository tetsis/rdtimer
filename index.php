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
$fp = fopen("admin/deadline.dat", "r");
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

$jsonShuAbst = json_encode($timeShuAbst);
$jsonShuPaper = json_encode($timeShuPaper);
$jsonShuPresenStart = json_encode($timeShuPresenStart);
$jsonShuPresenEnd = json_encode($timeShuPresenEnd);
$jsonSotsuAbst = json_encode($timeSotsuAbst);
$jsonSotsuPaper = json_encode($timeSotsuPaper);
$jsonSotsuPresenStart = json_encode($timeSotsuPresenStart);
$jsonSotsuPresenEnd = json_encode($timeSotsuPresenEnd);
?>

<script type=text/javascript>
    var timeShuAbst = <?php echo $jsonShuAbst; ?>;
    var timeShuPaper = <?php echo $jsonShuPaper; ?>;
    var timeShuPresenStart = <?php echo $jsonShuPresenStart; ?>;
    var timeShuPresenEnd = <?php echo $jsonShuPresenEnd; ?>;
    var timeSotsuAbst = <?php echo $jsonSotsuAbst; ?>;
    var timeSotsuPaper = <?php echo $jsonSotsuPaper; ?>;
    var timeSotsuPresenStart = <?php echo $jsonSotsuPresenStart; ?>;
    var timeSotsuPresenEnd = <?php echo $jsonSotsuPresenEnd; ?>;
</script>

<h1>研究締め切りタイマー</h1>
<br/>
<table id="main">
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
        <div id="shu_abst" class="research_deadline_timer"></div>
        <h3 id="shu_abst_date"></h3>
    </td>
    <td>
        <div id="sotsu_abst" class="research_deadline_timer"></div>
        <h3 id="sotsu_abst_date"></h3>
    </td>
</tr>
<tr>
    <td>
        <h2>論文</h2>
    </td>
    <td>
        <div id="shu_paper" class="research_deadline_timer"></div>
        <h3 id="shu_paper_date"></h3>
    </td>
    <td>
        <div id="sotsu_paper" class="research_deadline_timer"></div>
        <h3 id="sotsu_paper_date"></h3>
    </td>
</tr>
<tr>
    <td>
        <h2>発表</h2>
    </td>
    <td>
        <div id="shu_presen" class="research_deadline_timer"></div>
        <h3 id="shu_presen_date"></h3>
    </td>
    <td>
        <div id="sotsu_presen" class="research_deadline_timer"></div>
        <h3 id="sotsu_presen_date"></h3>
    </td>
</tr>
</table>
<div id="owata">
ｵﾜﾀ ＼(^o^)／
</div>
<br/>
<div id="now"></div>
<table id="ganbare">
<tr>
<td>
<div id="ganbare1" class="aa">
　　♪　ﾁｬｯﾁｬｯﾁｬｯ　♪<br>
　　　　　　　∧＿∧<br>
　　　　　　 （･∀･　）<br>
　　　((( ;;"~;;;"~゛;;）<br>
　　　　. ﾐ;,,_,ﾐ;,,_,,;ﾐ<br>
</div>
<div id="ganbare2" class="aa">
　　　　♪　ﾁｬｯﾁｬｯﾁｬｯ　♪<br>
　 　　　　 ∧＿∧<br>
　　　　　 （　･∀･）<br>
　　　　　（;;"~゛;;;~゛;; )))<br>
　　　　　. ﾐ;,,_,,;ﾐ,_,,;ﾐ<br>
</div>
<div id="ganbare3" class="aa">
　　　♪　　うーっ　　♪<br>
　 　　　　 ∧＿∧<br>
　　　　　 （. ･∀･ ）<br>
　　　　　 ;;"~゛;;;"~゛;; <br>
　　　　　 ﾐ;,,_,,;ﾐ,,,_,,;ﾐ<br>
</div>
<div id="ganbare4" class="aa">
　 ♪　　ガンバレ　　♪<br>
　 ;;"~'ﾞ;; .∧＿∧ ;;"~'ﾞ;;<br>
　 ﾐ,,,_,,,ﾐ（ ・∀・ ）ﾐ,,,_,,,ﾐ<br>
　　　　 ＼　　　 ／<br>
　　　　 　|⌒I、│<br>
　　　　　（＿） ノ<br>
　　　　　 　　∪
</div>
</td>
</tr>
</table>
<br/>
</body>
</html>
