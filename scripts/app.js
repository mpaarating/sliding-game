function createGameLables(numLabels) {
  const labelArr = [];
  for (let index = 1; index < numLabels; index++) {
    labelArr.push(index.toString());
  }

  labelArr.push('');

  return labelArr;
}

function createGameDimensions(rows, columns, lables) {
  const dimensions = [];
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const rowDimension = [];
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const labelNum = Math.floor(Math.random() * lables.length);
      const label = lables.splice(labelNum, 1);
      const el = document.createElement('div');
      const className = label === '' ? 'holder' : 'slider';
      el.className = `${label} ${className}`;
      el.innerHTML = `<p>${label}</p>`;
      rowDimension.push(el);
    }
    dimensions.push(rowDimension);
  }

  return dimensions;
}

function drawSliderBoxes(gameDimensions) {}

function setupGame(_) {
  let rows = parseInt(document.getElementById('game-rows').value);
  let columns = parseInt(document.getElementById('game-columns').value);
  const numLabels = rows * columns;

  const sliderLabels = createGameLables(numLabels);

  const gameDimension = createGameDimensions(rows, columns, sliderLabels);
}

const gameSetupForm = document.getElementsByClassName('game-setup')[0];
gameSetupForm.addEventListener('submit', setupGame);
