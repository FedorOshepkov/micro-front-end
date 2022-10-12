/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import Node from '../Node/Node';
import classes from './Canvas.module.scss';

function Canvas() {

  let canvas = null;
  let canvasRef = null;
  let content = null;

  let divStyle = null;

  useEffect(() => {
    console.log("CANVAS MOUNTED!!");
    canvasRef = canvasREF.current;
    canvas = document.getElementById('canvas');
    content = document.getElementById('content');

    window.addEventListener('mouseup', onCanvasDragEnd);
    window.addEventListener('mousemove', onCanvasDrag);
    // window.addEventListener('onscroll', () => { window.scrollTo(canvas.offsetLeft, canvas.offsetTop) });

    content.addEventListener('wheel', onCanvasScroll, { passive: false });
  }, []);

  let canvasREF = useRef(null);
  const scroll = {
    isDown: false,
    anchorX: 0,
    anchorY: 0,
    X: 1,
    Y: 1,
    prevX: 0,
    prevY: 0,
    walkX: 0,
    walkY: 0,
    Left: 0,
    Top: 0,
    velocityX: 0,
    velocityY: 0,
    friction: 0.99,
    inertiaDistX: 0,
    inertiaDistY: 0,
    totalTranslateX: 0,
    totalTranslateY: 0,
  };

  let zoom = 1;
  let sizeZoom = 1;
  const ZOOM_SPEED = 0.01;

  let beginX = 0;
  let midX = 0;
  let endX = 0;


  function onCanvasDragStart(e) {
    // console.log('Canvas is drugging.....');

    scroll.isDown = true;
    // e.preventDefault();

    // scroll.anchorX = e.pageX - content.offsetLeft;
    // scroll.anchorX = e.pageY - content.offsetTop;

    // scroll.anchorX = e.pageX - scroll.totalTranslateX;
    scroll.anchorX = e.pageX;
    // scroll.anchorY = e.pageY - scroll.totalTranslateY;
    scroll.anchorY = e.pageY;

    scroll.prevX = scroll.anchorX;
    scroll.prevY = scroll.anchorX;

    scroll.totalTranslateX = scroll.Left;
    scroll.totalTranslateY = scroll.Top;

    // scroll.Left = content.scrollLeft;  //important
    // scroll.Top = content.scrollTop;

    scroll.inertiaDistX = 0;
    scroll.inertiaDistY = 0;

    console.log("beginX:", beginX);
  }

  function checkBoarders () {
    

    
  }

  function onCanvasDrag(e) {
    if (!scroll.isDown) { return; }
    // console.log("is dragging!");
    e.preventDefault();

    // scroll.X = e.pageX - content.offsetLeft;
    scroll.X = e.pageX;
    scroll.Y = e.pageY;
    scroll.walkX = scroll.X - scroll.anchorX;
    scroll.walkY = scroll.Y - scroll.anchorY;

    // console.log(scroll.X);

    // canvas.scrollLeft = scroll.Left - scroll.walkX;
    // canvas.scrollTop = scroll.Top - scroll.walkY;
    scroll.Left = scroll.totalTranslateX + scroll.walkX;
    scroll.Top = scroll.totalTranslateY + scroll.walkY;

    content.style.transform = ''
    + `translate(${(scroll.Left)}px, ${(scroll.Top)}px) scale(${(zoom)})`;
    + `translate(${(scroll.Left)}px) scale(${(zoom)})`;


    scroll.velocityX = (scroll.X - scroll.prevX);
    scroll.velocityY = (scroll.Y - scroll.prevY);

    scroll.prevX = scroll.X;
    scroll.prevY = scroll.Y;
  }

  function onCanvasDragEnd(e) {
    console.log('drag end');
    scroll.isDown = false;

    scroll.totalTranslateX = scroll.Left;
    scroll.totalTranslateY = scroll.Top;

    inertia();
    console.log("flying...");

  }

  function inertia() {
    if (!scroll.isDown &&
      (Math.abs(scroll.velocityX) >= 1 || Math.abs(scroll.velocityY) >= 1)) {

      canvas.scrollLeft -= scroll.velocityX;
      canvas.scrollTop -= scroll.velocityY;

      scroll.Left += scroll.velocityX;
      scroll.Top += scroll.velocityY;

      content.style.transform = ''
      + `translate(${(scroll.Left)}px, ${(scroll.Top)}px) scale(${(zoom)})`;
        // + `translate(${(scroll.Left)}px) scale(${(zoom)})`;

      scroll.inertiaDistX += scroll.velocityX;
      scroll.inertiaDistY += scroll.velocityY;



      scroll.velocityX = Math.round(100 * scroll.velocityX * scroll.friction) / 100;
      scroll.velocityY = Math.round(100 * scroll.velocityY * scroll.friction) / 100;
      requestAnimationFrame(inertia);
    }
  }
  let zoomDirection = 0;

  function onCanvasScroll(e) {
    e.stopPropagation();
    e.preventDefault();
    e.deltaY > 0 ? zoomDirection = 1 : zoomDirection = - 1;

    scroll.Left += 0.5 * zoomDirection * ZOOM_SPEED * content.offsetWidth;
    scroll.Top += 0.5 * zoomDirection * ZOOM_SPEED * content.offsetHeight;
    zoom += zoomDirection * ZOOM_SPEED;

    content.style.transform = ''
      + `translate(${scroll.Left}px, ${scroll.Top}px) scale(${(zoom)})`;

    return false;
  }

  function setDefault() {
    scroll.Left = 0;
    scroll.Top = 0;
    content.style.transform = ''
      + `translate(${(scroll.Left)}px, ${(scroll.Top)}px) scale(${(zoom)})`;
  }

  return (
    <>
      <div
        ref={canvasREF}
        id="canvas"
        draggable="true"
        className={classes.canvas}
        onWheel={onCanvasScroll}
      >
        <div
          id="content"
          className={classes.content}
          onMouseDown={onCanvasDragStart}

        >
          <div className={classes.nodeWrapper}>
            <Node />
          </div>
        </div>
      </div>
      <button
        onClick={setDefault}> Default </button>
    </>

  );
}

export default Canvas;

// Problems:
// stopPropagation for Node
// Ref doesn't work
// onDrag  doesn't work

