(function (root) {
	var Snake = root.Snake = (root.Snake || {});

	var Snake = Snake.Snake = function(dimX, dimY) {
		this.dimX = dimX;
		this.dimY = dimY;
		this.dir = '';
    this.color = 'black';
		this.segments = [];
		initSnake(this);
	};

	Snake.prototype.move = function(game) {
		var head = this.segments[this.segments.length - 1];

		if (this.dir === "N") {
			this.segments.push([head[0], head[1]-1]);
		}
		if (this.dir === "S") {
			this.segments.push([head[0], head[1]+1]);
		}
		if (this.dir === "E") {
			this.segments.push([head[0]+1, head[1]]);
		}
		if (this.dir === "W") {
			this.segments.push([head[0]-1, head[1]]);
		}

		if(this.segments[this.segments.length-1][0] === game.appleX &&
			 this.segments[this.segments.length-1][1] === game.appleY) {
      game.congratulatoryMessage = true;
			game.applesCollected++;
      game.turnNo = 0;
			game.appleX = -1;
			game.appleY = -1;
		} 
    else {
			this.segments.shift();
		}

    if(this.segments[this.segments.length-1][0] < 0) {
      this.segments[this.segments.length-1][0] = this.dimX-1;
    }
    if(this.segments[this.segments.length-1][0] >= this.dimX) {
      this.segments[this.segments.length-1][0] = 0;
    }
    if(this.segments[this.segments.length-1][1] < 0) {
      this.segments[this.segments.length-1][1] = this.dimY-1;
    }
    if(this.segments[this.segments.length-1][1] >= this.dimY) {
      this.segments[this.segments.length-1][1] = 0;
    }
  };


  var initSnake = function(snake) {
    var x = Math.floor(Math.random() * (snake.dimX));
    var y = Math.floor(Math.random() * (snake.dimY));

    if (x <= snake.dimX / 2 && y <= snake.dimY / 2) {
      snake.dir = "E"
    }
    if (x > snake.dimX / 2 && y <= snake.dimY / 2) {
      snake.dir = "S"
    }
    if (x > snake.dimX / 2 && y > snake.dimY / 2) {
      snake.dir = "W"
    }
    if (x <= snake.dimX / 2 && y > snake.dimY / 2) {
      snake.dir = "N"
    }

    snake.segments.push([x,y]);
  }

})(this);