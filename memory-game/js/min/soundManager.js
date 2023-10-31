(function () {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var soundBuffers = new Map();
    var currentSource;
    var currentMusic;
    var currentMusicPath;
    var isMusicMuted = false;

    function loadSound(url) {
        return fetch(url)
            .then(function (response) {
                return response.arrayBuffer();
            })
            .then(function (buffer) {
                return audioContext.decodeAudioData(buffer);
            })
            .catch(err => console.error(err));
    }

    function playMusic(soundUrl, loop) {
        if(isMusicMuted) return;
        currentMusicPath = soundUrl;

        var soundBuffer = soundBuffers.get(soundUrl);

        if (soundBuffer) {
            var source = audioContext.createBufferSource();
            source.buffer = soundBuffer;
            source.connect(audioContext.destination);
            source.loop = loop || false; // Configurar loop
            source.start(0);
            currentSource = source; 
            currentMusic = source;
        }
    }

    function stopMusic(){
        if (currentMusic) {
            currentMusic.stop(); // Detener el sonido actual
            currentMusic = null;
        }
    }

    function playSound(soundUrl, loop) {
        if(isMusicMuted) return;
        var soundBuffer = soundBuffers.get(soundUrl);

        if (soundBuffer) {
            var source = audioContext.createBufferSource();
            source.buffer = soundBuffer;
            source.connect(audioContext.destination);
            source.loop = loop || false; // Configurar loop
            source.start(0);
            currentSource = source; // Guardar la referencia al objeto source actual
        }
    }

    function playOneShoot(soundUrl) {
        if(isMusicMuted) return;
        var soundBuffer = soundBuffers.get(soundUrl);

        if (soundBuffer) {
            stopSound(); // Detener el sonido actual, si hay alguno en reproducción

            var source = audioContext.createBufferSource();
            source.buffer = soundBuffer;
            source.connect(audioContext.destination);
            source.start(0);
            currentSource = source; // Guardar la referencia al objeto source actual
        }
    }

    function stopSound() {        
        if (currentSource) {
            currentSource.stop(); // Detener el sonido actual
        }
    }
    
    function restartSound() {
        if(isMusicMuted) return;
        if (currentSource) {
            currentSource.stop(); // Detener el sonido actual
            currentSource.start(0); // Reiniciar el sonido desde el principio
        }
    }

    function isMuted(muted){
        isMusicMuted = muted;

        if(isMusicMuted) {
            if(currentMusic) currentMusic.stop();
            if(currentSource) currentSource.stop();
        } else {
            playMusic(currentMusicPath, true);
        }
    }

    window.SoundManager = {
        loadSounds: function (soundUrls) {
            var promises = soundUrls.map(function (url) {
                return loadSound(url)
                    .then(function (decodedData) {
                        soundBuffers.set(url, decodedData);
                    });
            });

            return Promise.all(promises);
        },

        playMusic: function (soundUrl, loop) {
            playMusic(soundUrl, loop);
        },

        stopMusic: function (soundUrl) {
            stopMusic(soundUrl);
        },

        playSound: function (soundUrl, loop) {
            playSound(soundUrl, loop);
        },
        
        playOneShoot: function (soundUrl) {
            playOneShoot(soundUrl);
        },

        stopSound: function() {
            stopSound();
        },
      
        restartSound: function() {
            restartSound();
        },

        changeVolume: function(muted){
            isMuted(muted);
        },
    };
})();