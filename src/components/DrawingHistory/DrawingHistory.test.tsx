import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DrawingHistory } from './DrawingHistory';
import * as DrawingHistoryContext from '../../contexts/DrawingHistoryContext';
import { Line } from '../../common/definitions/line';

describe('DrawingHistory', () => {
    const mockUseDrawingContext = jest.spyOn(DrawingHistoryContext, 'useDrawingContext');

    it('displays the correct number of lines drawn', () => {
        mockUseDrawingContext.mockReturnValue({
            lines: [
                {startX: 10, startY: 10, endX: 20, endY: 20},
                {startX: 30, startY: 30, endX: 40, endY: 40},
            ],
            addLine: function (newLine: Line): void {
                throw new Error('Function not implemented.');
            }
        });

        render(<DrawingHistory />);

        expect(screen.getByText('Lines Drawn: 2')).toBeInTheDocument();
    });

    it('displays the correct line details', () => {
        mockUseDrawingContext.mockReturnValue({
            lines: [{startX: 10, startY: 10, endX: 20, endY: 20}],
            addLine: function (newLine: Line): void {
                throw new Error('Function not implemented.');
            }
        });

        render(<DrawingHistory />);

        expect(screen.getByText('Line 1 - points [10, 10, 20, 20]')).toBeInTheDocument();
    });

    it('handles empty line history', () => {
        mockUseDrawingContext.mockReturnValue({
            lines: [],
            addLine: function (newLine: Line): void {
                throw new Error('Function not implemented.');
            }
        });

        render(<DrawingHistory />);

        expect(screen.getByText('Lines Drawn: 0')).toBeInTheDocument();
    });
});
