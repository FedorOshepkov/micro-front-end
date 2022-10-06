import React, { useEffect, useState } from 'react';
import classes from "./Node.module.scss";

import messageSVG from "../../icons/message.svg";
import danceSVG from "../../icons/activity.svg";



const Node = function () {
    // let nodeState = useState("compact", Expand());

    const [nodeState, setNodeState] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);
    function changeNodeState() {
        setNodeState(!nodeState);
    }

    useEffect(() => {
        console.log("Effect");
    },[]);

    function animatedClass (className, animated = isAnimated){            
        return animated ? className += 'In': className += 'Out';
    }


    return (
        <div className={classes[animatedClass('backLayer')]}
            onClick={() => {
                setIsAnimated(!isAnimated);
                if (!nodeState) changeNodeState();
            }}
            >

            {nodeState && (
                <div className={classes[animatedClass('authorLine')]}>
                    <div className={classes[animatedClass('avatarCircle')]} />
                    <p className={classes[animatedClass('authorName')]}>Sophie Clark</p>
                </div>
            )}

            {nodeState && (
                <div className={classes.outsideButtons}>
                    <button className={classes[animatedClass('messageButton')]}>
                        <img src={messageSVG} alt="message SVG icon" />
                    </button>
                    <button className={classes[animatedClass('danceButton')]}
                    onAnimationEnd={() => { if (!isAnimated) changeNodeState() }}>
                        <img src={danceSVG} alt="dance SVG icon" />
                    </button>
                </div>
            )}

            <div className={classes[animatedClass('videoPreview')]} />
        </div>
    );
}

export default Node;