var imageData, constraints = { video: true, audio: false };

var URL = window.URL ||
    window.webkitURL ||
        window.msURL ||
           window.oURL;

navigator.getUserMedia = navigator.getUserMedia ||
                   navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;

var mouseX = 0 * 0.5;
var mouseY = 0 * 0.5;
var width = window.innerWidth;
var height = window.innerHeight;

var container = document.getElementById("container");
container.style.width = 320 + 'px';
container.style.height = 240 + 'px';
container.style.backgroundColor= '#CCCCCC';

var cvs = document.createElement("canvas");
var ctx = cvs.getContext('2d');
container.appendChild(cvs);
cvs.width = 320;
cvs.height = 240;

// Origin pixel
var cvs2 = document.createElement("canvas");
var ctx2 = cvs2.getContext('2d');
cvs2.width = 320;
cvs2.height = 240;

// Origin source
var vid = document.createElement('video');
//document.body.appendChild(vid);
vid.width = 320;
vid.height = 240;

(function Main(){

	arrayChildren = new Array();

	ClassCircle = new Circle();
	FirstChild = new ClassCircle.circle({p: { x: 320/2, y: 240/2 },s: 240/2});
	arrayChildren.push(FirstChild);

	draw = function() {

        setTimeout(function() {

			ctx.clearRect(0,0,320, 240);
			ctx2.clearRect(0,0,320, 240);
			ctx2.drawImage(vid, 0, 0, 320, 240);

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

						child = new ClassCircle.circle({p: { x:x , y:y  },s: s});
						arrayChildren.push(child);

					};
					arrayChildren[i].destroy();
					arrayChildren.splice(i,1);
				}
			};

			draw();

	  	}, 1000/25 );

	}

})();

function Circle() {

	this.circle = function(args){

		this.px = args.p.x;
		this.py = args.p.y;
		this.s = args.s;
		this.r = this.s*2;

	}
	this.circle.prototype.draw = function(){

		var e = this;
		ctx.beginPath();
		ctx.fillStyle = color(this.px,this.py);
		ctx.arc(e.px, e.py, e.s, 0, Math.PI*2, true);
		ctx.fill();
	}
	this.circle.prototype.destroy = function(){

		var e = this;
		for (key in e) { e[key]=null; }
	}

	color = function(x,y) {

		data = ctx2.getImageData(x, y, 1, 1).data;
		return 'rgba(' + data[0] + ', ' + data[1] +', ' + data[2] +', ' + data[3] + ' )';
	}
}

document.addEventListener('mousemove', function(event){
	mouseX = event.clientX - (window.innerWidth - width) * .5;
	mouseY = event.clientY - (window.innerHeight - height) * .5;
});

if (navigator.getUserMedia)
    navigator.getUserMedia(constraints,

        function(stream) {

            window.stream = stream;

            vid.src = URL.createObjectURL(stream);
            vid.play();

        }, function(error) {log("An error occurred: [CODE " + error.code + "]");}
    );
else log("Native web camera streaming is not supported in this browser!");