import * as THREE from 'three';
import { loadAudio } from '.';

const Audio = function() {

    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);

    this.load = async () => {
        const soundBuffer = await loadAudio('ghost.mp3');
        sound.setBuffer(soundBuffer);
        sound.setLoop(true);
        this.analyzer = new THREE.AudioAnalyser(sound, 1024);
    }

    const frequencyBandsBuffer = new Array(8).fill(0);
    const bufferDecrease = new Array(8).fill(0);
    const highestFreqBand = new Array(8).fill(0);

    this.audioBands = new Array(8).fill(0);
    this.audioBandsBuffer = new Array(8).fill(0);

    const getFrequencyBands = samples => {
        let count = 0;
        return Array(8).fill(0).map(
            (_, i) => {
                let sampleCount = Math.pow(2, i) * 2;

                if (i === 7)  sampleCount += 2;
                
                let average = 0;
                for (let j = 0 ; j < sampleCount  ; j++) {
                    average += samples[count] * (count + 1 );
                    count++
                }
                return average * 10 / sampleCount;
            }
        )
    }

    const getFrequencyBandsBuffer = (bands) => {
        const buffer = frequencyBandsBuffer;
        return buffer.map(
            (sample, i) => {
                if (bands[i] > sample) {
                    bufferDecrease[i] = 0.005;
                    return bands[i];
                }
                bufferDecrease[i] *= 1.2;
                return sample - bufferDecrease[i];
            }
        )
    }


    const createAudioBands = (frequencyBands, frequencyBandsBuffer) => {
        const audioBands = new Array(8).fill(0);
        const audioBandsBuffer = new Array(8).fill(0);

        for (let i in audioBands) {
            if (frequencyBands[i] > highestFreqBand[i]) {
                highestFreqBand[i] = frequencyBands[i]
            }
            audioBands[i] = frequencyBands[i] / (highestFreqBand[i] || 1);
            audioBandsBuffer[i] = frequencyBandsBuffer[i] / (highestFreqBand[i] || 1);
        }
        return {audioBands, audioBandsBuffer};
    }

    this.update = () => {
        
        if (!sound.isPlaying) sound.play();
        const data = this.analyzer.getFrequencyData();
        const frequencyBands = getFrequencyBands(data);
        const buffer = getFrequencyBandsBuffer(frequencyBands);
        const {audioBands, audioBandsBuffer} = createAudioBands(frequencyBands, buffer);
        this.audioBands = audioBands;
        this.audioBandsBuffer = audioBandsBuffer;
    }  


}

export default Audio;