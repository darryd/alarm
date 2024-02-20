/*
 
 function play(filename) {
    var player = require('play-sound')(opts = {})
    player.play(filename, function (err) {
        if (err) {
            console.error(err)
        }
        else {
            // Code to run after the audio finishes playing
        }
    })
}

let child = player.play(filename)
child.on("close", (code) => {
   // code to run after the audio finished playing
});

*/

function getTimeUntil(targetHour, targetMinute) {
  // Get the current date and time
  const currentDate = new Date();

  // Check if the target time has already passed today
  if (currentDate.getHours() > targetHour || (currentDate.getHours() === targetHour && currentDate.getMinutes() >= targetMinute)) {
    // If so, set the target time for tomorrow
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Set the target time
  currentDate.setHours(targetHour);
  currentDate.setMinutes(targetMinute);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  // Calculate the time difference in milliseconds
  const timeDiff = currentDate.getTime() - new Date().getTime();

  // Convert the time difference to hours, minutes, and seconds
  const hours = Math.floor(timeDiff / 1000 / 60 / 60);
  const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  // Return the result as an object
  return { hours, minutes, seconds };
}

/*
// Example usage: get the time until 3:30 PM
const targetHour = 15; // 24-hour format
const targetMinute = 30;
const timeUntil = getTimeUntil(targetHour, targetMinute);
console.log(`Time until ${targetHour}:${targetMinute}: ${timeUntil.hours} hours, ${timeUntil.minutes} minutes, ${timeUntil.seconds} seconds`);
*/

function play(filename) {
    var player = require('play-sound')(opts = {})

    player.play(filename, function (err) {
        if (err) {
            console.error(err)
        }
    })

}

function sleep (interval) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })  
}
function selectRandomMp3() {
    return new Promise((resolve, reject) => {

        const folder = __dirname;
        const fs = require('fs');
        const path = require('path')

        fs.readdir(folder, (err, files) => {
            if (err) {
                reject(err)
            }
            else {
                var songs = []
                files.forEach(file => {
                    if (path.extname(file) === ".mp3") {
                        songs.push(file)
                    }
                });

                var randomIndex = Math.floor(Math.random() * (songs.length));

                resolve(songs[randomIndex])         
            }
        });
    })
}


(async function main() {

    var filename;
    var isRandomMp3 = false

    if (process.argv.length === 4 || process.argv.length === 5) {

        if (process.argv.length === 4) {
            isRandomMp3 = true
            filename = await selectRandomMp3()

        }
        else {
            filename = process.argv[4]
        }
    }
    else {
        console.log(process.argv)
        console.error(`usage: node ${process.argv[0]} hour minute filename`)
        console.error(`filename is optional`)
        process.exit()
    }

    var targetHour = parseInt(process.argv[2])
    var targetMinute = parseInt(process.argv[3])


    function formatTime(minute) {
        if (`${minute}`.length === 1) {
            return `0${minute}`
        }
        else
            return minute
    }

   
    var lastSeconds = 61;
    var lastMinutes = 61;
    while (true) {
        await sleep(100)

        var d = new Date()
        var hours = d.getHours()
        var minutes = d.getMinutes()
        var seconds = d.getSeconds()
        
        if (lastSeconds !== seconds) {
            console.clear()
            console.log(`alarm: ${!isRandomMp3 ? filename : "random song"} at ${targetHour}:${formatTime(targetMinute)}`)
            console.log(`Time: ${hours}:${formatTime(minutes)}:${formatTime(seconds)}\n`)
            
            const timeUntil = getTimeUntil(targetHour, targetMinute);
            console.log(`Time remaining: ${timeUntil.hours} hours, ${timeUntil.minutes} minutes, ${timeUntil.seconds} seconds\n`);

            if (lastMinutes !== minutes && hours === targetHour && minutes === targetMinute) {
        	    play(filename)
            }
        }
        
        lastSeconds = seconds
        lastMinutes = minutes
    }

})()
