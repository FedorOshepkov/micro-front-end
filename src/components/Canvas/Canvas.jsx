/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable */
import React, {useEffect, useRef } from 'react';
import Node from '../Node/Node';
import classes from './Canvas.module.scss';

function Canvas() {

  useEffect(() => {
    console.log("CANVAS MOUNTED!!");
    let canvasRef = canvasREF.current;
    let canvas = document.getElementById('canvas');
    console.log(canvasRef, canvas );
  }, []);

  let canvasREF = useRef(null);
  const scroll = {
    isDown: false,
    startX: 0,
    startY: 0,
    X: 0,
    Y: 0,
    prevX: 0,
    prevY: 0,
    walkX: 0,
    walkY: 0,
    Left: 0,
    Top: 0,
    velocityX: 0,
    velocityY: 0,
    friction: 0.95,
    inertiaDistX: 0,
    inertiaDistY: 0,
  };  

  function onCanvasDragStart(e) {
    e.preventDefault();
    console.log('Canvas is drugging.....');

    scroll.isDown = true;
    e.preventDefault();

    console.log("Inertia dist X:", scroll.inertiaDistX, "Y:", scroll.inertiaDistY);

    scroll.startX = e.pageX - canvas.offsetLeft;
    scroll.startY = e.pageY - canvas.offsetTop;

    scroll.prevX = scroll.startX;
    scroll.prevY = scroll.startY;

    scroll.Left = canvas.scrollLeft;
    scroll.Top = canvas.scrollTop;

    scroll.inertiaDistX = 0;
    scroll.inertiaDistY = 0;
  }


  function onCanvasDrag(e) {
    if (!scroll.isDown) { return; }
    console.log("is dragging!");
    e.preventDefault();

    scroll.X = e.pageX - canvas.offsetLeft;
    scroll.Y = e.pageY - canvas.offsetTop;
    scroll.walkX = scroll.X - scroll.startX;
    scroll.walkY = scroll.Y - scroll.startY;

    canvas.scrollLeft -= scroll.walkX;
    canvas.scrollTop -= scroll.walkY;

    // questionable
    scroll.startX = e.pageX - canvas.offsetLeft;
    scroll.startY = e.pageY - canvas.offsetTop;

    scroll.velocityX = scroll.X - scroll.prevX;
    scroll.velocityY = scroll.Y - scroll.prevY;

    scroll.prevX = scroll.X;
    scroll.prevY = scroll.Y;

    // console.log(scroll.velocityX);
  }

  function onCanvasDragEnd(e) {
    console.log('drag end');
    scroll.isDown = false;

    scroll.Left = canvas.scrollLeft;
    scroll.Top = canvas.scrollTop;

    inertia();
  }

  function testInertia() {
    scroll.velocityX = -30;
    scroll.velocityY = -30;

    inertia();
  }

  function inertia() {
    if (!scroll.isDown &&
      (Math.abs(scroll.velocityX) >= 1 || Math.abs(scroll.velocityY) >= 1)) {
      console.log("flying...");

      canvas.scrollLeft -= scroll.velocityX;
      canvas.scrollTop -= scroll.velocityY;

      scroll.inertiaDistX += scroll.velocityX;
      scroll.inertiaDistY += scroll.velocityY;

      scroll.velocityX = Math.round(100 * scroll.velocityX * scroll.friction) / 100;
      scroll.velocityY = Math.round(100 * scroll.velocityY * scroll.friction) / 100;
      requestAnimationFrame(inertia);
    }
  }

  return (
    <div
      ref={canvasREF}
      id="canvas"
      draggable="true"
      className={classes.canvas}
      onMouseDown={onCanvasDragStart}
      onMouseMove={onCanvasDrag}
      onMouseUp={onCanvasDragEnd}
    // onClick={testInertia}
    >
      <div
        className={classes.content}
      >
        <div className={classes.nodeWrapper}>
          <Node />
        </div>
      </div>
    </div>
  );
}

export default Canvas;

// Problems:
// UseEffect fires twice
// stopPropagation for Node
// Ref doesn't work

