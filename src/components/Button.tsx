import styled from 'styled-components';

interface ButtonProps {
    $randomleft: string;
    $randomtop: string;
    $hasstarted: boolean;
}

const Button = styled.button<ButtonProps>`
  position: ${({ $hasstarted }) => ($hasstarted ? "absolute" : "relative")};
  transition: transform 0.3s ease-in-out, left 0.3s ease-in-out, top 0.3s ease-in-out;
  left: ${({ $hasstarted, $randomleft }) => ($hasstarted ? $randomleft : '0')};
  top: ${({ $hasstarted, $randomtop }) => ($hasstarted ? $randomtop : '0')};
  will-change: transform, left, top;
  transform: translateZ(0); /* Force hardware acceleration */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation; /* Remove 300ms delay on mobile */
  min-width: 80px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  
  @media (min-width: 769px) {
    min-width: 100px;
    padding: 0.4rem 1.4rem;
    font-size: 1.2rem;
  }
`;

export default Button;

