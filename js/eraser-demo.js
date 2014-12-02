'use strict';

$(function(){

    //
    // prepare canvas
    var canvas = $('#eraserCover');
    var percent = $('#eraserProgress');
    var pointer = $('#eraserPointer');

    var ctx = canvas[0].getContext('2d');

    var canvasWidth = 400;
    var canvasHeight = 400;
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;

    var revealPoint = .6;
    var rotateDegree = -10;
    var eraserSize = 50;



    //
    // fill canvas
    var background = new Image();
    background.src = "i/pattern.png";

    // draw pattern on image loaded
    background.onload = function(){
        var pattern = ctx.createPattern(background,"repeat");

        ctx.translate(canvasWidth/2, canvasHeight/2);
        ctx.rotate(rotateDegree*Math.PI/180);

        ctx.rect(-canvasWidth/2, -canvasHeight/2, canvasWidth, canvasHeight);
        ctx.fillStyle = pattern;
        ctx.fill();

        canvas.css('background', 'none');

        // init eraser
        canvas.eraser({
            size: eraserSize,
            rotation: rotateDegree,
            completeRatio: 1, // never stop erasing
            progressFunction: function(p) {
                percent.text(Math.floor((1 - p)*100) + '%');

                // on progress show controls
                if(p > revealPoint){
                    eraserCallback();
                }
            }
        });
    };


    //
    // eraser listener
    canvas.on(
        {
            'mousemove' : function(e){

                pointer.css({
                    top : e.pageY - canvas.data('eraser').posY - 25,
                    left : e.pageX - canvas.data('eraser').posX - 25
                });
            },
            'mouseover' : function(e){
                pointer.removeClass('hidden');

            },
            'mouseout' : function(){
                pointer.addClass('hidden');
            }
        });

    //
    // set controls events

    var controlClear = $('#eraserClear');
    var controlRestore = $('#eraserRestore');

    controlClear.on('click', clearImage);
    controlRestore.on('click', restoreImage);


    //
    // having most of the image erased
    // show the full image
    // and enable restore button
    function eraserCallback(){
        controlClear.removeClass('hidden');
        controlRestore.removeClass('hidden');
    }

    //
    // restore full image
    function clearImage(){
        canvas.eraser('clear');
        percent.text('0%');
    }

    //
    // restore full image
    function restoreImage(){
        canvas.eraser('reset');
        percent.text('100%');
    }

});
