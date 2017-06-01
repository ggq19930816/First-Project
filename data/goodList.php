<?php 
	
	header('Content-type: application/json');
	$callback = null;
		$json_data = '[
					{"id" : 1,"src":"http://img07.yiguoimg.com/e/others/170125/9288700730876473.jpg"},
					{"id" : 2,"src":"http://img05.yiguoimg.com/e/others/170515/9288707808273071.jpg"},
					{"id" : 3,"src":"http://img05.yiguoimg.com/e/others/170505/9288707390874277.jpg"},
					{"id" : 4,"src":"http://img07.yiguoimg.com/e/others/161213/9288699405836685.jpg"},
					{"id" : 5,"src":"http://img06.yiguoimg.com/e/others/170503/9288707306660515.jpg"},
					{"id" : 6,"src":"http://img06.yiguoimg.com/e/others/170505/9288707390939813.jpg"},
					{"id" : 7,"src":"http://img07.yiguoimg.com/e/others/170508/9288707506381480.jpg"}
			]';
			$callback = $_REQUEST["callback"];
		echo $callback . "(". $json_data .")";

 ?>