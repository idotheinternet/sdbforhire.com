"use strict";
var toggled = true;
const app = document.getElementById("app"),
navElem = document.getElementsByClassName("nav-elem"),
options = document.getElementsByClassName("option"),
active = document.getElementsByClassName("active"),
pre = document.getElementById("pre"),
init = document.getElementById("init"),
loader = document.getElementById("loader"),
initStr = "sdbforhire.open(",
previewBtn = document.getElementsByClassName("item-control"),
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
link = document.getElementById("item-link"),
codeCon = document.getElementById("code-con"),
codeTab = document.getElementsByClassName("tab"),
form = document.getElementById("sdbforhireform"),
fields = document.getElementsByClassName("form-elem");
function initEvent(elems, evt, func) {
	var i = elems.length;
	while(i--) {
		elems[i].addEventListener(evt, func);
	}
}
function toggleNav() {
	!toggled ? (function() {
		navElem[0].classList.add("toggled");
		navElem[1].classList.add("toggled");
		navElem[2].classList.add("toggled");
	}()) : (function() {
		navElem[0].classList.remove("toggled");
		navElem[1].classList.remove("toggled");
		navElem[2].classList.remove("toggled");
	}());
	!toggled ? toggled = true : toggled = false;
}
function togglePage(id) {
	id === "home" ? id = "home" : id = this.id;
	const str1 = initStr + id + ")",
				arr = str1.split(""),
				len = arr.length;
	var str = "",
			i = 0,
			int;
	navElem[0].style.visibility = "hidden";
	function initPage() {
		clearInterval(int);
		init.classList.add("toggled");
		loader.classList.add("toggled");
		setTimeout(function() {
			init.classList.remove("toggled");
		}, 200);
		setTimeout(function() {
			navElem[0].style.visibility = "visible";
			toggleNav();
			toggled = false;
			document.getElementsByClassName(id)[0].classList.add("initialized");
			if(id === "home") doSkillLevels();
		}, 800);
		setTimeout(function() {
			pre.textContent = "";
			init.textContent = "";
			loader.classList.remove("toggled");
		}, 1400);
	}
	int = setInterval(function() {
		i < len ? str += arr[i] : initPage();
		init.textContent = str + "_";
		i++;
	}, 45);
	document.getElementsByClassName("initialized")[0].classList.remove("initialized");
	app.setAttribute("page", id);
	navElem[2].classList.remove("toggled");
	pre.textContent = str1;
	active[0].classList.remove("active");
	document.getElementById(id).classList.add("active");
	canvasAnim(id);
}
function canvasAnim(current) {
  document.getElementById("canvas").remove();
  var pts = [],
  		colors;
  const space = new CanvasSpace("canvas").display(),
        form = new Form(space),
        center = space.size.$divide(1.8),
        mouse = center.clone(),
        count = window.innerWidth * 0.05,
        angle = count * 12,
        line = new Line(0, angle).to(space.size.x, 0),
        r = Math.min(space.size.x, space.size.y) * 1;
	current === "home" ? colors = ["#ff6666", "#ff5050"] :
  current === "work_samples" ? colors = ["#00cc99", "#00cc66"] :
  current ==="code_samples" ? colors = ["#cccc00", "#99cc00"] :
  colors = ["#3399ff", "#3399ff"];
  (function() {
    var i = 0;
    if(count > 200) count = 200;
    while(i < count) {
      const p = new Vector(Math.random()*r-Math.random()*r, Math.random()*r-Math.random()*r);
      p.moveBy(center).rotate2D(i*Math.PI/count, center);
      p.brightness = 0.1;
      pts.push(p);
      i++
    }
  }());
  space.removeAll();
  space.add({
    animate(time, fps, context) {
      (function() {
        var i = pts.length,
        		color;
        while(i--) {
          const pt = pts[i],
                ln = new Line( pt ).to(line.getPerpendicularFromPoint(pt)),
                opacity = Math.min( 0.8, 1 - Math.abs(line.getDistanceFromPoint(pt)) / r),
                distFromMouse = Math.abs(ln.getDistanceFromPoint(mouse));
          current === "home"  ? color = "rgba(255, 102, 102," + pts[i].brightness +")" :
          current === "skills"  ? color = "rgba(0, 204, 153," + pts[i].brightness +")" :
          current === "work_samples"  ? color = "rgba(0, 204, 153," + pts[i].brightness +")" :
          current === "code_samples"  ? color = "rgba(153, 204, 0," + pts[i].brightness +")" :
          color = "rgba(51, 153, 255," + pts[i].brightness +")";
          distFromMouse < 50 && pts[i].brightness < 0.3 ? pts[i].brightness += 0.015 : pts[i].brightness > 0.1 ? pts[i].brightness -= 0.01 : null;
          pt.rotate2D(Const.one_degree / 20, center);
          form.stroke( false ).fill( colors[i % 3] ).point(pt, 1);
          form.stroke(color).fill( true ).line(ln);
        }
      }());
    },
    onMouseAction(type, x, y, evt) {
      if (type=="move") mouse.set(x,y);
    },
    onTouchAction(type, x, y, evt) {
      this.onMouseAction(type, x, y);
    }
  });
  space.bindMouse();
  space.play();
}
navElem[0].addEventListener("click", function() {
	toggleNav();
});
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
function showCode() {
	codeCon.setAttribute("tab", this.id);
}
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
initEvent(item, "mouseover", hov);
initEvent(item, "mouseleave", out);
initEvent(itemToggle, "click", initItem);
initEvent(modalBtn, "click", slide);
initEvent(modalExit, "click", reset);
initEvent(previewBtn, "click", slideIndicators);
initEvent(picIndicator, "click", showItem);
initEvent(codeTab, "click", showCode);
initEvent(options, "click", togglePage);
togglePage("home");











