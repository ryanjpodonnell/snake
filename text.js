(function (root) {
  var Snake = root.Snake = (root.Snake || {});

  var Text = Snake.Text = function (x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = "black";
  };

  Text.COLORS = ["black", "red", "yellow", "blue", "green", "blue", "purple"];
  
  Text.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.font = "italic "+50+"pt Arial ";
    ctx.fillText(this.text, this.x, this.y);
  };
  
  Text.prototype.updateText = function(text) {
    this.text = text;
  };
  
  Text.prototype.updateTextColor = function () {
    var coloridx;
    for (var i = 0; i < 7; i++) {
      if (Text.COLORS[i] === this.color) {
        coloridx = i;
      }
    }
    
    this.color = Text.COLORS[(coloridx+1) % 7];
  };
  
  Text.prototype.moveText = function ()  {
    if (this.y < 0) {
      this.y = 450;
    }
    this.text.y -= 1;
  };
  
  Text.prototype.update = function (text) {
    this.updateText(text);
    this.updateTextColor();
    this.moveText();
  };
})(this);