import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SizeControls } from './SizeControls';
import { CanvasSize } from '../../common/enums/enums';

describe('SizeControls', () => {
    const mockOnSizeChange = jest.fn();

    beforeEach(() => {
        mockOnSizeChange.mockClear();
    });

    it('renders buttons for all sizes', () => {
        render(<SizeControls onSizeChange={mockOnSizeChange} size={CanvasSize.Small} />);

        // Check if all buttons are rendered
        expect(screen.getByRole('button', { name: 'Small' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Medium' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Large' })).toBeInTheDocument();
    });

    it('disables the button for the currently selected size', () => {
        render(<SizeControls onSizeChange={mockOnSizeChange} size={CanvasSize.Medium} />);

        // The button for the current size should be disabled
        expect(screen.getByRole('button', { name: 'Medium' })).toBeDisabled();
    });

    it('calls onSizeChange with the correct size when a button is clicked', () => {
        render(<SizeControls onSizeChange={mockOnSizeChange} size={CanvasSize.Small} />);

        // Click the 'Medium' button
        fireEvent.click(screen.getByRole('button', { name: 'Medium' }));
        expect(mockOnSizeChange).toHaveBeenCalledWith(CanvasSize.Medium);

        // Click the 'Large' button
        fireEvent.click(screen.getByRole('button', { name: 'Large' }));
        expect(mockOnSizeChange).toHaveBeenCalledTimes(2);
        expect(mockOnSizeChange).toHaveBeenCalledWith(CanvasSize.Large);
    });
});
