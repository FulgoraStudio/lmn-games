(function () {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var soundBuffers = new Map();

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

    function playSound(soundUrl) {
        var soundBuffer = soundBuffers.get(soundUrl);

        if (soundBuffer) {
            var source = audioContext.createBufferSource();
            source.buffer = soundBuffer;
            source.connect(audioContext.destination);
            source.start();
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

        play: function (soundUrl) {
            playSound(soundUrl);
        }
    };
})();