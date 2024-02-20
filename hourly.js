function play(filename) {
    var player = require('play-sound')(opts = {})

    player.play(filename, function (err) {
        // We could write to a file.
    })

}

function sleep (interval) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, interval)
    })  
}

(async function main() {

    var filename = 'nicebeep.mp3'

    var filename = process.argv[2]
    while (true) {
        await sleep(100)

        var d = new Date()
        var minutes = d.getMinutes()
        var seconds = d.getSeconds()

        if (minutes === 0 && seconds === 0) {
            play(filename)
            await sleep (1000 * 60)
        }
    }
})()
