var context = new AudioContext(),
    mousedown = false,
    oscillator = null,
    gainNode = context.createGain();

function calculateFrequency (mouseXPosition) {
    var minFrequency = 20,
        maxFrequency = 2000;
    return ((mouseXPosition / window.innerWidth) * maxFrequency) + minFrequency;
}

function calculateGain (mouseYPosition) {
    var minGain = 0,
        maxGain = 1;

    return 1 - ((mouseYPosition / window.innerHeight) * maxGain) + minGain;
}

document.body.addEventListener('mousedown', function (e) {
    mousedown = true;
    oscillator = context.createOscillator();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
    gainNode.gain.setTargetAtTime(calculateGain(e.clientY), context.currentTime, 0.01);
    oscillator.start(context.currentTime);
});

document.body.addEventListener('mousemove', function (e) {
    if (mousedown) {
        oscillator.frequency.setTargetAtTime(calculateFrequency(e.clientX), context.currentTime, 0.01);
        gainNode.gain.setTargetAtTime(calculateGain(e.clientY), context.currentTime, 0.01);
    }
});

document.body.addEventListener('mouseup', function () {
    mousedown = false;
    if (oscillator) {
        oscillator.stop(context.currentTime + 1);
        oscillator.disconnect();
    }
});