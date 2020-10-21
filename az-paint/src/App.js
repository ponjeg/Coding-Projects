import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [selectedColor, setselectedColor] = useState("white");
  const [border, setBorder] = useState(true);

  return (
    <div>
      <input onChange={(e) => setselectedColor(e.target.value)} />
      <Grid paintColor={selectedColor} borderOn={border} />
      <button onClick={() => setBorder((border) => !border)}>
        toggle border
      </button>
    </div>
  );
}

const Grid = ({ paintColor, borderOn }) => {
  return (
    <div>
      <Row paintColor={paintColor} borderOn={borderOn} />
      <Row paintColor={paintColor} borderOn={borderOn} />
      <Row paintColor={paintColor} borderOn={borderOn} />
      <Row paintColor={paintColor} borderOn={borderOn} />
      <Row paintColor={paintColor} borderOn={borderOn} />
      <Row paintColor={paintColor} borderOn={borderOn} />
      <Row paintColor={paintColor} borderOn={borderOn} />
      <Row paintColor={paintColor} borderOn={borderOn} />
      <Row paintColor={paintColor} borderOn={borderOn} />
      <Row paintColor={paintColor} borderOn={borderOn} />
    </div>
  );
};

const Row = ({ paintColor, borderOn }) => {
  return (
    <div className="Row">
      <Block paintColor={paintColor} borderOn={borderOn} />
      <Block paintColor={paintColor} borderOn={borderOn} />
      <Block paintColor={paintColor} borderOn={borderOn} />
      <Block paintColor={paintColor} borderOn={borderOn} />
      <Block paintColor={paintColor} borderOn={borderOn} />
      <Block paintColor={paintColor} borderOn={borderOn} />
      <Block paintColor={paintColor} borderOn={borderOn} />
      <Block paintColor={paintColor} borderOn={borderOn} />
      <Block paintColor={paintColor} borderOn={borderOn} />
      <Block paintColor={paintColor} borderOn={borderOn} />
    </div>
  );
};

const Block = ({ paintColor, borderOn }) => {
  const [color, setColor] = useState("white");
  let border = "";
  if (borderOn) {
    border = "2px solid black";
  } else {
    border = "none";
  }

  return (
    <div
      className="Block"
      style={{
        backgroundColor: color,
        border: border
      }}
      onClick={() => setColor(paintColor)}
      draggable={true}
      onDragEnter={() => setColor(paintColor)}
    ></div>
  );
};
