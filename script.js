let videoPlayer = document.querySelector('.videoPlayer');
let video  = document.querySelector('.video');
let progress =document.querySelector('.progress');
let progressBar = document.querySelector('.progressBar');
let playButton = document.querySelector('.playButton');
let backward = document.querySelector('.backward');
let forward = document.querySelector('.forward');
let playerSlider = document.querySelector('.playerSlider');
let volumeSlider = document.querySelector('.volumeSlider');
let volumeBtn = document.querySelector('.volumeBtn');
let picInPicBtn = document.querySelector('.pic-in-pic');
let fullScreenBtn = document.querySelector('.fullscreenBtn');
let fullScreenBtnI = document.querySelector('.fullscreenBtnI');
let timeTracker = document.querySelector('.timetracker');
let videoCurrentTime = document.querySelectorAll('.videoCurrentTime');
let videoTotalDuration = document.querySelector('.videoTotalDuration');



 function playPause(){

    video.paused ? video.play() : video.pause();
    video.paused ?   playButton.innerHTML= '<i class="fa-solid fa-play text-white"></i>' : playButton.innerHTML='<i class="fa-solid fa-pause text-white"></i>';
 }




 function skipBackward(){
    let skipBackTen = backward.dataset.skip;
if(video.currentTime > 10){
    video.currentTime = video.currentTime + parseFloat(skipBackTen);
    } else {
        video.currentTime = 0;
    }
 }

 function skipForward(){
    let skipTen = forward.dataset.skip;
if(video.currentTime > video.duration ){
    video.currentTime = 0;
    } else {
        video.currentTime = video.currentTime + parseFloat(skipTen);
    }
 }

//  function videoSlider(){
//     let currentVideoTime = video.duration*(playerSlider.value/100);
//     video.currentTime = currentVideoTime;
//  }

function volumeSeeker(){

    video.volume = volumeSlider.value/100;
    
    video.volume === 0?  volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark"): volumeBtn.classList.replace("fa-volume-xmark","fa-volume-high"); 
}

function VolumeThumbPlace(){
    volumeSlider.value =50;
}


volumeBtn.addEventListener('click',()=>{

if(!volumeBtn.classList.contains("fa-volume-high")){
    video.volume =0.5;
    volumeSlider.value =50;
    volumeBtn.classList.replace("fa-volume-xmark","fa-volume-high");   
}else{
    video.volume=0.0;
    volumeSlider.value =00;
    volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark");  
}


})


// pic in pic

function picInPicScreen(){

video.requestPictureInPicture();
    
}

// full screen

function fullScreenToggle(){

    // video.requestFullscreen(); // not using it as it has prebuilt controls
    videoPlayer.classList.toggle('fullscreen');

    if( videoPlayer.classList.contains('fullscreen')){
        videoPlayer.classList.add('max-w-[100%]');
        videoPlayer.classList.add('w-[100%]');
        videoPlayer.classList.add('h-[100vh]');
        fullScreenBtnI.classList.replace("fa-expand","fa-compress");
    }else {
        videoPlayer.classList.remove('max-w-[100%]');
        videoPlayer.classList.remove('w-[100%]');
        videoPlayer.classList.remove('h-[100vh]');
        fullScreenBtnI.classList.replace("fa-compress","fa-expand");
    }
}

// progress bar and timer update


 
video.addEventListener('timeupdate', progressBarUpdate);

function progressBarUpdate(){

    let timer = video.currentTime*(100/video.duration);

   progressBar.style.width = `${timer}%`;

   if(typeof video.duration === 'number' ){
    let currentHours  =  Math.floor(video.currentTime/3600);
    let currentMinutes =  Math.floor(video.currentTime/60);
    let currentSeconds =  Math.floor(video.currentTime - currentMinutes*60);
    let totalDurationHours =  Math.floor(video.duration/3600);
    let totalDurationMinutes = Math.floor(video.duration/60);
    let totalDurationRemainSecs = Math.floor(video.duration-totalDurationMinutes*60);

    
    if(currentHours<10)
    {currentHours = "0" + currentHours};
    if(currentMinutes<10)
    {currentMinutes = "0" + currentMinutes};
    if(currentSeconds<10)
    {currentSeconds = "0" + currentSeconds};
    if(totalDurationHours<10)
    {totalDurationHours = "0" + totalDurationHours};
    if(totalDurationMinutes<10)
    {totalDurationMinutes = "0" + totalDurationMinutes;}
    if(totalDurationRemainSecs<10)
    {totalDurationRemainSecs = "0" + totalDurationRemainSecs};
    
    
        if (currentHours == 0){
     videoCurrentTime[0].textContent =  currentMinutes + " : " + currentSeconds; 
     videoCurrentTime[1].textContent =  currentMinutes + " : " + currentSeconds;
        }else{
            videoCurrentTime[0].textContent = currentHours + currentMinutes + ":" + currentSeconds; 
     videoCurrentTime[1].textContent = currentHours + currentMinutes + " : " + currentSeconds;
        }



        if (totalDurationHours == 0){
     videoTotalDuration.textContent = totalDurationMinutes + " : " +totalDurationRemainSecs;}
     else {

        videoTotalDuration.textContent = totalDurationHours +totalDurationMinutes + " : " +totalDurationRemainSecs;
     }

        }
}

function progressBarFunc(e){

    console.log(e);

    let scrubTime = (e.offsetX/timeTracker.offsetWidth)*video.duration;

    video.currentTime =scrubTime;
   
}

timeTracker.addEventListener('click',progressBarFunc);


timeTracker.addEventListener('mousedown',()=>{

timeTracker.addEventListener('mousemove',dragabbleBar)
})

function dragabbleBar(e){

    let scrubTime = (e.offsetX/timeTracker.offsetWidth)*video.duration;
    progressBar.style.width = `${e.offsetX}px`;
    video.currentTime =scrubTime;
}


timeTracker.addEventListener('mouseup',()=>{

    timeTracker.removeEventListener('mousemove',dragabbleBar)
});

timeTracker.addEventListener('mousemove',e=>{

    videoCurrentTime[0].style.left = `${e.offsetX}px`

})

//  navigation show up-off

// let hideNavigation = () =>{

//     setTimeout(()=>{

//        videoPlayer.classList.remove('showNavigation');

//     },3000);

// }
// hideNavigation();