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
    this.PI2 = Math.PI * 2;

    this.init();
  }

  init() {
    // this.initPanel();

    this.drawSlider();
  }

  drawSlider() {
    const svgWrapper = document.createElement("div");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height", this.sliderHeight);
    svg.setAttribute("width", this.sliderWidth);
    svgWrapper.appendChild(svg);
    this.element.appendChild(svgWrapper);

    const angle = Math.floor((this.slider.max - this.slider.min) * 360);

    const sliderGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    sliderGroup.setAttribute(
      "transform",
      "rotate(-90," + this.cx + "," + this.cy + ")"
    );
    sliderGroup.setAttribute("rad", this.slider.radius);
    svg.appendChild(sliderGroup);

    // bg
    const path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path1.setAttribute(
      "d",
      this.describeArc(this.cx, this.cy, this.slider.radius, 0, 359)
    );
    path1.style.stroke = "#ccc";
    path1.style.strokeWidth = 25;
    path1.style.fill = "none";
    path1.setAttribute("stroke-dasharray", "10 2");
    sliderGroup.appendChild(path1);

    // slider
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      this.describeArc(this.cx, this.cy, this.slider.radius, 0, 180)
    );
    path.style.stroke = this.slider.color;
    path.style.strokeWidth = 25;
    path.style.fill = "none";
    path.setAttribute("stroke-dasharray", "10 0.85");
    sliderGroup.appendChild(path);

    // handle
    const handle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    const handleCenter = this.getHandleCenter(
      (angle * this.PI2) / 360,
      this.slider.radius
    );
    handle.setAttribute("cx", handleCenter.x);
    handle.setAttribute("cy", handleCenter.y);
    handle.setAttribute("r", 25 / 2);
    handle.style.stroke = "blue";
    handle.style.strokeWidth = 1;
    handle.style.fill = "#fff";
    sliderGroup.appendChild(handle);
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

  getHandleCenter(angle, radius) {
    const x = this.cx + Math.cos(angle) * radius;
    const y = this.cy + Math.sin(angle) * radius;
    return { x, y };
  }

  describeArc(x, y, radius, startAngle, endAngle) {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
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
