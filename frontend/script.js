let balance = 0;

function updateUI() {
    document.getElementById("balance-display").innerText = balance;
}

function handleDeposit() {
    const amount = parseFloat(document.getElementById("deposit-input").value);
    if (amount > 0) {
        balance += amount;
        updateUI();
        document.getElementById("spin-btn").disabled = false;
        document.getElementById("message").innerText = "Deposit successful!";
    }
}

// This function acts as the "Messenger" to Node server
async function handleSpin() {
    const lines = parseInt(document.getElementById("lines-input").value);
    const bet = parseFloat(document.getElementById("bet-input").value);
    const totalBet = lines * bet;

    if (totalBet > balance || isNaN(totalBet) || lines < 1 || lines > 3) {
        document.getElementById("message").innerText = "Invalid Bet or insufficient balance!";
        return;
    }

    // 1. Deduct money locally first
    balance -= totalBet;
    updateUI();
    document.getElementById("message").innerText = "Spinning...";

    try {
        // 2. SEND THE BET TO THE BACKEND
        const response = await fetch("http://localhost:3000/spin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bet: bet, lines: lines })
        });

        if (!response.ok) throw new Error("Server not responding");

        const data = await response.json();

        // 3. DISPLAY THE RESULTS
        displaySlots(data.rows);
        balance += data.winnings;
        
        document.getElementById("message").innerText = 
            data.winnings > 0 ? `WINNER! You won $${data.winnings}` : "No luck this time!";
        updateUI();

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Error: Make sure server.js is running!";
        
        // Refund the bet if the server failed
        balance += totalBet;
        updateUI();
    }
}

function displaySlots(rows) {
    const slots = document.querySelectorAll(".slot");
    let count = 0;
    rows.forEach(row => {
        row.forEach(symbol => {
            slots[count].innerText = symbol;
            count++;
        });
    });
}