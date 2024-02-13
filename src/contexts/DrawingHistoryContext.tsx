import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Line } from "../common/definitions/line";

interface DrawingContextType {
    lines: Line[];
    addLine: (newLine: Line) => void;
}

const initialLinesState: Line[] = [];

const DrawingContext = createContext<DrawingContextType>({
    lines: initialLinesState,
    addLine: () => {},
});

export const useDrawingContext = () => useContext(DrawingContext);

interface DrawingHistoryProviderProps {
    children: ReactNode;
}

export const DrawingHistoryProvider: React.FC<DrawingHistoryProviderProps> = ({ children }) => {
    const [lines, setLines] = useState<Line[]>(initialLinesState);

    const addLine = (newLine: Line) => setLines(prevLines => [...prevLines, newLine]);

    return (
        <DrawingContext.Provider value={{ lines, addLine }}>
            {children}
        </DrawingContext.Provider>
    );
};
