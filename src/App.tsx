import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [display, setDisplay] = useState("0");

  function number(item) {
    if (display == "0") {
      return setDisplay(item);
    }
    setDisplay(display + item);
  }
  // limpar display
  function clean() {
    setDisplay("0");
  }
  function cleanlast() {
    if (display.length == 1) {
      return setDisplay("0");
    }
    setDisplay(display.slice(0, -1));
  }

  function operation(item) {
    setDisplay((prevDisplay) => {
      const operation = ["+", "-", "*", "/", "."];
      const last = prevDisplay[prevDisplay.length - 1];

      if (operation.includes(last)) {
        return prevDisplay;
      } else {
        return display + item;
      }
    });
  }

  function result() {
    try {
      setDisplay(eval(display));
    } catch (error) {
      alert("voce digitou errado");
    }
  }

  return (
    <div>
      <div>{display}</div>
      {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
        (element, index) => (
          <button key={index} onClick={() => number(element)}>
            {element}
          </button>
        )
      )}
      {["+", "-", "*", "/", "."].map((element, index) => (
        <button key={index} onClick={() => operation(element)}>
          {element}
        </button>
      ))}
      <button onClick={() => result()}>=</button>
      <button onClick={() => cleanlast()} className="delete">
        delete
      </button>
      <button onClick={() => clean()} className="clean">
        AC
      </button>
    </div>
  );
}
