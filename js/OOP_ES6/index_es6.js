const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')

const colors = ['#CB356B', '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED'];
const score = 0
const isGameStarted = false

  
class startGame {
    constructor($start, $game, $time, $result, $timeHeader, $resultHeader, $gameTime) {
        this.$start = $start
        this.$game = $game
        this.$time = $time
        this.$result = $result
        this.$timeHeader = $timeHeader
        this.$resultHeader = $resultHeader
        this.$gameTime = $gameTime
    }

    show($el) {
        $el.classList.remove('hide');
    }

    hide($el) {
        $el.classList.add('hide')
    }

    startGame() {
        score = 0;
        this.setGameScore()
        this.$gameTime.setAttribute('disabled','true')
        isGameStarted = true;
        this.$game.style.backgroundColor = '#fff'
        this.hide(this.$start);

        let interval = setInterval( () => {
            let time = parseFloat($time.textContent)

            if(time <= 0) {
                clearInterval(interval)
                this.endGame()
            } else {
                this.$time.textContent = (time - 0.1).toFixed(1)
            }
        },100)

      

    setGameTime() {

    }

    setGameScore() {

    }

    handleBoxClick(event) {

    }

    endGame() {

    }

    getRandom() {

    }

    renderBox() {

    }

}