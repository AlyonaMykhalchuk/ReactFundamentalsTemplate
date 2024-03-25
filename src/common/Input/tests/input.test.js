import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../Input';

describe('Input Component', () => {
    const placeholderText = 'Enter text';
    const labelText = 'Label';
    const dataTestId = 'input-test';

    it('renders correctly with placeholder and label', () => {
        render(<Input placeholderText={placeholderText} labelText={labelText} data-testid={dataTestId} />);

        const input = screen.getByTestId(dataTestId);
        expect(input.placeholder).toBe(placeholderText);

        const label = screen.getByText(labelText);
        expect(label).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', placeholderText);
    });

    it('calls onChange when typing in the input', () => {
        const onChange = jest.fn();
        render(<Input onChange={onChange} data-testid={dataTestId} />);

        const input = screen.getByTestId(dataTestId);
        fireEvent.change(input, { target: { value: 'new text' } });
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
