const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const SYMBOLS_COUNT = { A: 2, B: 4, C: 6, D: 8 };
const SYMBOLS_VALUES = { A: 5, B: 4, C: 3, D: 2 };

// Helper Logic to spin the slot machine
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) symbols.push(symbol);
    }
    const reels = [[], [], []];
    for (let i = 0; i < 3; i++) {
        const reelSymbols = [...symbols];
        for (let j = 0; j < 3; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            reels[i].push(reelSymbols[randomIndex]);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    return [[reels[0][0], reels[1][0], reels[2][0]], 
            [reels[0][1], reels[1][1], reels[2][1]], 
            [reels[0][2], reels[1][2], reels[2][2]]];
};

// THE API ENDPOINT 
app.post("/spin", (req, res) => {
    const { bet, lines } = req.body;

    const reels = spin();
    const rows = transpose(reels);
    
    // Win Calculation
    let winnings = 0;
    for (let i = 0; i < lines; i++) {
        if (rows[i][0] === rows[i][1] && rows[i][1] === rows[i][2]) {
            winnings += bet * SYMBOLS_VALUES[rows[i][0]];
        }
    }

    // Sending the result back to the frontend
    res.json({ rows, winnings });
});

app.listen(3000, () => console.log("Backend running at http://localhost:3000"));