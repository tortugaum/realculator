import { useEffect, useState } from 'react';
import {
  ButtonContainer,
  CalculatorButton,
  Container,
  Display,
} from './styles';

export default function Calculator() {
  const [result, setResult] = useState(null);
  const [pressedButton, setPressedButton] = useState(null);

  const calculatorHeader = ['C', 'CE', '%'];
  const calculatorFunctions = ['+', '-', '*', '/', '=', '.'];
  const calculatorNumbers = [
    'C',
    'CE',
    '%',
    '/',
    '1',
    '2',
    '3',
    '*',
    '4',
    '5',
    '6',
    '-',
    '7',
    '8',
    '9',
    '+',
    '0',
    '.',
    '=',
  ];

  const getButtonColor = (value) => {
    if (calculatorHeader.includes(value)) {
      return 'orange';
    } else if (calculatorFunctions.includes(value)) {
      return '#482463';
    } else {
      return null;
    }
  };

  const handlePercentageInEval = (expression) => {
    expression = expression.replace(
      /(\d+(\.\d+)?)([-+*/])(\d+(\.\d+)?)%/g,
      (match, p1, p2, operator, p4) => {
        return `${p1} ${operator} (${p1} * ${p4} / 100)`;
      }
    );

    expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, p1) => {
      return `(${p1} / 100)`;
    });

    return expression;
  };

  const handleFunctions = (value) => {
    if (!result && (value === 'CE' || value === 'C' || value === '=')) {
      return;
    }

    if (value === 'CE') {
      return result.toString().slice(0, -1);
    }

    if (value === 'C') {
      return '';
    }
    if (value === '=') {
      const processedExpression = handlePercentageInEval(result);

      return eval(processedExpression).toString();
    }

    if (result && result.length < 10) {
      return result + value;
    }

    return result || value;
  };

  const handleClick = (value) => {
    const functionResult = handleFunctions(value.toString());

    setResult(functionResult);
  };

  const checkKeyAllowed = ({ key }) => {
    const allowedKeys = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '+',
      '-',
      '*',
      '/',
      ',',
      '.',
      '%',
      'Enter',
      'Backspace',
      'Delete',
    ];

    if (!allowedKeys.includes(key)) {
      return;
    }

    return key;
  };

  const formatKeyPressed = ({ key }) => {
    if (key === 'Backspace') {
      key = 'CE';
    }
    if (key === 'Enter') {
      key = '=';
    }
    if (key === ',') {
      key = '.';
    }

    return key;
  };

  const handleKeyPress = (event) => {
    const { key } = event;

    if (!checkKeyAllowed({ key })) {
      return;
    }

    const formattedKey = formatKeyPressed({ key });

    setPressedButton(formattedKey);
    handleClick(formattedKey.toString());
  };

  const handleKeyRelease = () => {
    setPressedButton(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyRelease);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.addEventListener('keyup', handleKeyRelease);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div>
      <Container>
        <Display> {result}</Display>
        <ButtonContainer>
          {calculatorNumbers.map((number) => (
            <CalculatorButton
              key={number}
              onClick={() => {
                handleClick(number);
              }}
              number={number}
              color={getButtonColor(number)}
              pressed={pressedButton === number}
            >
              {number}
            </CalculatorButton>
          ))}
        </ButtonContainer>
      </Container>
    </div>
  );
}
