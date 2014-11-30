'use strict';

$(function(){

    //
    // prepare canvas
    var canvas = $('#eraserCover');
    var ctx = canvas[0].getContext('2d');
    canvas.data('ctx', ctx);

    var canvasWidth = 400;
    var canvasHeight = 400;
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;


    //
    // fill canvas
    var background = new Image();
    background.src = "i/pattern.png";

    // draw pattern on image loaded
    background.onload = function(){
        var pattern = ctx.createPattern(background,"repeat");

        ctx.rect(0,0,canvasWidth,canvasHeight);
        ctx.fillStyle = pattern;
        ctx.fill();

        // init eraser
        canvas.eraser({
            size: 50,
            completeRatio: .2,
            completeFunction: revealImage
        });
    };


    //
    // set controls events

    var controlRestore = $('#eraserRestore');

    controlRestore.on('click', function(){
        restoreImage();
    });

    //
    // having most of the image erased
    // show the full image
    // and enable special button
    function revealImage(){
        controlRestore.removeClass('hidden');
    }

    //
    // restore full image
    function restoreImage(){
//        var pattern = ctx.createPattern(background,"repeat");
//
//        ctx.rect(0,0,canvasWidth,canvasHeight);
//        ctx.fillStyle = pattern;
//        ctx.fill();

        ctx.fillStyle = "red";
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
    }

});
