// P5Sketch.js
import React from 'react';
import { P5Wrapper } from 'react-p5-wrapper';

const P5Sketch = () => {
  const sketch = (p) => {
    let x = 50;
    let y = 50;

    p.setup = () => {
      p.createCanvas(400, 400);
    };

    p.draw = () => {
      p.background(255);
      p.fill(0);
      p.rect(x, y, 50, 50);
      x += 1;
    };
  };

  return <P5Wrapper sketch={sketch} />;
};

export default P5Sketch;
