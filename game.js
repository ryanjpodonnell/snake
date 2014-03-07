(function (root) {
  var Snake = root.Snake = (root.Snake || {});

	var Game = Snake.Game = function(canvas,speed) {
		this.ctx = canvas.getContext("2d");
		this.snake = new Snake.Snake(Game.TILE_X, Game.TILE_Y);
		this.speed = speed;
		this.turnNo = 0;
		this.applesCollected = 0;
		this.appleFreq = 5;
		this.appleX = -1;
		this.appleY = -1;
		this.nextlevel = 1;
		this.interval;
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

		for (var i = 0; i < Game.TILE_Y; i += 1) {
			for (var j = 0; j < Game.TILE_X; j += 1) {
				this.ctx.fillStyle = "black";
				this.ctx.fillText(",", j*(scaleX), i*(scaleY));
			}
		}

		for (var i = 0; i < this.snake.segments.length; i++) {
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(this.snake.segments[i][0]*scaleX, this.snake.segments[i][1]*scaleY,
												scaleX, scaleY);
		}

		if (this.appleX != -1) {
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(this.appleX*scaleX, this.appleY*scaleY, scaleX, scaleY);
		}
	};

	Game.prototype.step = function() {
		if (this.turnNo % this.appleFreq === 0 && this.appleX === -1) {
			while(!createApple(this)) {
				createApple(this)
			}
		}
		this.snake.move(this);
		if (this.checkGameOver()) {
			this.endGame();
		}
		this.turnNo++;
		if (this.applesCollected === this.nextlevel) {
			this.nextlevel = this.nextlevel * this.nextlevel;
			this.speed = this.speed * 20;
			// clearInterval(this.interval);
			// this.interval = window.setInterval(function() {this.step()},this.speed);
		}
		this.draw();
	};

	Game.prototype.bindKeyHandlers = function(){
		var that = this;
	  key('up',    function() {that.snake.setDirection("N");});
	  key('down',  function() {that.snake.setDirection("S");});
	  key('left',  function() {that.snake.setDirection("W");});
	  key('right', function() {that.snake.setDirection("E");});
	 };

	 var createApple = function(game) {
		 var generatedApple = true;
 		 game.appleX = Math.floor(Math.random() * (Game.TILE_X));
 		 game.appleY = Math.floor(Math.random() * (Game.TILE_Y));
		 for (var i = 0; i < game.snake.segments.length; i++) {
			 if (game.snake.segments[i] === [game.appleX, game.appleY]) {
				 generateApple = false;
			 }
		 }
		 return generatedApple;
	 };

	 Game.prototype.checkGameOver = function() {
		 for(i=0; i< this.snake.segments.length-1; i++) {
			 if(this.snake.segments[this.snake.segments.length-1][0] === this.snake.segments[i][0] &&
			    this.snake.segments[this.snake.segments.length-1][1] === this.snake.segments[i][1] &&
				  this.snake.segments.length > 1) {
			   return true;
				 break;
			 }
		 }
		 return false;
	 };

	 Game.prototype.endGame = function() {
		 alert("you lost");
 		this.snake = new Snake.Snake(Game.TILE_X, Game.TILE_Y);
 		this.speed = speed;
 		this.turnNo = 0;
 		this.appleFreq = 5;
 		this.appleX = -1;
 		this.appleY = -1;
	 }

})(this);