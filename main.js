const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')


//sira

let index

//dongu
let loop = true

//sarki listesi
const songsList = [
    {
        name: 'Aramam',
        link: "assets/aramam.mp3",
        artist: "Ibrahim Tatlises",
        image: 'assets/ibrahim-tatlises.jpeg'
    },

    {
        name: 'Annem',
        link: "assets/annem.mp3",
        artist: "Mahsun Kirmizigul",
        image: 'assets/mahsun.jpeg'
    },
    {
        name: 'Gelo Ew Ki Bu',
        link: "assets/gelo-ew-ki-bu.mp3",
        artist: "Aram Tigran",
        image: 'assets/aram-tigran.jpeg'
    },
    {
        name: 'Gitme Kal',
        link: "assets/yara-bere-icindeyim.mp3",
        artist: "Hira-i Zerdust",
        image: 'assets/hirai.jpeg'
    },
    {
        name: 'Ax Eman',
        link: "assets/ax-eman.mp3",
        artist: "Rewsan Celiker",
        image: "assets/rewsan-celiker.jpeg"
    }
]

//sarki atama
const setSong = (arrayIndex) => {

    let{name, link, artist, image} = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML =artist
    songImage.src = image

    audio.onloadeddata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }

    //sureyi düzenle

    playAudio()

    playListContainer.classList.add('hide')
}

//oynatma listesi göster
playListButton.addEventListener('click', () =>{
    playListContainer.classList.remove('hide')
})

//tekrar tiklayınca
repeatButton.addEventListener('click', () => {
    if (repeatButton.classList.contains('active')){
        (repeatButton.classList.remove('active'))
        audio.loop = false
        console.log('tekrar kapatildi')
    } else {
        repeatButton.classList.add('active')
        audio.loop = true
        console.log('tekrar acildi')
    }
})

//karistirici tiklayinca
shuffleButton.addEventListener('click', () =>{
    if (shuffleButton.classList.contains("active")){
        shuffleButton.classList.remove('active')
        loop = true
        console.log('karistirma kapali')
    } else {
        shuffleButton.classList.add('active')
        loop = true
        console.log('karistirma acildi')
    }
})

//ilerleme cubuguna tiklayinca
progressBar.addEventListener('click', (event) =>{
    let coordStart = progressBar.getBoundingClientRect().left
    console.log(coordStart)

    let coordEnd = event.clientX
    console.log(coordEnd)

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"
    audio.currentTime = progress * audio.duration

    playAudio ()
})

// zaman tutucu
setInterval(() => {
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);

//sarkiyi oynat
const playAudio = () =>{
    audio.play()
    playButton.classList.add('hide')
    pauseButton.classList.remove('hide')
}
 
//sarkiyi durdur
const pauseAudio = () =>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

//sonraki şarkı
const nextSong = () =>{
    if (loop) { //dongü acıksa
        if (index == (songsList.length - 1)){
            index=0
        } else{
            index = index + 1
        }
        setSong(index)
    } else {
        //karistirici aciksa
        let randIndex= Math.floor(Math.random() * songsList.setSong(randIndex))
    }
}

//onceki sarki
const previousSong = () =>{
    pauseAudio()
    if (index > 0){
        index = index - 1
    } else {
        index = songsList.length - 1
    }

    setSong(index)
}

//sarki bittiğinde
audio.onended = () =>{
    nextSong()
}

//zaman düzenleme
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput/60)
    minute = minute < 10 ? '0' + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? '0' + second : second
    return `${minute}:${second}`
}

//sarki suresi degistikce
audio.addEventListener('timeupdate', ()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//sarki listesi olustur
const initPlaylist = () =>{
    for (const i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong" onclick="setSong(${i})">
        <div class="playlist-image-container">
            <img src="${songsList[i].image}"/>
            </div>
            <div class=playlist-song-details">
                <span id="playlist-song-name">
                ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                ${songsList[i].artist}
                </span>
            </div>
            </li>` 
    }
}

//oynata tıklayınca
playButton.addEventListener('click', playAudio)

//dura tıklayınca
pauseButton.addEventListener('click', pauseAudio)

//sonrakine geç tıklama
nextButton.addEventListener('click', nextSong)

//önceye git tiklama
prevButton.addEventListener('click' , previousSong)

window.onload = () =>{
    index=0
    setSong(index)
    pauseAudio()
    initPlaylist()
}