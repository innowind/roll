import React, { useState } from "react";

export default function App() {
  const [maxNumber, setMaxNumber] = useState(10);
  const [rolledNumber, setRolledNumber] = useState<number | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isRolling, setIsRolling] = useState(false);

  const handleRoll = () => {
    if (maxNumber < 1) return;
    setIsRolling(true);
    let ticks = 20;
    let count = 0;

    const interval = setInterval(() => {
      const tempNum = Math.floor(Math.random() * maxNumber) + 1;
      setRolledNumber(tempNum);
      count++;
      if (count >= ticks) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 50);
  };

  const numberOptions = [2, 3, 4, 5, 10, 45];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(to bottom right, #e0f2fe, #c7d2fe)", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "white", borderRadius: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>🎲 랜덤 숫자 뽑기</h1>

        {rolledNumber !== null && (
          <div style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", margin: "1rem 0", color: "#4f46e5" }}>
            🎉 {rolledNumber} 🎉
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <span>1 ~ {maxNumber} 중에서 선택</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", width: "100%" }}>
            {numberOptions.map((num) => (
              <button
                key={num}
                onClick={() => setMaxNumber(num)}
                style={{
                  padding: "0.5rem",
                  backgroundColor: maxNumber === num ? "#fef9c3" : "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  cursor: "pointer"
                }}
              >
                {num}
              </button>
            ))}
            <input
              type="number"
              min={1}
              value={customInput}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setCustomInput(e.target.value);
                if (!isNaN(val) && val > 0) {
                  setMaxNumber(val);
                }
              }}
              placeholder="직접 입력"
              style={{ gridColumn: "span 2", textAlign: "center", fontSize: "1rem", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #ccc" }}
            />
          </div>
        </div>

        <button onClick={handleRoll} disabled={isRolling} style={{ width: "100%", fontSize: "1rem", padding: "1.5rem", marginTop: "1.5rem", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "1rem", cursor: "pointer" }}>
          Roll
        </button>
      </div>
    </div>
  );
}