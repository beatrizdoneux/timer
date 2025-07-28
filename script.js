const display = document.getElementById('display')

const sessionDisplay = document.getElementById('session-display')
const sessionSlider = document.getElementById('session-slider')
const breakDisplay = document.getElementById('break-display')
const breakSlider = document.getElementById('break-slider')
const roundsDisplay = document.getElementById('rounds-display')
const roundsSlider = document.getElementById('rounds-slider')
const message = document.getElementById('message')

const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resetBtn = document.getElementById('reset')
const restoreBtn = document.getElementById('restore')

let sessionLength = Number(sessionSlider.value)
let breakLength = Number(breakSlider.value)
let rounds = Number(roundsSlider.value)

let minutes
let seconds

let intervalId
let isFocus = true
let isRest = false

resetCounter()

startBtn.addEventListener("click", startCounter)
pauseBtn.addEventListener("click", pauseCounter)
resetBtn.addEventListener("click", resetCounter)
restoreBtn.addEventListener("click", restoreToDefaults)

sessionSlider.addEventListener("input", () => {
    sessionLength = Number(sessionSlider.value)
    sessionDisplay.innerText = sessionLength
})
breakSlider.addEventListener("input", () => {
    breakLength = Number(breakSlider.value)
    breakDisplay.innerText = breakLength
})
roundsSlider.addEventListener("input", () => {
    rounds = Number(roundsSlider.value)
    roundsDisplay.innerText = rounds
})

function updateDisplay(minutes, seconds) {
    display.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function pauseCounter() {
    clearInterval(intervalId)
}

function resetCounter() {
    sessionLength = Number(sessionSlider.value)
    sessionDisplay.innerText = sessionLength

    breakLength = Number(breakSlider.value)
    breakDisplay.innerText = breakLength

    rounds = Number(roundsSlider.value)
    roundsDisplay.innerText = rounds

    minutes = sessionLength
    seconds = 0

    updateDisplay(minutes, seconds)
    isFocus = true
    isRest = false
    message.innerText = "Focus"
}

function restoreToDefaults() {
    sessionSlider.value = 25
    sessionLength = Number(sessionSlider.value)
    sessionDisplay.innerText = sessionLength

    breakSlider.value = 5
    breakLength = Number(breakSlider.value)
    breakDisplay.innerText = breakLength

    roundsSlider.value = 4
    rounds = Number(roundsSlider.value)
    roundsDisplay.innerText = rounds

    minutes = sessionLength
    seconds = 0
}

function startCounter() {
    if (!intervalId) {
        intervalId = setInterval(counter, 1000)
    }
}

function counter() {

    if (minutes > 0) {
        if (seconds == 0) {
            seconds = 59
            minutes--
        }
        else {
            seconds--
        }
    }
    else if (minutes == 0 && seconds > 0) {
        seconds--
    }
    else {
        if(isFocus) {
            isFocus = false
            isRest = true
            minutes = breakLength
            seconds = 0
            message.innerText = "Break time!"
        }
        else {
            isFocus = true
            isRest = false
            rounds--
            if(rounds == 0) {
                clearInterval(intervalId)
                intervalId = null
                message.innerText = "All done!"
                return
            }
            minutes = sessionLength
            seconds = 0
            message.innerText = "Focus"
        }
    }
    updateDisplay(minutes, seconds)
}




