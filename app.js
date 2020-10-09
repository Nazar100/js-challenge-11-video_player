const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
if(video.paused){
    video.play()
} else{
    video.pause()
}
}
function updateBtn () {
      const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}
function skip () {
video.currentTime += Number(this.dataset.skip)
}
function handleRangeUpdt () {
    video[this.name]=this.value
// console.log(video[this.name]);
}
function handlePrgrss () {

    const percent = (video.currentTime/video.duration) *100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub (e) {
      const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


video.addEventListener('click',togglePlay )
video.addEventListener('play',updateBtn )
video.addEventListener('pause',updateBtn )
video.addEventListener('timeupdate',handlePrgrss )

toggle.addEventListener('click',togglePlay )

skipButtons.forEach(btn=>{
    btn.addEventListener('click',skip)
})

ranges.forEach(range=>{
    range.addEventListener('change',handleRangeUpdt)
})
ranges.forEach(range=>{
    range.addEventListener('mousemove',handleRangeUpdt)
})

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);