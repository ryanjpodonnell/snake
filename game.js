(function (root) {
  var Snake = root.Snake = (root.Snake || {});

	var Game = Snake.Game = function(canvas) {
		this.ctx = canvas.getContext("2d");
		this.snake = new Snake.Snake(Game.TILE_X, Game.TILE_Y);
		this.speed = 180;
		this.turnNo = 0;
		this.applesCollected = 0;
		this.appleFreq = 5;
		this.appleX = -1;
		this.appleY = -1;
		this.nextlevel = 2;
    this.interval = undefined;
    this.direction = this.snake.dir;
    this.congratulatoryMessageDuration = 0;
    this.congratulatoryMessage = false;
    this.text = new Snake.Text(20, 150, "Snake Score " + this.applesCollected);
    this.cText = new Snake.Text(20, 50, "MMMMM!");
	};

	Game.DIM_X = 600;
	Game.DIM_Y = 400;
	Game.TILE_X = 30;
	Game.TILE_Y = 20;

	Game.prototype.start = function() {
		var that = this;
		this.bindKeyHandlers();
		this.interval = window.setInterval(function() {that.step()},that.speed);
	};

	Game.prototype.draw = function() {
		var scaleX = Game.DIM_X/Game.TILE_X;
		var scaleY = Game.DIM_Y/Game.TILE_Y;
    
		this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
    this.ctx.beginPath();
    this.ctx.lineWidth="10";
    this.ctx.strokeStyle="red";
    this.ctx.rect(0,0,Game.DIM_X,Game.DIM_Y); 
    this.ctx.stroke();

		for (var i = 0; i < Game.TILE_Y; i += 1) {
			for (var j = 0; j < Game.TILE_X; j += 1) {
				this.ctx.fillStyle = "black";
				this.ctx.fillText("", j*(scaleX), i*(scaleY));
			}
		}

		for (var i = 0; i < this.snake.segments.length; i++) {
			this.ctx.fillStyle = "blue";
			this.ctx.fillRect(this.snake.segments[i][0]*scaleX, 
                        this.snake.segments[i][1]*scaleY,
												scaleX, scaleY);
		}

		if (this.appleX != -1) {
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(this.appleX*scaleX, this.appleY*scaleY, scaleX, scaleY);
		}
    this.text.draw(this.ctx);
    if (this.congratulatoryMessage === true) {
      this.cText.draw(this.ctx);
    }
	};

	Game.prototype.step = function() {
    this.setDirection();
		this.checkApple();
		this.snake.move(this);
		this.checkGameOver();
		this.maybeLevelUp();
    this.text.update("Snake Score " + this.applesCollected);
    this.displayContratulatoryMessage();
		this.draw();
	};

	Game.prototype.bindKeyHandlers = function(){
		var that = this;
	  key('up',    function() {that.readyDirection("N");});
	  key('down',  function() {that.readyDirection("S");});
	  key('left',  function() {that.readyDirection("W");});
	  key('right', function() {that.readyDirection("E");});
	};
  
  Game.prototype.readyDirection = function(direction) {
    if (direction === "E" && this.snake.dir === "W" ||
        direction === "W" && this.snake.dir === "E" ||
        direction === "N" && this.snake.dir === "S" ||
        direction === "S" && this.snake.dir === "N") 
    {
      return;
    }
    else {
      this.direction = direction;
    }
  }
  
  Game.prototype.setDirection = function() {
    this.snake.dir = this.direction;
  }

  Game.prototype.checkApple = function() {
    this.turnNo++;
		if (this.turnNo % this.appleFreq === 0 && this.appleX === -1) {
			while(!createApple(this)) {
				createApple(this)
			}
		}
  };

	var createApple = function(game) {
		var generatedApple = true;
 		game.appleX = 1 + Math.floor(Math.random() * (Game.TILE_X - 2));
 		game.appleY = 1 + Math.floor(Math.random() * (Game.TILE_Y - 2));
		for (var i = 0; i < game.snake.segments.length; i++) {
			if (game.snake.segments[i][0] === game.appleX &&
          game.snake.segments[i][1] === game.appleY) {
				generatedApple = false;
			}
		}
		return generatedApple;
	};

	Game.prototype.checkGameOver = function() {
    var snakeArr = this.snake.segments;
		for(i=0; i< snakeArr.length-1; i++) {
			if(snakeArr[snakeArr.length-1][0] === snakeArr[i][0] &&
			   snakeArr[snakeArr.length-1][1] === snakeArr[i][1] && 
         snakeArr.length > 1) {
			  this.endGame();
				break;
			}
		}
	};

	Game.prototype.endGame = function() {
		alert("you lost. score " + this.applesCollected);
    clearInterval(this.interval);
		this.ctx = canvas.getContext("2d");
		this.snake = new Snake.Snake(Game.TILE_X, Game.TILE_Y);
		this.speed = 180;
		this.turnNo = 0;
		this.applesCollected = 0;
		this.appleFreq = 5;
		this.appleX = -1;
		this.appleY = -1;
		this.nextlevel = 2;
    this.interval = undefined;
    this.direction = this.snake.dir;
    this.congratulatoryMessageDuration = 0;
    this.congratulatoryMessage = false;
    this.text = new Snake.Text(20, 150, "Snake Score " + this.applesCollected);
    this.cText = new Snake.Text(20, 50, "MMMMM!");
    var that = this;
    this.interval = window.setInterval(function() {that.step()},that.speed);
	};
  
  Game.prototype.maybeLevelUp = function() {
		if (this.applesCollected === this.nextlevel) {
      var that = this;
			this.nextlevel = this.nextlevel * 2;
			this.speed = this.speed * .75;
      clearInterval(this.interval);
      this.interval = window.setInterval(function() {that.step()},that.speed);
		}
  };
  
  Game.prototype.displayContratulatoryMessage = function() {
    if (this.congratulatoryMessageDuration === 5) {
      this.congratulatoryMessage = false;
      this.congratulatoryMessageDuration = 0;
    }
    if (this.congratulatoryMessage === true) {
      var tmp = ["YUM!", "MMM!", "YAY!", "EAT!", "AHH!"];
      var tmpText = tmp[Math.floor(Math.random()*tmp.length)];
      this.cText.updateText(tmpText);
      this.cText.updateTextColor();
      this.congratulatoryMessageDuration++;
    }
  };
})(this);