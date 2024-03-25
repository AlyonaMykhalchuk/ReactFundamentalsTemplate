import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../Button';

describe('Button Component', () => {
    const buttonText = 'Click Me';
    const dataTestId = 'button-test';

    it('renders correctly with buttonText', () => {
        render(<Button buttonText={buttonText} data-testid={dataTestId} />);

        const button = screen.getByTestId(dataTestId);
        expect(button).toHaveTextContent(buttonText);
    });

    it('calls handleClick prop when clicked', () => {
        const handleClick = jest.fn();
        render(<Button buttonText={buttonText} handleClick={handleClick} data-testid={dataTestId} />);

        const button = screen.getByTestId(dataTestId);
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
