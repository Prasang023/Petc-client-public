import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const TextScroller = ({ text }) => {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [key, setKey] = useState(1);
  const [status, setStatus] = useState(
    useSpring({
        from: { transform: "translate(150%,0)" },
        to: { transform: "translate(-180%,0)" },
        config: { duration: isMobile?6000:10000 },
        reset: true,
        //reverse: key % 2 == 0,
        onRest: () => {
          setKey(key + 1);
        }
      })
  );
  

  const scrolling = useSpring({
    from: { transform: "translate(150%,0)" },
    to: { transform: "translate(-180%,0)" },
    config: { duration: isMobile?6000:10000 },
    reset: true,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    }
  });

  const stopScrolling = useSpring({
    onRest: () => {
      setKey(key + 1);
    }
  })

  const LeaveHandler = () => {
      setStatus(scrolling)
  }

  const EnterHandler = () => {
    setStatus(stopScrolling)
  }

  return (
    <div key={key}>
      <animated.div style={status} onMouseEnter={EnterHandler} onMouseLeave={LeaveHandler}>{text}</animated.div>
    </div>
  );
};

export default TextScroller;