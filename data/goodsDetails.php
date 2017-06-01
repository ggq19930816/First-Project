<?php 
	
	header('Content-type: application/json');
	$callback = null;
		$json_data = '[
					{
						"id" : 1,
						"title":"Zespri佳沛新西兰阳光金奇异果2个134-175g/个",
						"show":"满满阳光活力",
						"price":25.80,
						"bigImg":"http://img11.yiguoimg.com/e/items/2017/170427/9288707178635931_500.jpg",
						"smallImg1":"http://img11.yiguoimg.com/e/items/2017/170427/9288707178635931_500.jpg",
						"smallImg2":"http://img13.yiguoimg.com/e/items/2017/170421/9288706833621653_500.jpg",
						"smallImg3":"http://img09.yiguoimg.com/e/items/2017/170421/9288706833654421_500.jpg"
					},
					{
						"id" : 2,
						"title":"美国加州樱桃2磅果径26-28mm(北京)",
						"show":"加州大甜妞 一口一口吃不停",
						"price":119.00,
						"bigImg":"http://img11.yiguoimg.com/e/items/2017/170505/9288707403621029_500.jpg",
						"smallImg1":"http://img11.yiguoimg.com/e/items/2017/170505/9288707403621029_500.jpg",
						"smallImg2":"http://img12.yiguoimg.com/e/items/2017/170504/9288707358073508_500.jpg",
						"smallImg3":"http://img12.yiguoimg.com/e/items/2017/170504/9288707358007972_500.jpg"
					},
					{
						"id" : 3,
						"title":"墨西哥牛油果4个130-160g/个（北京）",
						"show":"清香细滑，入口即化",
						"price":59.00,
						"bigImg":"http://img10.yiguoimg.com/e/items/2016/160815/9288696391442703_500.jpg",
						"smallImg1":"http://img10.yiguoimg.com/e/items/2016/160815/9288696391442703_500.jpg",
						"smallImg2":"http://img10.yiguoimg.com/e/items/2016/160815/9288696391409935_500.jpg",
						"smallImg3":"http://img09.yiguoimg.com/e/items/2016/160815/9288696391377167_500.jpg"
					},
					{
						"id" : 4,
						"title":"越南白心火龙果4个400g以上/个(北京)",
						"show":"口口清爽嫩滑",
						"price":35.80,
						"bigImg":"http://img10.yiguoimg.com/e/items/2017/170519/9288708063765171_500.jpg",
						"smallImg1":"http://img10.yiguoimg.com/e/items/2017/170519/9288708063765171_500.jpg",
						"smallImg2":"http://img10.yiguoimg.com/e/items/2017/170519/9288708063830707_500.jpg",
						"smallImg3":"http://img12.yiguoimg.com/e/items/2017/170519/9288708063797939_500.jpg"
					},
					{
						"id" : 5,
						"title":"新奇士美国晚季脐橙6个160g以上/个(北京)",
						"show":"更长生长期，更浓橙滋味",
						"price":45.00,
						"bigImg":"http://img09.yiguoimg.com/e/items/2017/170410/9288706334204554_500.jpg",
						"smallImg1":"http://img09.yiguoimg.com/e/items/2017/170410/9288706334204554_500.jpg",
						"smallImg2":"http://img09.yiguoimg.com/e/items/2017/170410/9288706334237322_500.jpg",
						"smallImg3":"http://img11.yiguoimg.com/e/items/2017/170410/9288706334270090_500.jpg"
					},
					{
						"id" : 6,
						"title":"Mr APPLE新西兰皇家嘎啦果12个120g以上/个(北京)",
						"show":"一口纯脆，十分喜悦",
						"price":49.00,
						"bigImg":"http://img11.yiguoimg.com/e/items/2017/170412/9288706413077132_500.jpg",
						"smallImg1":"http://img11.yiguoimg.com/e/items/2017/170412/9288706413077132_500.jpg",
						"smallImg2":"http://img12.yiguoimg.com/e/items/2017/170412/9288706413044364_500.jpg",
						"smallImg3":"http://img10.yiguoimg.com/e/items/2017/170412/9288706413109900_500.jpg"
					},
					{
						"id" : 7,
						"title":"泰国金枕头榴莲9-10斤(约1-2个)(北京)",
						"show":"该商品不与U币、其他优惠券、现金券及抵用卡同享",
						"price":149.00,
						"bigImg":"http://img12.yiguoimg.com/e/items/2017/170505/9288707404505765_500.jpg",
						"smallImg1":"http://img12.yiguoimg.com/e/items/2017/170505/9288707404505765_500.jpg",
						"smallImg2":"http://img12.yiguoimg.com/e/items/2016/160428/9288693810372764_500.jpg",
						"smallImg3":"http://img10.yiguoimg.com/e/items/2016/160913/9288697163325741_500.jpg"
					}
			]';
			$callback = $_REQUEST["callback"];
		echo $callback . "(". $json_data .")";

 ?>