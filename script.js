window.addEventListener('load', function(){
    const container = document.getElementById("container");
    const canvas = document.getElementById("canvas1");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let audioSource;
    let analyser;
 
    container.addEventListener('click', function() {
      const audio1 = document.getElementById("audio1");
    // audio1.src = "good.mp3"
    //audio1.src = "free.mp3"
    //audio1.src = "pea.mp3"
    //audio1.src = "Trinity.mp3"
    audio1.src = "01 Never Mind.mp3"
      audio1.play();
      const audioContext = new AudioContext();
      console.log(audioSource)
      if (!audioSource) {
        audioSource = audioContext.createMediaElementSource(audio1);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
      }
  
      analyser.fftSize = 1024;
      console.log(analyser.fftSize)
      const bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);

      const dataArray = new Uint8Array(bufferLength);

      const barWidth = (canvas.width/4.2)/ bufferLength;
      let barHeight;
      let x = 0;

      function animate() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        x = 0;
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] * 3.5;
          
          
          const red = 200 * (i/bufferLength);
          const green = 250;
          const blue = 0;
          
          ctx.fillStyle = "rgba(" + red + "," + green + "," + blue  + "," + "1" + ")";
          ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] * 3.5;
          
          const red = 200 * (i/bufferLength);
          const green = 250;
          const blue = 0;

          ctx.fillStyle = "rgba(" + red + "," + green + "," + blue  + "," + "1" + ")";
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }

        requestAnimationFrame(animate);
      }

    animate();
    });
});
