// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


$( document ).ready(function() {
    
    
    var word = window.location.search;
    
    word = word.replace('%20',' ');
    
    word = word.split("name=")[1];
    
    var letters = word.split("");
    
    for(var i=0;i<letters.length;i++){
        new LetterCanvas(letters[i]);
    }
    
    
   // new NameCanvas();
    
});


var letterPoints = {
    a:{
        lines:[
            {
                start:{
                    x:75,
                    y:40
                },
                end:{
                    x:37,
                    y:170
                },
                count:5
            },
            {
                start:{
                    x:75,
                    y:40
                },
                end:{
                    x:113,
                    y:170
                },
                count:5
            }
        ],
        points:[
            {
                x:75,
                y:148
            }
        ]
    },
    b:{
        lines:[],
        points:[
            {
                x:34,
                y:40
            },
            {
                x:66,
                y:40
            },
            {
                x:96,
                y:46
            },
            {
                x:110,
                y:74
            },
            {
                x:97,
                y:104
            },
            {
                x:66,
                y:104
            },
            {
                x:34,
                y:104
            },
            {
                x:34,
                y:72
            },
            {
                x:34,
                y:136
            },
            {
                x:34,
                y:170
            },
            {
                x:66,
                y:170
            },
            {
                x:96,
                y:167
            },
            {
                x:115,
                y:138
            }
        ]
    },
    c:{
        lines:[],
        points:[
            {
                x:110,
                y:55
            },
            {
                x:76,
                y:38
            },
            {
                x:41,
                y:57
            },
            {
                x:35,
                y:100
            },
            {
                x:38,
                y:145
            },
            {
                x:74,
                y:170
            },
            {
                x:110,
                y:154
            },
            
        ]
    },
    d:{
        lines:[],
        points:[
            {
                x:34,
                y:39
            },
            {
                x:34,
                y:74
            },
            {
                x:34,
                y:106
            },
            {
                x:34,
                y:138
            },
            {
                x:34,
                y:170
            },
            {
                x:66,
                y:39
            },
            {
                x:98,
                y:45
            },
            {
                x:115,
                y:72
            },
            {
                x:66,
                y:170
            },
            {
                x:98,
                y:165
            },
            {
                x:115,
                y:138
            },
            {
                x:116,
                y:105
            },
            
        ]
    },
    l:{
        lines:[],
        points:[
            {
                x:34,
                y:42
            },
            {
                x:34,
                y:74
            },
            {
                x:34,
                y:106
            },
            {
                x:34,
                y:138
            },
            {
                x:34,
                y:170
            },
            {
                x:75,
                y:170
            },
            {
                x:115,
                y:170
            },
            
        ]
    },
    s:{
        lines:[],
        points:[
            {
                x:110,
                y:60
            },
            {
                x:80,
                y:38
            },
            {
                x:42,
                y:54
            },
            {
                x:47,
                y:92
            },
            {
                x:87,
                y:103
            },
            {
                x:114,
                y:125
            },
            {
                x:110,
                y:157
            },
            {
                x:70,
                y:170
            },
            {
                x:35,
                y:145
            },
            
        ]
    },
    k:{
        lines:[],
        points:[
            {
                x:34,
                y:40
            },
            {
                x:34,
                y:74
            },
            {
                x:34,
                y:106
            },
            {
                x:34,
                y:138
            },
            {
                x:34,
                y:170
            },
            {
                x:106,
                y:40
            },
            {
                x:85,
                y:69
            },
            {
                x:64,
                y:98
            },
            {
                x:89,
                y:133
            },
            {
                x:108,
                y:170
            },
            
        ]
    }
}




function NameCanvas(){
    
    this.init();
}


NameCanvas.prototype.init = function(){
    console.log("new name canvas")
    
    this.canvas = document.getElementById('nameCanvas');
    this.context = this.canvas.getContext('2d');
    
    this.draw();
    
}


NameCanvas.prototype.draw = function(){
    
    var _this = this;
   
    
    //loop through all letters and draw
    
    
    requestAnimFrame(function(){
        _this.draw();
    });
}



function LetterCanvas(canvasid,letter) {
    this.init(canvasid,letter);
}
    
LetterCanvas.prototype.init = function(letter){
    
    this.letter = letter.toUpperCase();
    
    this.canvas = document.createElement('canvas');
    
    $('.letters-wrap .canvas').append(this.canvas);
    
    this.canvas.width  = 150;
    this.canvas.height = 200; 
    
    this.context = this.canvas.getContext('2d');
    
    this.calculatePoints();
    
    this.loadImages();
    
    this.draw();
    
    
    //
    if(this.points.length>0){
        this.switcheroo();
    }
    
}


LetterCanvas.prototype.loadImages = function(){
    
    var _this = this;
    
    this.bulbImageLoaded = false;
    
    this.bulbImage = new Image();
    this.bulbImage.onload = function() {
        _this.bulbImageLoaded = true;
    };
    this.bulbImage.src = 'assets/images/light2.png';
    
    
    this.glowImageLoaded = false;
    
    this.glowImage = new Image();
    this.glowImage.onload = function() {
        _this.glowImageLoaded = true;
    };
    this.glowImage.src = 'assets/images/light2-glow.png';
    
}

LetterCanvas.prototype.switcheroo = function(){
    
    var _this = this;
    
    var delay = (Math.round(Math.random()*10)+5)*1000;
    var changedelay = (Math.round(Math.random()*4)+1)*1000;
    
    var randP;
    
    setTimeout(function(){
        
        //pick a point
        randP = Math.round(Math.random()*(_this.points.length-1));
        
        //console.log(_this.points.length-1)
        //console.log(randP)
        //console.log("*********************")
        
        
        if(!_this.points[randP].isOff){ //if light is on
            
            turnoff();
            
            setTimeout(function(){
                turnon();
            },changedelay)
            
        }
        else{ //if light is off
            turnon();
            
            setTimeout(function(){
                turnoff();
            },changedelay)
        }
        
    },delay)
    
    
    
    function turnoff(){
        _this.points[randP].animating = true;
        _this.points[randP].alpha = 0.6;

        setTimeout(function(){
            _this.points[randP].alpha = 0.8;
        },50)

        setTimeout(function(){
            _this.points[randP].alpha = 0.6;
        },100)

        setTimeout(function(){
            _this.points[randP].alpha = 0.8;
        },150)

        setTimeout(function(){
            _this.points[randP].alpha = 0.6;
        },200)

        setTimeout(function(){
            _this.points[randP].alpha = 0.8;
        },250)

        setTimeout(function(){
            _this.points[randP].alpha = 0.6;
        },300)

        setTimeout(function(){
            _this.points[randP].alpha = 0;
            _this.points[randP].isOff = true
             _this.points[randP].animating = false;
        },350)
    }
    
    function turnon(){
        _this.points[randP].animating = true;

        setTimeout(function(){
            _this.points[randP].alpha = 0.8;
        },50)

        setTimeout(function(){
            _this.points[randP].alpha = 0.6;
        },100)

        setTimeout(function(){
            _this.points[randP].alpha = 0.8;
        },150)

        setTimeout(function(){
            _this.points[randP].alpha = 0.6;
        },200)

        setTimeout(function(){
            _this.points[randP].alpha = 0.8;
        },250)

        setTimeout(function(){
            _this.points[randP].alpha = 0.6;
        },300)

        setTimeout(function(){
            _this.points[randP].alpha = 1;
            _this.points[randP].isOff = false
            _this.points[randP].animating = false;

            _this.switcheroo();

        },350)
    }
    
}


/*
LetterCanvas.prototype.createLightCanvas = function(){
    
    var _this = this;
    
    this.lightCanvas = document.createElement('canvas');
    this.lightCanvas.id = "lightCanvas";
    this.lightCanvas.width = 50;
    this.lightCanvas.height = 50;
    
    this.canvas.after(this.lightCanvas)
    
    this.lightContext = this.lightCanvas.getContext('2d');
    
    this.image = new Image();
    this.image.onload = function() {
        _this.lightContext.drawImage(_this.image, 0, 0,50,50);
        _this.drawLights();
    };
    this.image.src = 'assets/images/light2.png';
    
    
}*/

/*LetterCanvas.prototype.draw = function(){
    var _this = this;
    
    
    
    _this.lightContext.clearRect(0, 0, 50, 50);
    
    //draw outer circle
    //_this.lightContext.beginPath();
    //_this.lightContext.arc(25, 25, 7, 0, 2 * Math.PI, false);
    //_this.lightContext.fillStyle = '#eef4ad';
    //_this.lightContext.fill();

    //draw inner circle
    //_this.lightContext.beginPath();
    //_this.lightContext.arc(25, 25, 3, 0, 2 * Math.PI, false);
    //_this.lightContext.fillStyle = '#ffffff';
    //.lightContext.fill();
        
    
    
    requestAnimFrame(function(){
        _this.draw();
    });
}*/


/*LetterCanvas.prototype.drawLights = function(){
    var letter = this.letter;
    var _this  =this;
    var letterP = letterPoints[letter.toLowerCase()];
    if(letterP){
        //loop through points
        for(var i=0;i<letterP.lines.length;i++){
            _this.calculatePoints(letterP.lines[i])
            //_this.drawLight(letterP.points[i])
            
        }
    }
    else{
        console.warn("no lines for letter: "+letter)
    }
}*/

LetterCanvas.prototype.calculatePoints = function(){
    
    this.points = [];
    
    var letter = this.letter;
    var _this  = this;
    var letterP = letterPoints[letter.toLowerCase()];
    if(letterP){
        //loop through lines
        for(var i=0;i<letterP.lines.length;i++){
            
            var line = letterP.lines[i];
            var count = line.count;
    
            var startX = line.start.x;
            var startY = line.start.y;
            var endX = line.end.x;
            var endY = line.end.y;

            var distanceX = startX - endX
            var distanceY = startY - endY

            var distance = Math.sqrt( distanceX*distanceX + distanceY*distanceY);

            var pointDistance = distance/count;


            //draw start and end light
            //this.drawLight({x:startX,y:startY})
            //this.drawLight({x:endX,y:endY})

            var angle = Math.atan2(endY - startY, endX - startX);

            for(var e=0;e<count;e++){

                var newX = startX + Math.cos(angle) * (pointDistance*e);
                var newY = startY + Math.sin(angle) * (pointDistance*e);

                var isOff = Math.random()*10 >= 9 ? true : false;
                
                this.points.push({
                    x:newX,
                    y:newY,
                    isOff:isOff,
                    alpha:1
                })

            }
            
            
            
            this.points.push({
                x:endX,
                y:endY,
                isOff:false,
                alpha:1
            });
            
        }
        
        
        //loop through points
        for(var i=0;i<letterP.points.length;i++){
            
            var isOff = Math.random()*10 >= 9 ? true : false;
                
            this.points.push({
                x:letterP.points[i].x,
                y:letterP.points[i].y,
                isOff:isOff,
                alpha:1
            })
            
        }
        
        //console.log(this.points)
        
    }
    
    
    
    
    
}

LetterCanvas.prototype.draw = function(){
    
    var _this = this;
    
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    var width = 25;
    var height = 25;
    
    
    this.context.font = "200px 'hun-din_1451regular'";
    
    this.context.textBaseline="ideographic"; 
    
    this.context.lineWidth = 10;
    this.context.strokeStyle = '#eee59d';
    this.context.strokeText(this.letter,(this.canvas.width-this.context.measureText(this.letter).width)/2,200);
    
    
    var textgrad = _this.context.createRadialGradient(75,100, 0, 75, 100, 50);
    textgrad.addColorStop(0,"rgba(175,136,32,1");
    textgrad.addColorStop(1,"rgba(135,78,41,1)");
    
    //this.context.fillStyle = '#af8820';
    this.context.fillStyle = textgrad;
    this.context.textBaseline="ideographic"; 
    
    //(this.canvas.width-this.context.measureText(word).width)/2
    
    this.context.fillText(this.letter,(this.canvas.width-this.context.measureText(this.letter).width)/2,200);
    
    for(var i=0;i<this.points.length;i++){
        var point = this.points[i];
        
        if(this.bulbImageLoaded){
            _this.context.drawImage(_this.bulbImage, 0, 0,82,82,point.x-(width/2),point.y-(height/2),width,height);
        }
        
        if(this.glowImageLoaded){
            
            if(!point.isOff){
                _this.context.drawImage(_this.glowImage, 0, 0,82,82,point.x-(width/2),point.y-(height/2),width,height);
            }
        }
        
        var radgrad = _this.context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 10);

        var adder = (Math.random()*2-1)/10;
        
        if(!point.animating){ //dont do it animating
            point.alpha = point.alpha + adder;

            if(point.alpha>1) point.alpha=1;

            if(point.alpha<0.9) point.alpha=0.9;

            if(point.isOff){
                point.alpha = 0.4;
            }
        }

        radgrad.addColorStop(0,"rgba(0,0,0,"+(1-point.alpha)+")");
        radgrad.addColorStop(1,"rgba(0,0,0,0)");
        _this.context.fillStyle = radgrad;
        _this.context.fillRect(point.x-(width/2),point.y-(height/2),width,height);

    }
    
    
    //console.log("draw")
    
    requestAnimFrame(function(){
        _this.draw();
    });
}

/*
LetterCanvas.prototype.drawLight = function(point){
    
    var width = 20;
    var height = 20;
    
    //var opacity = Math.random();
    
    //this.context.globalAlpha   = opacity;
    
    var light = new Light(point.x-(width/2), point.y-(height/2));
    
    //this.context.drawImage(this.lightCanvas, 0,0,50,50,point.x-(width/2), point.y-(height/2),width,height);
}*/