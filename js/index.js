  let $start = document.querySelector('#start')
  let $game = document.querySelector('#game')
  let $time = document.querySelector('#time')
  let $result = document.querySelector('#result')
  let $timeHeader = document.querySelector('#time-header')
  let $resultHeader = document.querySelector('#result-header')
  let $gameTime = document.querySelector('#game-time')

  let colors = ['#CB356B', '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED'];
  let score = 0;
  let isGameStarted = false;

  $start.addEventListener('click', startGame)
  $game.addEventListener('click', handleBoxClick)
  $gameTime.addEventListener('input', setGameTime)

  // #1
  function show($el) {
    $el.classList.remove('hide')
  }

  // #2
  function hide($el) {
    $el.classList.add('hide')
  }

  // #3
  function startGame() {
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true;
    $game.style.backgroundColor = '#fff';
    hide($start);

    let interval = setInterval(function() {
      let time = parseFloat($time.textContent)

      if (time <= 0) {
        clearInterval(interval);
        endGame()
      } else {
        $time.textContent = (time - 0.1).toFixed(1)
      }
    }, 100)

    renderBox()
  }

  // #4
  function setGameScore() {
    $result.textContent = score.toString()
  }

  // #5
  function setGameTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
  }

  // #6
  function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
  }

  // #7
  function handleBoxClick(event) {
    if (!isGameStarted) {
      return
    }

    if (event.target.dataset.box) {
      score++
      renderBox()
    }
  }

  // #8
  function renderBox() {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let boxSize = getRandom(30, 100)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize
    // [1, 2, 3] -> length == 3
    let randomColorIndex = getRandom(0, colors.length)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)

  }

  // #9
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

