document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    var isGameOver = false
    let gap = 430
    let gameTimerId

    const createBtn = (isGameOver, text = 'Start Game!') => {
        const btn = document.createElement('div');
        btn.classList.add('play-button')
        btn.innerText = text;
        gameDisplay.appendChild(btn);
        btn.onclick = function () {
            if (!isGameOver) {
                gameDisplay.removeChild(btn)
                gameTimerId = setInterval(startGame, 20)
                setTimeout(generalObstacle, 1000)

            }

        }
    }
    createBtn()
    const playAgain = (isGameOver, text = 'Play Again?') => {
        const again = document.createElement('div');
        again.classList.add('play-button')
        again.innerText = text;
        gameDisplay.appendChild(again);
        again.onclick = function () {
            window.location.reload(false);
        }
    }

    const gameOverText = (text = 'Game Over!') => {
        const go = document.createElement('div');
        go.classList.add('go')
        go.innerText = text;
        gameDisplay.appendChild(go);
    }


    function startGame() {
        //bird position
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'

    }

    // let gameTimerId = setInterval(startGame, 20)



    //Jump only if press space key
    function control(e) {//e=event
        if (e.keyCode == 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        // console.log(birdBottom)
        console.log("jump: " + isGameOver)

    }
    document.addEventListener('keyup', control)

    function generalObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBotton = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')

        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')

        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBotton + 'px'
        topObstacle.style.bottom = obstacleBotton + gap + 'px'

        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBotton + 153 || birdBottom > obstacleBotton + gap - 200) ||
                birdBottom < 0) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) { setTimeout(generalObstacle, 3000) }

    }

    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        gameOverText()
        document.removeEventListener('keyup', control)
        playAgain()
    }

})