const start = () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    endingTime = new Date(Date.now());
    endingTime = timeFunc.addHours(endingTime, initialHours);
    endingTime = timeFunc.addMinutes(endingTime, initialMinutes);
    endingTime = timeFunc.addSeconds(endingTime, initialSeconds);

    timeText = document.getElementById("timeText");

    const getNextTime = () => {
        let currentTime = new Date(Date.now());
        let differenceTime = endingTime - currentTime;
        let time = `${timeFunc.getHours(differenceTime)}:${timeFunc.getMinutes(differenceTime)}:${timeFunc.getSeconds(differenceTime)}`;
        if (time === "00:00:00") {
            clearInterval(inter);
            time = "¡FIN!";
            console.log(time);
        }
        timeText.innerText = time;
    }

    const inter = setInterval(() => {
        getNextTime();
    }, 100);



    socket = io(`https://sockets.streamlabs.com?token=${streamlabsToken}`, {transports: ['websocket']})

    socket.on("connect", () => {
        console.log("Socket Connected");
    });

    socket.on("event", (event) => {
        console.log(event);
        if (event.type == "subscription" || event.type == "resub") {
            endingTime = timeFunc.addSeconds(endingTime, secondsPerSub);
        }
        else if (event.type == "donation") {
            if (parseInt(event.message[0].amount) >= quantityDono) {
                endingTime = timeFunc.addSeconds(endingTime, secondsPerDono);
            }
        }
        else if (event.type == "bits") {
            if (parseInt(event.message[0].amount) >= quantityBits) {
                endingTime = timeFunc.addSeconds(endingTime, secondsPerBits);
            }
        }
    });

    socket.on("disconnect", () => {
        console.log("Socket Disconnected");
    });



    evtSourceStreamLoots = new EventSource(`https://widgets.streamloots.com/alerts/${streamlootsToken}/media-stream`);

    evtSourceStreamLoots.onmessage = async (event) => {
        data = await JSON.parse(event.data);
        if (data.data.type == "purchase") {
            if (typeof(data.data.fields[0].value) == "number") {
                if (data.data.fields[0].value >= quantityChest) {
                    endingTime = timeFunc.addSeconds(endingTime, secondsPerChest);
                }
            }
            else {
                if (data.data.fields[1].value >= quantityChest) {
                    endingTime = timeFunc.addSeconds(endingTime, secondsPerChest);
                }
            }
        }
    }
}