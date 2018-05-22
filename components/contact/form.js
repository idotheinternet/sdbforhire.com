"use strict";
const form = document.getElementById("sdbforhireform"),
			fields = document.getElementsByClassName("form-elem");
function botSwater() {
	return !document.getElementById("botswater").value;
}
function validate() {
	const rgx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
	email = fields.email.value,
				len = fields.length;
	var i = 0;
	while(i < len) {
		if(fields[i].required && !fields[i].value) {
			fields[i].parentNode.classList.add("alert");
			setTimeout(function() {
				fields[i].parentNode.classList.remove("alert");
			}, 2000);
			return false;
		} 
		i++;
	}
	return rgx.test(email) ? true : (function() {
		fields.email.parentNode.classList.add("alert");
		setTimeout(function() {
			fields.email.parentNode.classList.remove("alert");
		}, 2000);
	}());
}
function getData() {
	var data = {},
			arr = [],
			i = fields.length;
	while(--i) {
		if(fields[i].required || fields[i].value) data[fields[i].name] = fields[i].value, arr.push(fields[i].name);
	}
	data.format = JSON.stringify(arr.reverse());
	return data;
}	 
function sendData() {
	return !botSwater() || !validate() ? null : (function() {
		const data = getData(),
					xhr = new XMLHttpRequest(),
					encoded = Object.keys(data).map(function(i) {
						return encodeURIComponent(i) + "=" + encodeURIComponent(data[i]);
					}).join("&");
		xhr.open("POST", "https://script.google.com/macros/s/AKfycbwnaIMDrxH75eIoE5sW8kVrTHE3Nk9S5UxM3SE-vnuL5FExOBg/exec");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(encoded);
		thanks();
	}());
}
function thanks() {
	const thanks = document.getElementById("thanks");
	var i = fields.length;
	while(--i) {
		fields[i].parentNode.classList.remove("focused");
	}
	form.reset();
	thanks.style.transform = "translate(-50%, -50%) scale(1)";
	setTimeout(function() {
		thanks.style.transform = "translate(-50%, -50%) scale(0)";
	}, 3000);
}
(function() {
	var i = fields.length;
	while(--i) {
		fields[i].addEventListener("focus", function() {
			this.parentNode.classList.add("focused");
		});
		fields[i].addEventListener("blur", function() {
			if(!this.value) this.parentNode.classList.remove("focused");
		});
	}
}());
document.getElementById("submit").addEventListener("click", function(evt) {
	evt.preventDefault();
	sendData();
});
























