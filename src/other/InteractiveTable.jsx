import React, { useState } from 'react';
import './InteractiveTable.css';

const InteractiveTable = () => {
    const variantNumber = 7;
    const [colors, setColors] = useState(Array(36).fill('white'));

    const handleMouseOver = (index) => {
        if (index === variantNumber - 1) {
            setColors(colors => colors.map((color, i) => i === index ? getRandomColor() : color));
        }
    };

    const handleMouseOut = (index) => {
        if (index === variantNumber - 1) {
            setColors(colors => colors.map((color, i) => i === index ? 'white' : color));
        }
    };

    const handleDoubleClick = (index) => {
        const rowToStart = Math.floor(index / 6);
        const randomColor = getRandomColor();
        setColors(colors => colors.map((color, i) => {
            const row = Math.floor(i / 6);
            if (row >= rowToStart && (row - rowToStart) % 2 === 0) {
                return randomColor;
            }
            return color;
        }));
    };

    const handleClick = (index) => {
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.oninput = (e) => setColors(colors => colors.map((color, i) => i === index ? e.target.value : color));
        colorInput.click();
    };

    const getRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

    return (
        <table className="interactive-table">
            <tbody>
            {Array.from({ length: 6 }, (_, row) => (
                <tr key={row}>
                    {Array.from({ length: 6 }, (_, cell) => {
                        const index = row * 6 + cell;
                        return (
                            <td
                                key={cell}
                                style={{ backgroundColor: colors[index] }}
                                onMouseOver={() => handleMouseOver(index)}
                                onMouseOut={() => handleMouseOut(index)}
                                onClick={() => handleClick(index)}
                                onDoubleClick={() => handleDoubleClick(index)}
                            >
                                {index + 1}
                            </td>
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default InteractiveTable;
