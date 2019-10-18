function createGameLables(numLabels) {
  const labelArr = [];
  for (let index = 1; index < numLabels; index++) {
    labelArr.push(index.toString());
  }

  labelArr.push('');

  return labelArr;
}

function createSliderBox(label) {
  const slider = document.createElement('div');
  slider.className = `${label} slider`;
  slider.id = label;
  slider.setAttribute('draggable', 'true');
  slider.innerHTML = `<p>${label}</p>`;
  return slider;
}

function createGameDimensions(rows, columns, lables) {
  const dimensions = [];
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const labelNum = Math.floor(Math.random() * lables.length);
      const label = lables.splice(labelNum, 1)[0];

      const holderEl = document.createElement('div');
      holderEl.className = 'holder free';

      if (label !== '') {
        const slider = createSliderBox(label);
        holderEl.appendChild(slider);
        holderEl.classList.remove('free');
      }

      row.appendChild(holderEl);
    }

    dimensions.push(row);
  }

  return dimensions;
}

function drawSliderBoxes(gameDimension) {
  const flattenedArray = gameDimension.flat(2);
  const gameContainer = document.getElementById('game-area');
  flattenedArray.forEach(containerEl => {
    gameContainer.appendChild(containerEl);
  });
}

function dragover(e) {
  e.preventDefault();
}

function dragstart(e) {
  e.dataTransfer.setData('text/plain', e.currentTarget.id);
  this.classList.add('held') ;
  setTimeout(() => (e.target.className = 'invisible'), 0);
}

function dragend(e) {
  e.target.className = 'slider';
}

function dragenter(e) {
  e.preventDefault();
  if (e.target.classList.contains('free')) {
    e.target.classList.add('hovered');
  }
}

function dragleave(e) {
  e.preventDefault();
  if (e.target.classList.contains('free')) {
    e.target.className = 'holder free';
  }
}

function drop(e) {
  e.preventDefault();
  if (e.target.classList.contains('free')) {
    var id = e.dataTransfer.getData('text/plain');
    const oldSliderRef = document.getElementById(id);
    oldSliderRef.parentNode.classList.add('free');
    oldSliderRef.remove();
    const slider = createSliderBox(id);
    e.target.appendChild(slider);
    addSliderListeners(slider);
    this.className = 'holder';
  }
}

function addSliderListeners(slider) {
  slider.addEventListener('dragstart', dragstart);
  slider.addEventListener('dragend', dragend);
}

function registerListeners() {
  const sliders = document.getElementsByClassName('slider');
  const holders = document.getElementsByClassName('holder');

  for (const slider of sliders) {
    addSliderListeners(slider);
  }

  for (const holder of holders) {
    holder.addEventListener('dragover', dragover);
    holder.addEventListener('dragenter', dragenter);
    holder.addEventListener('dragleave', dragleave);
    holder.addEventListener('drop', drop);
  }
}

function setupGame(_) {
  let rows = parseInt(document.getElementById('game-rows').value);
  let columns = parseInt(document.getElementById('game-columns').value);
  const numLabels = rows * columns;

  const sliderLabels = createGameLables(numLabels);

  const gameDimension = createGameDimensions(rows, columns, sliderLabels);
  drawSliderBoxes(gameDimension);

  registerListeners();

  const gameControls = document.getElementById('game-controls');
  if (gameControls.classList.contains('invisible')) {
    gameControls.classList.remove('invisible');
  }

  const setupControls = document.getElementById('game-setup-controls');
  setupControls.classList.add('invisible');
}

function resetGame() {
  const gameArea = document.getElementById('game-area');
  while (gameArea.firstChild) {
    gameArea.removeChild(gameArea.firstChild);
  }

  const setupControls = document.getElementById('game-setup-controls');
  if (setupControls.classList.contains('invisible')) {
    setupControls.classList.remove('invisible');
  }

  document.getElementById('game-controls').classList.add('invisible');
  document.getElementById('game-setup-form').reset();
}

const gameSetupForm = document.getElementsByClassName('game-setup')[0];
gameSetupForm.addEventListener('submit', setupGame);
