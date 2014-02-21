var _width = window.innerWidth;
var _height = window.innerHeight;

var container = document.getElementById("container");
container.width = _width;
container.height = _height;

var cvs = document.createElement("canvas");
var ctx = cvs.getContext('2d');
container.appendChild(cvs);
cvs.width = container.width;
cvs.height = container.height;


(function Main(){

	id = 0;
	mouseX = 0 * 0.5;
	mouseY = 0 * 0.5;

	arrayChildren = new Array();

	ClassCircle = new Circle();
	FirstChild = new ClassCircle.circle({

		p: { x: _width/2, y: _height/2 },
		s: _width/4

	});

	arrayChildren.push(FirstChild);

	loop = function() {

		ctx.clearRect(0,0,_width,_height);

		for (i in arrayChildren) {
			arrayChildren[i].draw();

			distance = Math.sqrt(Math.pow(mouseX-arrayChildren[i].px,2)+Math.pow(mouseY-arrayChildren[i].py,2));

			if(distance < arrayChildren[i].r/2){
				console.log('ok');
				/*for (var i = 0; i < 4; i++) {
					child = new ClassCircle.circle({

						p: { x: _width/2, y: _height/2 },// Change position
						s: _width/4 // Change size

					});
					arrayChildren.push(child);
				};*/
				//arrayChildren[].destroy();
			}
		};

	}

	var interval = setInterval( loop, 1000/25 );

})();

function Circle() {

	this.circle = function(args){

		this.px = args.p.x;
		this.py = args.p.y;
		this.s = args.s;
		this.r = this.s*2;
		this.d = false;
		this.c = color();

	}

	this.circle.prototype.draw = function(){

		var e = this;

		ctx.beginPath();
		ctx.fillStyle = e.c;
		ctx.arc(e.px, e.py, e.s, 0, Math.PI*2, true);
		ctx.fill();
	}

	color = function() {

		return 'rgba(' + Math.floor(Math.random() * 255) + ', ' +Math.floor(Math.random() * 255)+', ' + Math.floor(Math.random() * 255) +', 1 )';
	}

	this.circle.prototype.destroy = function(){
		var e = this;
		for (key in e) { e[key]=null; }
	}
}

document.addEventListener('mousemove', function(event){
	mouseX = event.clientX - (window.innerWidth - _width) * .5;
	mouseY = event.clientY - (window.innerHeight - _height) * .5;
});