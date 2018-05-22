"use strict";
var toggled = true;
const app = document.getElementById("app"),
			navElem = document.getElementsByClassName("nav-elem"),
			options = document.getElementsByClassName("option"),
			active = document.getElementsByClassName("active"),
			pre = document.getElementById("pre"),
			init = document.getElementById("init"),
			loader = document.getElementById("loader"),
			initStr = "sdbforhire.apply(";

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
	function initPage() {
		clearInterval(int);
		init.classList.add("toggled");
		loader.classList.add("toggled");
		setTimeout(function() {
			init.classList.remove("toggled");
		}, 200);
		setTimeout(function() {
			toggleNav();
			toggled = false;
			document.getElementsByClassName(id)[0].classList.add("initialized");
			id === "home" ? console.log(true) : console.log(false);
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
  current === "skills" ? colors = ["#00cc99", "#00cc66"] :
  current === "work_samples" ? colors = ["#3399ff", "#0066ff"] :
  current === "contact" ? colors = ["#9966ff", "#9933ff"] :
  colors = ["#cccc00", "#99cc00"];
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
          current === "work_samples"  ? color = "rgba(51, 153, 255," + pts[i].brightness +")" :
          current === "contact"  ? color = "rgba(153, 102, 255," + pts[i].brightness +")" :
          color = "rgba(204, 204, 0," + pts[i].brightness +")";
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
/*
function events(elem, func) {
	var i = elem.length; 
	while(i--) {
		elem[i].addEventListener("click", func)
	}
}

events(options, );
events(navElem[0]);
*/

(function() {
	var i = options.length;
	while(i--) {
		options[i].addEventListener("click", togglePage);
	}
}());

navElem[0].addEventListener("click", function() {
	toggleNav();
});

function events(elem, func) {
	var i = elem.length;
	while(i--) {
		elem[i].addEventListener()
	}
}

togglePage("home");









































