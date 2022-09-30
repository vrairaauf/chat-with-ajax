<?php

$db=new PDO('mysql:host=localhost;dbname=chatbd', 'root', '',[
	PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);
$task="list";
if(array_key_exists("task", $_GET)){
	$task=$_GET['task'];
}
if($task==='write'){
	postMessage();
}else{
	getMessage();
}
function getMessage(){
	global $db;
	$resultat=$db->query('SELECT * FROM message ORDER BY date_mes DESC LIMIT 10');
	$messages=$resultat->fetchAll();
	echo json_encode($messages);
}
function postMessage(){
	global $db;
	if(!array_key_exists("author", $_POST) || !array_key_exists("content", $_POST)){
		echo json_encode(['statu'=>"error", "message"=>"one field or mane das not send"]);
		return;
	}
	$author=$_POST['author'];
	$content=$_POST['content'];
	
	$querry=$db->prepare('INSERT INTO message SET auteur_mes= :author, contenu_mes= :content, date_mes=NOW()');
	$querry->execute([
		"author"=>$author,
		"content" =>$content
	]);
	echo json_encode(['statu'=>'success']);
	return;
} 

?>