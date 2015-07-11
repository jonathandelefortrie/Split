var _width = window.innerWidth;
var _height = window.innerHeight;

var base = _width/2;

var mouseX = 0 * 0.5;
var mouseY = 0 * 0.5;

var container = document.getElementById("container");
container.width = _width;
container.height = _height;

var cvs = document.createElement("canvas");
var ctx = cvs.getContext('2d');
container.appendChild(cvs);
cvs.width = container.width;
cvs.height = container.height;

(function Main(){

	var arrayChildren = new Array();
	arrayChildren.push(new Circle({

		p: { x: _width/2, y: _height/2 },
		s: _width/4

	}));

	loop = function() {

		ctx.clearRect(0,0,_width,_height);

		for (i in arrayChildren) {
			arrayChildren[i].draw();

			distance = Math.sqrt(Math.pow(mouseX-arrayChildren[i].px,2)+Math.pow(mouseY-arrayChildren[i].py,2));

			if(distance < arrayChildren[i].r/2){
				
				for (var u = 0; u < 4; u++) {

					var xm = (u==0 || u==2) ? 1 : 3;
					var ym = (u==0 || u==1) ? 1 : 3;

					var x = (((arrayChildren[i].s*2)/4)*xm) + (arrayChildren[i].px - arrayChildren[i].s);
					var y = (((arrayChildren[i].s*2)/4)*ym) + (arrayChildren[i].py - arrayChildren[i].s);
					var s = ((arrayChildren[i].s*2)/4);

					child = new Circle({p: { x:x , y:y  },s: s});
					arrayChildren.push(child);

				};
				arrayChildren[i].destroy();
				arrayChildren.splice(i,1);
			}
		};

	}

	var interval = setInterval( loop, 1000/25 );

})();

function Circle(args) {

	var color = function() {
		return 'rgba(' + Math.floor(Math.random() * 255) + ', ' +Math.floor(Math.random() * 255)+', ' + Math.floor(Math.random() * 255) +', 1 )';
	}

	this.px = args.p.x;
	this.py = args.p.y;
	this.s = args.s;
	this.r = this.s*2;
	this.l = base/(this.s*2);
	this.c = color();

	this.draw = function(){

		var e = this;
		ctx.beginPath();
		ctx.fillStyle = e.c;
		ctx.arc(e.px, e.py, e.s, 0, Math.PI*2, true);
		ctx.fill();
	}
	this.destroy = function(){

		var e = this;
		for (key in e) { e[key]=null; }
	}
}

document.addEventListener('mousemove', function(event){
	mouseX = event.clientX - (window.innerWidth - _width) * .5;
	mouseY = event.clientY - (window.innerHeight - _height) * .5;
});