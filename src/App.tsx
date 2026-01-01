import { useState, useMemo, useEffect } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import bunnyCry from "./animations/bunnyCry.json";
import bunnyPlease from "./animations/bunnyPlease.json";
import bunnyYes from "./animations/bunnyYes.json";
import bunnyPunch from "./animations/bunnyPunch.json";
import Button from "./components/Button";

const getRandomPosition = () => {
  const isMobile = window.innerWidth <= 768;
  const buttonWidth = isMobile ? 80 : 100;
  const buttonHeight = isMobile ? 40 : 50;
  return {
    randomLeft: `${Math.random() * Math.max(0, window.innerWidth - buttonWidth)}px`,
    randomTop: `${Math.random() * Math.max(0, window.innerHeight - buttonHeight)}px`,
  };
};

function App() {
  const [bunnyState, setBunnyState] = useState("normal");
  const [randomPosition, setRandomPosition] = useState(() => getRandomPosition());
  const [hasStarted, setHasStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimize animation sizes for mobile
  const animationSize = isMobile ? 200 : 300;
  const yesAnimationSize = isMobile ? 250 : 400;

  const bunnyCryOptions = useMemo(() => ({
    loop: true,
    autoplay: true,
    animationData: bunnyCry,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }), []);

  const bunnyPleaseOptions = useMemo(() => ({
    loop: true,
    autoplay: true,
    animationData: bunnyPlease,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }), []);

  const bunnyYesOptions = useMemo(() => ({
    loop: true,
    autoplay: true,
    animationData: bunnyYes,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }), []);

  const bunnyPunchOptions = useMemo(() => ({
    loop: true,
    autoplay: true,
    animationData: bunnyPunch,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }), []);

  const bunnyObj: { [key: number]: string } = { 0: "cry", 1: "punch" };
  
  const handleHover = (hoverState: boolean) => {
    setHasStarted(true);
    if (hoverState === true) {
      setRandomPosition(getRandomPosition());
      const randomBunnyState = Math.floor(Math.random() * 2);
      setBunnyState(bunnyObj[randomBunnyState] as string);
    }
  };

  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!hasStarted) {
      setHasStarted(true);
    }
    setRandomPosition(getRandomPosition());
    const randomBunnyState = Math.floor(Math.random() * 2);
    setBunnyState(bunnyObj[randomBunnyState] as string);
  };

  return (
    <StyledHome data-testid="container" $ismobile={isMobile}>
      <div className="home-container">
        {bunnyState === "yes" ? <div className="title">Hasta la vista Baby  !!!!</div> : <div className="title">Will You Be My GF?</div>}
        <div className="animation">
          {bunnyState === "normal" && <Lottie options={bunnyPleaseOptions} height={animationSize} width={animationSize} />}
          {bunnyState === "cry" && <Lottie options={bunnyCryOptions} height={animationSize} width={animationSize} />}
          {bunnyState === "yes" && <Lottie options={bunnyYesOptions} height={yesAnimationSize} width={yesAnimationSize} />}
          {bunnyState === "punch" && <Lottie options={bunnyPunchOptions} height={animationSize} width={animationSize} />}
        </div>
        {bunnyState !== "yes" && <div className="buttons">
          <button 
            className="yes-button"
            onClick={() => setBunnyState("yes")} 
            onMouseEnter={() => setBunnyState("normal")}
          >
            Yes
          </button>
          <Button
            $randomleft={randomPosition.randomLeft}
            $randomtop={randomPosition.randomTop}
            $hasstarted={hasStarted}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onTouchStart={handleTouch}
          >
            No
          </Button>
        </div>}
      </div>
    </StyledHome>
  );
}

const StyledHome = styled.div<{ $ismobile: boolean }>`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile */
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color:#feeafb;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  
  .home-container{
    display: flex;
    flex-direction:column;
    gap: ${({ $ismobile }) => ($ismobile ? '1.5rem' : '3rem')};
    align-items: center;
    justify-content: center;
    padding: ${({ $ismobile }) => ($ismobile ? '1rem' : '0')};
    width: 100%;
    max-width: 100%;
    
    .title{
      font-size: ${({ $ismobile }) => ($ismobile ? '1.25rem' : '2rem')};
      color:#5caff3;
      font-family: comic sans ms;
      text-align: center;
      padding: 0 1rem;
      word-wrap: break-word;
      line-height: 1.4;
    }
  }
  
  .animation {
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
    transform: translateZ(0); /* Force hardware acceleration */
  }
  
  .buttons{
    display: flex;
    gap: ${({ $ismobile }) => ($ismobile ? '1rem' : '2rem')};
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 0 1rem;
    
    .yes-button {
      min-width: ${({ $ismobile }) => ($ismobile ? '80px' : '100px')};
      padding: ${({ $ismobile }) => ($ismobile ? '0.5rem 1.2rem' : '0.4rem 1.4rem')};
      font-size: ${({ $ismobile }) => ($ismobile ? '1rem' : '1.2rem')};
      touch-action: manipulation; /* Remove 300ms delay on mobile */
      -webkit-tap-highlight-color: transparent;
    }
  }
  
  /* Mobile specific optimizations */
  @media (max-width: 768px) {
    .home-container {
      gap: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .home-container {
      gap: 1rem;
      
      .title {
        font-size: 1.1rem;
      }
    }
    
    .buttons {
      gap: 0.75rem;
    }
  }
`;

export default App;
