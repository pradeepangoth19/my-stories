// music-player.js
// Reusable background music script for managing global audio tracks.

(function() {
    // Check or create a single global audio element on the window object
    if (!window.__globalMemoryAudio) {
        window.__globalMemoryAudio = new Audio();
        window.__globalMemoryAudio.loop = true;
    }

    const audio = window.__globalMemoryAudio;

    // Global function to play a song or switch tracks immediately
    window.playMemorySong = function(songUrl) {
        if (!songUrl) return;

        // If a song is already playing or loaded, stop it and switch immediately
        audio.pause();
        audio.src = songUrl;
        audio.currentTime = 0;
        
        // Play the new audio and catch any browser restriction errors
        audio.play().catch(err => {
            console.log("Playback prevented or file not found:", err);
        });
    };
})();