"use strict";
(function() {
	var i = 0;
	const con = document.getElementById("code-con"),
	tab = document.getElementsByClassName("tab"), 
	len = tab.length;
	while(i < len) {
		tab[i].addEventListener("click", function() {
			con.setAttribute("tab", this.id);
		});
		i++;
	}
}());