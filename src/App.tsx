import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [display, setDisplay] = useState("0");

  function number(item: string) {
    if (display == "0") {
      return setDisplay(item);
    }

    let string = display + item;
    let stringdividida = string.match(/\d+|[\+\-\*\/]/g);

    if (stringdividida) {
      let newdisplay = stringdividida
        .map((element) => {
          if (!isNaN(Number(element))) {
            return element; //Number(element).toLocaleString("pt-BR");
          }
          return element;
        })
        .join("");
      //setDisplay(newdisplay);
      setDisplay(
        newdisplay.replace(/\d+/g, (string) =>
          Number(string).toLocaleString("pt-BR")
        )
      );
    }
  }

  //display conter 3 e adicionar mais 1  digitos adicione um ponto
  //porem tenho q adicionar ponto sempre q tiver 3 digitos depois do ponto
  //tamanho do display dividido por 3 com resto 0 adicione um ponto
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

  function operation(item: string) {
    setDisplay((prevDisplay) => {
      const operation = ["+", "-", "*", "/", "."];
      const lastchar = prevDisplay[prevDisplay.length - 1];

      if (item === ".") {
        let array = prevDisplay.split(/[\+\-\*\/]/);
        let ultimoelemento = array[array.length - 1];

        if (ultimoelemento.includes(".")) {
          return prevDisplay;
        }
      }

      if (operation.includes(lastchar)) {
        return prevDisplay;
      } else {
        return prevDisplay + item;
      }
    });
  }

  function result() {
    try {
      let stringsempontos = display.replace(/\./g, "");
      setDisplay(eval(stringsempontos).toLocaleString("pt-BR"));
      //let number = eval(display).toFixed(3);
      //setDisplay(number.toString());
    } catch (error) {
      alert("voce digitou errado");
    }
  }

  return (
    <div>
      <div className="display">{display}</div>
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
