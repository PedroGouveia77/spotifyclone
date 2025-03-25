
// player.js

import songs from "/content/music.js";

document.addEventListener('DOMContentLoaded', function() {

    const allDiv = document.querySelector('#all');

    let isMouseMoving = false;
    let timeout;

    const fadeOut = () => {
        allDiv.style.opacity = '0';
        allDiv.style.transition = 'opacity 0.5s ease';
    };

    const fadeIn = () => {
        allDiv.style.opacity = '1';
        allDiv.style.transition = 'opacity 0.5s ease';
    };

    document.addEventListener('mousemove', () => {
        isMouseMoving = true;
        fadeIn();
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            isMouseMoving = false;
            fadeOut();
        }, 2000);
    });

    const player = document.querySelector("#player");
    const musicName = document.querySelector("#musicName");
    const playPauseButton = document.querySelector("#playPauseIcon");
    const currentTimeDisplay = document.querySelector("#currentTime");
    const durationDisplay = document.querySelector("#duration");
    const progressBar = document.querySelector(".progress-bar");
    const progress = document.querySelector(".progress");
    const heartIcon = document.getElementById('heartIcon');
    const volumeBar = document.querySelector(".volume-bar");
    const volumeProgress = document.querySelector(".volume-progress");
    const volumeIcon = document.querySelector(".volume i");

    let isPlaying = false;

    let currentSongIndex = 0;

    const togglePlayPause = () => {
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
        isPlaying = !isPlaying;
        updatePlayPauseButton();
    };

    const updatePlayPauseButton = () => {
        playPauseButton.classList.toggle('fa-play', !isPlaying);
        playPauseButton.classList.toggle('fa-pause', isPlaying);
    };

    const updateCurrentTime = () => {
        const currentMinutes = Math.floor(player.currentTime / 60);
        const currentSeconds = Math.floor(player.currentTime % 60);
        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    };

    const updateDuration = () => {
        const durationMinutes = Math.floor(player.duration / 60);
        const durationSeconds = Math.floor(player.duration % 60);
        durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    };

    const updateProgressBar = () => {
        const progressWidth = (player.currentTime / player.duration) * 100;
        progress.style.width = `${progressWidth}%`;
        progress.classList.add('green-progress');
    };

    const updateVolumeBar = () => {
        const volumeWidth = player.volume * 100;
        volumeProgress.style.width = `${volumeWidth}%`;
    };

    updateVolumeBar();
    volumeProgress.classList.add('green-volume-progress');

    volumeIcon.addEventListener('click', function() {
        if (player.volume === 0) {
            player.volume = volumeIcon.dataset.previousVolume;
        } else {
            volumeIcon.dataset.previousVolume = player.volume;
            player.volume = 0;
        }
        updateVolumeBar();
    });

    const updateMusic = () => {
        player.src = "/msc/ariana.mp3";
        player.load();
    };

    playPauseButton.addEventListener('click', togglePlayPause);

    progressBar.addEventListener('click', (event) => {
        const clickedPosition = event.offsetX;
        const barWidth = progressBar.clientWidth;
        const newTime = (clickedPosition / barWidth) * player.duration;
        player.currentTime = newTime;
    });

    volumeBar.addEventListener('click', (event) => {
        const clickedPosition = event.offsetX;
        const barWidth = volumeBar.clientWidth;
        const newVolume = clickedPosition / barWidth;
        player.volume = newVolume;
        updateVolumeBar();
    });

    player.addEventListener('timeupdate', () => {
        updateCurrentTime();
        updateProgressBar();
    });

    player.addEventListener('loadedmetadata', () => {
        updateDuration();
    });

    player.addEventListener('ended', () => {
        // Here you can add logic to handle the end of the song
    });

    updateMusic();

    heartIcon.addEventListener('click', function() {
        if (heartIcon.classList.contains('fas')) {
            heartIcon.classList.remove('fas');
            heartIcon.classList.remove('green-heart');
        } else {
            heartIcon.classList.add('fas');
            heartIcon.classList.add('green-heart');
        }
        heartIcon.classList.add('far');
    });

    const closeButton = document.createElement('div');
    closeButton.textContent = 'X';
    closeButton.style.position = 'fixed';
    closeButton.style.top = '50px';
    closeButton.style.right = '60px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#ffffff'; 
    closeButton.style.fontSize = '40px'; 
    closeButton.style.zIndex = '1000'; 
    
    closeButton.addEventListener('click', function() {
        window.location.href = '/content/listen.html';
    });
    
    
    document.body.appendChild(closeButton);

});
