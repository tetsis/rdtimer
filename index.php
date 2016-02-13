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
while (!feof($fp)) {
    $str = fgetcsv($fp);
    foreach($str as $value) {
        print "$value,";
    }
}
print "aaa";
phpinfo();
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
            <h3>提出期限：2016年2月4日 16時</h3>
        </td>
        <td>
            <div id="sotsu_abst" class="research_deadline_timer">
            </div>
            <h3>提出期限：2016年2月15日 17時</h3>
        </td>
    </tr>
    <tr>
        <td>
            <h2>論文</h2>
        </td>
        <td>
            <div id="shu_paper" class="research_deadline_timer">
            </div>
            <h3>提出期限：2016年2月9日 15時</h3>
        </td>
        <td>
            <div id="sotsu_paper" class="research_deadline_timer">
            </div>
            <h3>提出期限：2016年2月18日 15時</h3>
        </td>
    </td>
    <tr>
        <td>
            <h2>発表</h2>
        </td>
        <td>
            <div id="shu_presen" class="research_deadline_timer">
            </div>
            <h3>発表時間：2016年2月12日 13時～13時30分</h3>
        </td>
        <td>
            <div id="sotsu_presen" class="research_deadline_timer">
            </div>
            <h3>発表時間：2016年2月23日 11時10分～12時</h3>
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
