"use strict";

function stop(int) {
	clearInterval(int);
}

function skillLevel(skill, delay) {
	var i = 0,
			str = "",
			int;
	const n = Number(skill.getAttribute("level")),
				t = 100 / n + 10;
	setTimeout(function() {
		int = setInterval(function() {
			skill.textContent = str = i;
			i < n ? i++ : stop(int);
		}, t);
	}, delay);
}

function doSkillLevels() {
	const skills = document.getElementsByClassName("skill-level");
	var i = skills.length;
	while(i--) {
		skillLevel(skills[i], (i+1) * 100);
	}
}