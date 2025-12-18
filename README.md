# 🎰 Node.js Slot Machine

A fully functional, text-based slot machine game built with JavaScript. This project simulates a real-world gambling mechanic where users can deposit virtual currency, place bets on multiple lines, and win based on symbol combinations and their respective values.

## 🚀 Features

* **Interactive Betting:** Users deposit a starting balance and choose how many lines (1-3) to bet on.
* **Weighted Randomization:** Symbols are generated based on specific frequencies, making rare symbols (like "A") more valuable.
* **Matrix Logic:** Uses custom transposition logic to convert vertical reel data into horizontal rows for winning calculations.
* **Robust Validation:** Includes error handling for invalid deposits, bets, or non-numeric inputs.
* **Game Loop:** Play multiple rounds until your balance runs out or you choose to quit.

---

## 🛠️ Payout Table

The machine uses a 3x3 grid. Symbols have different rarities and multipliers:

| Symbol | Count in Reel | Multiplier |
| :--- | :--- | :--- |
| **A** | 2 | 5x |
| **B** | 4 | 4x |
| **C** | 6 | 3x |
| **D** | 8 | 2x |

---

## 💻 Prerequisites

To run this project locally, you need [Node.js](https://nodejs.org/) installed on your machine.

## 🏃 Installation & How to Play

1.  **Clone or Download** this repository to your local machine.
2.  Open your terminal/command prompt in the project folder.
3.  **Install the dependency** (this project uses `prompt-sync` for user input):
    ```bash
    npm install prompt-sync
    ```
4.  **Run the game:**
    ```bash
    node index.js
    ```
5.  Follow the on-screen instructions to start spinning!

---

## 📝 Technical Concepts Covered
* **Nested Loops:** Used for generating reels and transposing matrices.
* **Data Structures:** Mapping symbol counts and values using Objects.
* **Input Validation:** Using `while(true)` loops to ensure valid user data.
* **Array Manipulation:** Using `.push()`, `.splice()`, and `.entries()`.

---
*Created as a programming logic exercise in JavaScript.*
