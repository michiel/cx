var Color = {
  black : '#000',
  white : '#fff',
  red   : '#f00',
  green : '#0f0',
  blue  : '#00f'
}

var Fighter = function(opts) {
  opts.size   = opts.size || 16;
  app         = opts.app;

  var img, canvas, ctxt = null; 

  this.getImage = function() {
    return $('#' + opts.size + 'x' + opts.size + 'fighter')[0];
  }

  this.init = function() {
    img    = this.getImage();
    canvas = app.getCanvas();
    ctxt   = app.getContext();

    ctxt.drawImage(
      this.getImage(), 
      0 + (opts.size / 2),
      app.getHeight() - (opts.size / 2)
    );
  }

  this.update = function() {
    console.log('fighter.update');
  }
}

var Arcade = function(canvas) {

  var app = {
    canvasWidth  : canvas.width(),
    canvasHeight : canvas.height()
  };

  var ctxt     = canvas[0].getContext("2d");
  var elements = [];

  var timer_interval = 5000;

  var timer_id = null;

  this.isRunning = function() {
    return (timer_id != null);
  }

  var gameloop = function() {
    console.log('app.gameloop');
    for (var i=0;i<elements.length; i++) {
      elements[i].update();
    }
    if (timer_id) {
      timer_id = setTimeout(gameloop, timer_interval);
    }
  }

  this.start = function() {
    timer_id = setTimeout(gameloop, timer_interval);
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

$(function () {
    var arcade = new Arcade($("#canvas"));
    arcade.add( new Fighter({
        size : 32,
        app  : arcade
      }));
    arcade.init();
    arcade.start();
  });

