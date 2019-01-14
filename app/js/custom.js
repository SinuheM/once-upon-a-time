"use strict";
//$(function() {
	/* $(function() {
		$(".preloader").fadeOut();
	}); */

	//this.classList.contains('bad')
	//this.classList.remove('bad');
	//this.classList.add('good');

	document.getElementById('goStory').addEventListener('click', (ev) => {
		ev.preventDefault();
		let home = document.getElementById('home');
		home.classList.add("fade-out");
		setTimeout(() => { 
			home.classList.remove("active"); 
			home.classList.remove("fade-out"); 
			initStory(); 
		}, 1700);
	});

	document.getElementById('goPlay').addEventListener('click', (ev) => {
		ev.preventDefault();
		let home = document.getElementById('home');
		home.classList.add("fade-out");
		setTimeout(() => { 
			home.classList.remove("active"); 
			home.classList.remove("fade-out"); 
			initGame();
		}, 1700);
	});

	Array.from(document.getElementsByClassName('backHome')).forEach(el => {
		el.addEventListener('click', (ev) => {
			ev.preventDefault();
			audio.pause();
			let home = document.getElementById('home');

			let section = document.getElementsByTagName("section");
			for(let j=0; j < section.length; j++){
				section[j].classList.remove("active");
			}

			home.classList.add("active");
		});	
	});

	Array.from(document.getElementsByClassName('modal-close')).forEach(el => {
		el.addEventListener('click', (ev) => { closeModal(ev); })
	});

	var closeModal = (ev) => {
		ev.preventDefault();
		let el = ev.currentTarget;
		while(!el.classList.contains("modal")){
			el = el.parentElement;
		}
		el.classList.remove("modal-active");
	}
//});