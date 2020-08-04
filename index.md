<html>
  <head>
    <script src="node_modules/tone/build/Tone.js"></script>
    <title>Singing crowd simulator</title>
  </head>
  <body>
    <h1>Singing crowd simulator</h1>
    <label for="n">Range:</label> ±<input id="n" value=1 type="number" /> semitones<br />
    <br />
    <label for="var">Variance index:</label> <input id="var" value=1 type="number" /> <br />
    1: uniform distribution in range <br />
    2: symmetric triangular distribution in range <br />
    ≥3: approximative centered gaussian distribution in range, with increasing thinness <br />
    <br />
    <label for="voices">Voices:</label> <input id="voices" value=5 type="number" /> <br />
    <br />
    <button id="start">Start</button>
    <button id="stop">Stop</button>
    <script src="main.js"></script>
  </body>
</html>