import { useEffect, useMemo, useState } from "react";
import "./App.css";

/**
 * Represents a single square in the Tic Tac Toe game board.
 *
 * @param {Object} props - The properties passed to the Square component.
 * @param {string|null} props.value - The value to display in the square (e.g., "X", "O", or null).
 * @param {Function} props.onClick - The callback function to handle click events on the square.
 * @param {boolean} props.isWinning - Indicates whether this square is part of the winning combination.
 * @param {number} props.index - The index of the square in the game board (0-based).
 * @returns {JSX.Element} A button element representing the square.
 */
function Square({ value, onClick, isWinning, index }) {
    return (
        <button
            className={`square ${isWinning ? "win" : ""}`}
            onClick={onClick}
            aria-label={`Square ${index + 1}`}
        >
            {value}
        </button>
    );
}

function calculateWinner(sq) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
        if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
            return { winner: sq[a], line: [a, b, c] };
        }
    }
    return { winner: null, line: null };
}

export default function App() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [scores, setScores] = useState({ X: 0, O: 0 });

    const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
    const isDraw = !winner && squares.every(Boolean);

    useEffect(() => {
        if (winner) {
            setScores((s) => ({ ...s, [winner]: s[winner] + 1 }));
        }
    }, [winner]);

    const handleClick = (i) => {
        if (squares[i] || winner) return;
        const next = squares.slice();
        next[i] = xIsNext ? "X" : "O";
        setSquares(next);
        setXIsNext(!xIsNext);
    };

    const newRound = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    const resetScores = () => setScores({ X: 0, O: 0 });

    const status = winner
        ? `Winner: ${winner}`
        : isDraw
            ? "It's a draw!"
            : `Next: ${xIsNext ? "X" : "O"}`;

    return (
        <div className="page">
            <div className="card">
                <h1>Tic‑Tac‑Toe</h1>
                <p>Two‑player (X vs O)</p>

                <div className="scoreboard">
                    <div className="score x">X: {scores.X}</div>
                    <div className="score o">O: {scores.O}</div>
                </div>

                <div className="status">{status}</div>

                <div className="board">
                    {squares.map((val, i) => (
                        <Square
                            key={i}
                            value={val}
                            onClick={() => handleClick(i)}
                            isWinning={line?.includes(i)}
                            index={i}
                        />
                    ))}
                </div>

                <div className="actions">
                    <button className="btn" onClick={newRound}>
                        New Round
                    </button>
                    <button className="btn secondary" onClick={resetScores}>
                        Reset Scores
                    </button>
                </div>
            </div>
        </div>
    );
}