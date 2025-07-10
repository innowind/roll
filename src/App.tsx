import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [maxNumber, setMaxNumber] = useState(10);
  const [rolledNumber, setRolledNumber] = useState<number | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [isRolling, setIsRolling] = useState(false);

  const numberOptions = [1, 2, 3, 4, 5, 10, 45];

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

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 p-4"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="w-full max-w-md shadow-xl rounded-2xl bg-white p-6">
        <h1 className="text-2xl font-bold text-center mb-6">🎲 랜덤 숫자 뽑기</h1>

        {rolledNumber !== null && (
          <motion.div
            key={rolledNumber}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center text-5xl font-bold text-indigo-700 mb-6"
          >
            🎉 {rolledNumber} 🎉
          </motion.div>
        )}

        <div className="flex flex-col items-center gap-4 mb-6">
          <span className="text-base font-medium">1 ~ {maxNumber} 중에서 선택</span>
          <div className="grid grid-cols-4 gap-2 w-full">
            {numberOptions.map((num) => (
              <button
                key={num}
                style={{
                  backgroundColor: maxNumber === num ? "#fef9c3" : undefined,
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "8px 0",
                  fontSize: "1.125rem",
                  cursor: "pointer",
                }}
                onClick={() => setMaxNumber(num)}
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
              style={{
                gridColumn: "span 2",
                textAlign: "center",
                fontSize: "1.125rem",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        <button
          onClick={handleRoll}
          disabled={isRolling}
          style={{
            width: "100%",
            fontSize: "1.25rem",
            padding: "16px 0",
            borderRadius: "10px",
            backgroundColor: "#4f46e5",
            color: "white",
            cursor: isRolling ? "not-allowed" : "pointer",
            border: "none",
          }}
        >
          Roll
        </button>
      </div>
    </div>
  );
}
