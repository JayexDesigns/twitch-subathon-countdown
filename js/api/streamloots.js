if (streamloots_token !== "") {
    evtSourceStreamLoots = new EventSource(`https://widgets.streamloots.com/alerts/${streamloots_token}/media-stream`);
    logMessage("Streamloots", "Event Source Created");

    evtSourceStreamLoots.onmessage = async (event) => {
        data = await JSON.parse(event.data);
        logObject("Streamloots", data);
        if (data.data.type == "purchase") {
            if (!countdownEnded) {
                let chests;
                if (typeof(data.data.fields[0].value) == "number") {
                    chests = data.data.fields[0].value;
                    if (chests >= min_amount_of_chests) {
                        let times = Math.floor(chests/min_amount_of_chests);
                        addTime(endingTime, seconds_added_per_chests * times);
                        logMessage("Streamloots", `Added ${seconds_added_per_chests * times} Seconds Because ${data.data.fields[1].value} Bought ${chests} Chests`);
                        if (!users.includes(data.data.fields[1].value)) {
                            users.push(data.data.fields[1].value);
                        }
                    }
                }
                else {
                    chests = data.data.fields[1].value;
                    if (chests >= min_amount_of_chests) {
                        let times = Math.floor(chests/min_amount_of_chests);
                        addTime(endingTime, seconds_added_per_chests * times);
                        logMessage("Streamloots", `Added ${seconds_added_per_chests * times} Seconds Because ${data.data.fields[0].value} Gifted ${chests} Chests`);
                        if (!users.includes(data.data.fields[0].value)) {
                            users.push(data.data.fields[0].value);
                        }
                    }
                }
            }
        }
    }
}