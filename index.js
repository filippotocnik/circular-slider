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

    this.init()
  }

  init() {
    this.initPanel();
  }

  initPanel() {
    const infoPanel = document.querySelector('.info-panel')
    const slidersList = document.createElement("ul");
    slidersList.classList.add("sliders-list");
    infoPanel.appendChild(slidersList);

    const li = document.createElement('li');
    const sliderValue = document.createElement('span');
    sliderValue.innerText = this.slider.min;
    const colorSquare = document.createElement('span');
    colorSquare.style.backgroundColor = this.slider.color;
    const sliderName = document.createElement('span');
    sliderName.innerText = 'slider';
    li.appendChild(sliderValue);
    li.appendChild(colorSquare);
    li.appendChild(sliderName);
    slidersList.appendChild(li);
  }
}


const slider = new Slider({
  container: '#slider1',
  color: '#EE82EE',
  min: 0,
  max: 100,
  step: 1,
  radius: 100
})

