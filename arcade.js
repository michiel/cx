var Fighter = function(opts) {
  opts.size   = (opts.size || 16).toString();
  app         = opts.app;

  var img, canvas, ctxt = null; 

  this.getImage = function() {
    return $('#' + opts.size + 'x' + opts.size + 'fighter')[0];
  }

  this.init = function() {
    img    = this.getImage();
    canvas = app.getCanvas();
    ctxt   = app.getContext();

    ctxt.drawImage(this.getImage(), 200, 200);
  }

  this.update = function() {
  }
}

var Arcade = function(canvas) {

  var app = {
    canvasWidth  : canvas.width(),
    canvasHeight : canvas.height()
  };

  var ctxt     = canvas[0].getContext("2d");
  var elements = [];

  var timer_id = null;

  this.isRunning = function() {
    return (timer_id != null);
  }

  var gameloop = function() {
    for (var i=0;i<elements.length; i++) {
      elements[i].update();
    }
    if (timer_id) {
      timer_id = setInterval(gameloop, 1);
    }
  }

  this.start = function() {
    timer_id = setInterval(gameloop, 1);
  }

  this.stop = function() {
    clearInterval(timer_id);
  }

  this.getWidth = function() {
    return app.canvasWidth;
  }

  this.getHeight = function() {
    return app.canvasHeight;
  }

  this.getContext = function() {
    return ctxt;
  }

  this.getCanvas = function() {
    return canvas;
  }

  this.init = function() {
    for (var i=0;i<elements.length; i++) {
      elements[i].init();
    }
  }

  this.add = function(obj) {
    elements.push(obj);
  }

}

Color = {
  black : '#000',
  white : '#fff',
  red   : '#f00',
  green : '#0f0',
  blue  : '#00f'
}

$(function () {
    var arcade = new Arcade($("#canvas"));
    arcade.add( new Fighter({
        size : 32,
        app  : arcade
      }));
    arcade.init();
  });

