class Slider {
  constructor({ container, color, min, max, step, radius }) {
    this.DOMselector = container;
    this.element = document.querySelector(this.DOMselector);
    this.slider = {
      color,
      min,
      max,
      step,
      radius,
    };
    this.sliderHeight = 400;
    this.sliderWidth = 400;
    this.cx = this.sliderWidth / 2;
    this.cy = this.sliderHeight / 2;

    this.init();
  }

  init() {
    // this.initPanel();

    this.drawSlider();
  }

  drawSlider() {
    const svgWrapper = document.createElement("div");
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('height', this.sliderHeight);
    svg.setAttribute('width', this.sliderWidth);
    svgWrapper.appendChild(svg);
    this.element.appendChild(svgWrapper);

    const sliderGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    sliderGroup.setAttribute(
      "transform",
      "rotate(-90," + this.cx + "," + this.cy + ")"
    );
    sliderGroup.setAttribute("rad", this.slider.radius);
    svg.appendChild(sliderGroup);

    // bg
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute(
      "d",
      "M 100 210 a 50 50 0 1 0 0.0001 0"
    );
    path1.style.stroke = '#ececec';
    path1.style.strokeWidth = 25;
    path1.style.fill = "none";
    path1.setAttribute("stroke-dasharray", "10 2");
    sliderGroup.appendChild(path1);

    // slider
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      "d",
      "M 100 210 a 50 50 0 1 0 35 8"
    );
    path.style.stroke =  this.slider.color;
    path.style.strokeWidth = 25;
    path.style.fill = 'none';
    path.setAttribute('stroke-dasharray', '10 2');
    sliderGroup.appendChild(path);
  }

  initPanel() {
    const infoPanel = document.querySelector(".info-panel");
    const slidersList = document.createElement("ul");
    slidersList.classList.add("sliders-list");
    infoPanel.appendChild(slidersList);

    const li = document.createElement("li");
    const sliderValue = document.createElement("span");
    sliderValue.innerText = this.slider.min;
    const colorSquare = document.createElement("span");
    colorSquare.style.backgroundColor = this.slider.color;
    const sliderName = document.createElement("span");
    sliderName.innerText = "slider";
    li.appendChild(sliderValue);
    li.appendChild(colorSquare);
    li.appendChild(sliderName);
    slidersList.appendChild(li);
  }
}

const slider = new Slider({
  container: "#app",
  color: "#EE82EE",
  min: 0,
  max: 100,
  step: 1,
  radius: 100,
});
