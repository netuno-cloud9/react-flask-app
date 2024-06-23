import React from 'react';
import P5Wrapper from 'react-p5-wrapper'; // Ensure this import is correct

const About = () => {
  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.background(0);
    };

    p.draw = () => {
      p.fill(255);
      p.ellipse(p.mouseX, p.mouseY, 50, 50);
    };
  };

  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About page of our application.</p>
      <div>
        <P5Wrapper sketch={sketch} />
      </div>
    </div>
  );
};

export default About;
