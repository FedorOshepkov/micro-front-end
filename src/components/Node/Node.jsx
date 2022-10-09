/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import classes from './Node.module.scss';

import messageSVG from '../../icons/message.svg';
import danceSVG from '../../icons/activity.svg';

function Node() {
  // let nodeState = useState("compact", Expand());

  const [nodeState, setNodeState] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  function changeNodeState() {
    setNodeState(!nodeState);
  }

  // useEffect(() => {
  //   // console.log('Effect');
  // }, []);

  function animatedClass(className, animated = isAnimated) {
    return animated ? className.concat('In') : className.concat('Out');
  }

  function onNodeClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsAnimated(!isAnimated);
    if (!nodeState) changeNodeState();
  }
  
  //Better set timer, and if user holds mouseDown less then 400ms 
  // then count it as click otherwise just drag over
  function stopNodePropagation(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  return (
    <div
      className={classes[animatedClass('backLayer')]}
      onClick={onNodeClick}
      onMouseDown={stopNodePropagation}
    >
      {nodeState && (
        <div className={classes[animatedClass('authorLine')]}>
          <div className={classes[animatedClass('avatarCircle')]} />
          <p className={classes[animatedClass('authorName')]}>Sophie Clark</p>
        </div>
      )}

      {nodeState && (
        <div className={classes.outsideButtons}>
          <button className={classes[animatedClass('messageButton')]} type="button">
            <img src={messageSVG} alt="message SVG icon" />
          </button>
          <button
            className={classes[animatedClass('danceButton')]}
            onAnimationEnd={() => { if (!isAnimated) changeNodeState(); }}
            type="button"
          >
            <img src={danceSVG} alt="dance SVG icon" />
          </button>
        </div>
      )}

      <div className={classes[animatedClass('videoPreview')]} />
    </div>
  );
}

export default Node;
