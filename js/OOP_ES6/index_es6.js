const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $timeHeader = document.querySelector('#time-header');
const $resultHeader = document.querySelector('#result-header');
const $gameTime = document.querySelector('#game-time');

const colors = ['#CB356B', '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED'];
const score = 0;
const isGameStarted = false;

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)


class startGame {
    constructor($start, $game, $time, $result, $timeHeader, $resultHeader, $gameTime) {
        this.$start = $start.addEventListener('click', this.startGame());
        this.$game = $game.addEventListener('click', handleBoxClick());
        this.$time = $time;
        this.$result = $result;
        this.$timeHeader = $timeHeader;
        this.$resultHeader = $resultHeader;
        this.$gameTime = $gameTime.addEventListener('click', setGameTime());
    }

    show($el) {
        $el.classList.remove('hide');
    }

    hide($el) {
        $el.classList.add('hide')
    }

    startGame(score) {
        score = 0;
        this.setGameScore();
        this.$gameTime.setAttribute('disabled', 'true');
        this.isGameStarted = true;
        this.$game.style.backgroundColor = '#fff';
        this.hide(this.$start);

        let interval = setInterval(() => {
            let time = parseFloat($time.textContent);

            if (time <= 0) {
                clearInterval(interval)
                this.endGame()
            } else {
                this.$time.textContent = (time - 0.1).toFixed(1)
            }
        }, 100);
    }

    setGameTime() {
        let time = +$gameTime.value;
        $time.textContent = time.toFixed(1);
        this.show($timeHeader);
        this.hide($resultHeader);
        }

    setGameScore() {
        $result.textContent = score.toString()
    }

    handleBoxClick(event) {
        if (!isGameStarted) {
            return
        }

        if (event.target.dataset.box) {
            this.score++;
            renderBox()
        }
    }

    endGame() {
        this.isGameStarted = false;
        setGameScore();
        $gameTime.removeAttribute('disabled');
        this.show($start);
        $game.innerHTML = '';
        $game.style.backgroundColor = '#ccc';
        this.hide($timeHeader);
        this.show($resultHeader);
    }

    getRandom() {
        return Math.floor(Math.random() * (max - min) + min)
    }

    renderBox() {
        this.$game.innerHTML = '';
        let box = document.createElement('div');
        let boxSize = getRandom(30, 100);
        let gameSize = $game.getBoundingClientRect();
        let maxTop = gameSize.height - boxSize;
        let maxLeft = gameSize.width - boxSize;
        // [1, 2, 3] -> length == 3;
        let randomColorIndex = getRandom(0, colors.length);

        box.style.height = box.style.width = boxSize + 'px';
        box.style.position = 'absolute';
        box.style.backgroundColor = colors[randomColorIndex];
        box.style.top = getRandom(0, maxTop) + 'px';
        box.style.left = getRandom(0, maxLeft) + 'px';
        box.style.cursor = 'pointer';
        box.setAttribute('data-box', 'true');
        $game.insertAdjacentElement('afterbegin', box)
    }

}
