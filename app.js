document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430

    function startGame() {
        //bird position
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    // clearInterval(gameTimerId)


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
                birdBottom === 0) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generalObstacle, 3000)
    }
    generalObstacle()

    function gameOver() {
        clearInterval(gameTimerId)
        // console.log('Game Over')
        isGameOver = true
        document.removeEventListener('keyup', control)
    }

})