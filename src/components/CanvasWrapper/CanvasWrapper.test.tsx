import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CanvasWrapper } from './CanvasWrapper';
import * as useCanvasDrawingHook from './hooks/useCanvasDrawing';

describe('CanvasWrapper', () => {
    const mockStartDrawing = jest.fn();
    const mockDraw = jest.fn();
    const mockStopDrawing = jest.fn();

    beforeEach(() => {
        jest.spyOn(useCanvasDrawingHook, 'useCanvasDrawing').mockReturnValue({
            canvasRef: { current: null },
            startDrawing: mockStartDrawing,
            draw: mockDraw,
            stopDrawing: mockStopDrawing,
        });
    });

    it('renders canvas with given width and height', () => {
        const width = 500;
        const height = 300;
        render(<CanvasWrapper width={width} height={height} />);

        const canvas = screen.getByTestId('canvasDrawing');
        expect(canvas).toHaveStyle(`width: ${width}px`);
        expect(canvas).toHaveStyle(`height: ${height}px`);
    });

    it('calls startDrawing on mouse down', () => {
        render(<CanvasWrapper width={100} height={100} />);
        const canvas = screen.getByTestId('canvasDrawing');
        fireEvent.mouseDown(canvas);
        expect(mockStartDrawing).toHaveBeenCalled();
    });

    it('calls draw on mouse move', () => {
        render(<CanvasWrapper width={100} height={100} />);
        const canvas = screen.getByTestId('canvasDrawing');
        fireEvent.mouseMove(canvas);
        expect(mockDraw).toHaveBeenCalled();
    });

    it('calls stopDrawing on mouse up', () => {
        render(<CanvasWrapper width={100} height={100} />);
        const canvas = screen.getByTestId('canvasDrawing');
        fireEvent.mouseUp(canvas);
        expect(mockStopDrawing).toHaveBeenCalled();
    });
});
