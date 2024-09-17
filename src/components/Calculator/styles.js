import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 45rem;
  width: 35rem;
  background-color: #242329;
  border-radius: 2rem;
`;

export const Display = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 10rem;
  border-radius: 1rem 1rem 0 0;
  background-color: #302f37;
  color: #fff;
  font-size: 4rem;
  font-weight: bold;
  justify-content: center;
  padding: 0 2rem 0 0;
  box-sizing: border-box;
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 1rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;

export const CalculatorButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    return props.color || '#3d3b40';
  }};
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  border: none;
  border-radius: 3rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

  grid-column: ${(props) => (props.number == '0' ? 'span 2' : '')};

  &:hover {
    background-color: #4a484d;
  }

  ${(props) =>
    props.pressed &&
    `
    transform: scale(0.95);  
    background-color: #333;
  `}
`;
