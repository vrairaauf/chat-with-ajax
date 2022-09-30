function getMessage(){
	// 1- elle doit creer une requete ajax pour pour ce connecter au serveur , et notammant au fichier chat.php
	
	const requeteajax=new XMLHttpRequest();
	requeteajax.open("get", "chat.php");

	//2- quand elle recoit les donnees il faut qu'elle les traites en exlpoitant le json et il faut qu'elle affiche ces donnees au format html
	requeteajax.onload=function(){
	const resulta=JSON.parse(requeteajax.responseText);
	let dates=document.querySelectorAll('#date');
	let auteur=document.querySelectorAll('#auteur');
	let contenu=document.querySelectorAll('#contenu');
	let j=9;
	for(let i=0; i<10; i++){
		dates[i].textContent=resulta[j]['date_mes'].substr(10, 9);
		auteur[i].textContent=resulta[j]['auteur_mes']+"     :";
		contenu[i].textContent=resulta[j]['contenu_mes'];
		j--;
	}
	let message =document.querySelector('.messagebox');
	message.style.scrollTop="auto";
	

	console.log(resulta);
	
	}
	//3- on envoie le requete
	requeteajax.send();
}
function postmessage(event){
	event.preventDefault();
	const author=document.querySelector('#author');
	const content=document.querySelector('#content');
	const data=new FormData();
	data.append("author", author.value);
	data.append("content", content.value);
	const requeteajax=new XMLHttpRequest();
	requeteajax.open('POST', 'chat.php?task=write');
	requeteajax.onload=function(){
		content.value="";
		content.focus();
		getMessage();
	}
	requeteajax.send(data);


}

window.onload=function(){
let form=document.querySelector('form');
if(form){

form.addEventListener('submit', postmessage);
}
}
const interval=window.setInterval(getMessage, 3000);
getMessage();