const audio=document.querySelector('audio');
const playpauseBtn=document.querySelector('#play-pause');
const nextBtn=document.querySelector('#next');
const prevBtn=document.querySelector('#previous');
const songList=document.querySelector('.song-list');
const title=document.querySelector('#title');
const record=document.querySelector('.record');
const volSlider=document.querySelector('.slider');

let songArray= [];
let songTitle='';
let songIndex=0;
let isPlaying=false;

function loadAudio(){
    audio.src=songArray[songIndex];  
    let songListItems=songList.getElementsByTagName('li');
    songTitle=songListItems[songIndex].getAttribute('data-name');
    title.innerText=songTitle;


    for(i=0;i<songListItems.length;i++){
        songListItems[i].classList.remove('active');
    }
    
    songList.getElementsByTagName('li')[songIndex].classList.add('active');

}
//loading the songs in the array from the html song list
 function loadSongs(){
     let song = songList.getElementsByTagName('li');
     for(i=0;i<song.length;i++){
         songArray.push(song[i].getAttribute('data-src'));
     }

     loadAudio();
 }
 loadSongs();
 

 function playAudio(){
    audio.play();
    playpauseBtn.querySelector('i.fa').classList.remove('fa-play');
    playpauseBtn.querySelector('i.fa').classList.add('fa-pause');
    isPlaying=true;
    record.classList.add('record-animation');
}
function pauseAudio(){
   audio.pause();
   playpauseBtn.querySelector('i.fa').classList.remove('fa-pause');
   playpauseBtn.querySelector('i.fa').classList.add('fa-play');
   isPlaying=false;
   record.classList.remove('record-animation');
   
}
function nextSong(){
    songIndex++;
    if( songIndex > songArray.length -1){
        songIndex =0;
    };
    loadAudio();
    playAudio();
 }
 function previousSong(){
    songIndex--;
    if(songIndex < 0 ){
        songIndex = songArray.length -1;
    };
    loadAudio();
    playAudio();
 }

playpauseBtn.addEventListener('click',function(){
   if(isPlaying){
       pauseAudio();
   }
   else{
       playAudio();
   }
   
},false );

nextBtn.addEventListener('click',function() {
    nextSong();
 }, false);
 
 prevBtn.addEventListener('click',function() {
    previousSong();
 }, false);
 
 songList.addEventListener('click',function(e){
    songIndex = e.target.closest('li').getAttribute('data-index');
    loadAudio();
    playAudio();
 },false);
 
 audio.addEventListener('ended',function(){
    nextSong();
 });
 
 volSlider.addEventListener('input', function(){
    audio.volume = volSlider.value / 100 ;
 },false);