// Get the elements
const player = document.querySelector('.player')

// inside player div, select the other divs i.e video div,
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.fullscreen')
console.log(fullscreen.textContent)

//Building functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause'
  video[method]()

  //   if (video.paused) {
  //     video.play()
  //   } else {
  //     video.pause()
  //   }
}
// Pause and play button
function updateButton() {
  const icon = this.paused ? '►' : '⏸'
  toggle.textContent = icon
}
//SkipButton
function skip() {
  console.log(this.dataset.skip)
  video.currentTime += parseFloat(this.dataset.skip)
}
// Volume and playback sliders
function handleRangeUpdate() {
  video[this.name] = [this.value]
}
//Progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

//Progress bar slider
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

function handleFullscreen() {
  if ((fullscreen.textContent = 'fullscreen')) {
    fullscreen.textContent = 'toggle back'
  } else if (fullscreen.textContent != 'fullscreen') {
    fullscreen.textContent = 'fullscreen'
  }

  if (player.style.width != `${100}%`) {
    player.style.width = `${100}%`
    player.style.maxWidth = 'none'
  } else if ((player.style.width = `${100}%`)) {
    player.style.width = `${750}px`
  }
}

// Hook up the events listners
video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
// listener for button change
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
//for each is used here beacuse,
//queryselctorAll create an array for the datas selected in the DOM
skipButtons.forEach((button) => button.addEventListener('click', skip))
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate))
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdate),
)

video.addEventListener('timeupdate', handleProgress)

let mousedown = false
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', () => (mousedown = false))

fullscreen.addEventListener('click', handleFullscreen)
