"use strict";
const previewBtn = document.getElementsByClassName("item-control"),
			itemSlider = document.getElementById("item-slider"),
			picIndicator = document.getElementsByClassName("indicator-inner"),
			item = document.getElementsByClassName("item"),
			itemToggle = document.getElementsByClassName("item-toggle"),
			overlay = document.getElementById("overlay"),
			modal = document.getElementById("modal"),
			container = document.getElementById("images"),
			modalBtn = document.getElementsByClassName("control"),
			modalExit = document.getElementsByClassName("exit"),
			indicator = document.getElementById("indicator"),
			name = document.getElementById("item-name"),
			details = document.getElementById("item-details"),
			link = document.getElementById("item-link");

function initItem() {
	const item = workItems[this.id],
				len = item.images.length;
	var i = 0;
	while(i < len) {
		const elem = document.createElement("div");
		elem.setAttribute("index", i);
		elem.style.backgroundImage = "url(" + item.images[i] + ")";
		elem.style.width = 100 / len + "%";
		container.appendChild(elem);
		i++;
	}
	container.children[0].classList.add("current"); 
	container.style.width = 100 * len + "%";
	indicator.style.width = 100 / len + "%";
	name.textContent = item.name;
	details.textContent = item.details;
	link.setAttribute("href", item.link);
	overlay.classList.add("active");
	modal.classList.add("active");
}

function slide() {
	const item = container.children,
				len = item.length,
				elem = document.getElementsByClassName("current")[0],
				current = Number(elem.getAttribute("index"));
	var i;
	this.id === "next" ? current < len-1 ? i = current +1 : i = 0 : current !== 0 ? i = current -1 : i = len -1;
	container.style.transform = "translateX(" + i * -100 / len + "%)";
	indicator.style.transform = "translateX(" + i * 100 + "%)";
	elem.classList.remove("current");
	item[i].classList.add("current");
}

function reset() {
	overlay.classList.remove("active");
	modal.classList.remove("active");
	container.innerHTML = "";
	container.style.transform = "translateX(0%)";
	indicator.style.transform = "translateX(0%)";
}

function slideIndicators() {
	this.id === "move" ? itemSlider.style.transform = "translateX(-50%)" :
	itemSlider.style.transform = "translateX(0%)";
}

function showItem() {
	const id = Number(this.id),
				current = document.getElementsByClassName("show");
	var i = current.length;
	while(i--) {
		current[i].classList.remove("show");
	}
	this.classList.add("show");
	item[id].classList.add("show");
}

function hov() {
	this.classList.add("active");
}
function out() {
	this.classList.remove("active");
}

function initEvent(elems, evt, func) {
	var i = elems.length;
	while(i--) {
		elems[i].addEventListener(evt, func);
	}
}

initEvent(item, "mouseover", hov);
initEvent(item, "mouseleave", out);
initEvent(itemToggle, "click", initItem);
initEvent(modalBtn, "click", slide);
initEvent(modalExit, "click", reset);
initEvent(previewBtn, "click", slideIndicators);
initEvent(picIndicator, "click", showItem);





