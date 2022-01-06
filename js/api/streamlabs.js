if (streamlabs_token !== "") {
    socket = io(`https://sockets.streamlabs.com?token=${streamlabs_token}`, {transports: ['websocket']});

    socket.on("connect", () => {
        logMessage("Streamlabs", "Socket Connected");
    });

    socket.on("event", (event) => {
        logObject("Streamlabs", event);
        if (event.type == "subscription" && !event.message[0].gifter) {
            if (!countdownEnded) {
                if (event.message[0].sub_plan == "1000") {
                    addTime(endingTime, seconds_added_per_sub_tier1);
                    logMessage("Streamlabs", `Added ${seconds_added_per_sub_tier1} Seconds Because ${event.message[0].name} Subscribed With Tier 1`);
                }
                else if (event.message[0].sub_plan == "2000") {
                    addTime(endingTime, seconds_added_per_sub_tier2);
                    logMessage("Streamlabs", `Added ${seconds_added_per_sub_tier2} Seconds Because ${event.message[0].name} Subscribed With Tier 2`);
                }
                else if (event.message[0].sub_plan == "3000") {
                    addTime(endingTime, seconds_added_per_sub_tier3);
                    logMessage("Streamlabs", `Added ${seconds_added_per_sub_tier3} Seconds Because ${event.message[0].name} Subscribed With Tier 3`);
                }
                else {
                    addTime(endingTime, seconds_added_per_sub_prime);
                    logMessage("Streamlabs", `Added ${seconds_added_per_sub_prime} Seconds Because ${event.message[0].name} Subscribed With Prime`);
                }
                if (!users.includes(event.message[0].name)) {
                    users.push(event.message[0].name);
                }
            }
        }

        else if (event.type == "resub" && !event.message[0].gifter) {
            if (!countdownEnded) {
                if (event.message[0].sub_plan == "1000") {
                    addTime(endingTime, seconds_added_per_resub_tier1);
                    logMessage("Streamlabs", `Added ${seconds_added_per_resub_tier1} Seconds Because ${event.message[0].name} ReSubscribed With Tier 1`);
                }
                else if (event.message[0].sub_plan == "2000") {
                    addTime(endingTime, seconds_added_per_resub_tier2);
                    logMessage("Streamlabs", `Added ${seconds_added_per_resub_tier2} Seconds Because ${event.message[0].name} ReSubscribed With Tier 2`);
                }
                else if (event.message[0].sub_plan == "3000") {
                    addTime(endingTime, seconds_added_per_resub_tier3);
                    logMessage("Streamlabs", `Added ${seconds_added_per_resub_tier3} Seconds Because ${event.message[0].name} ReSubscribed With Tier 3`);
                }
                else {
                    addTime(endingTime, seconds_added_per_resub_prime);
                    logMessage("Streamlabs", `Added ${seconds_added_per_resub_prime} Seconds Because ${event.message[0].name} ReSubscribed With Prime`);
                }
                if (!users.includes(event.message[0].name)) {
                    users.push(event.message[0].name);
                }
            }
        }

        else if (event.message[0].gifter) {
            if (!countdownEnded) {
                if (event.message[0].sub_plan == "1000") {
                    addTime(endingTime, seconds_added_per_giftsub_tier1);
                    logMessage("Streamlabs", `Added ${seconds_added_per_giftsub_tier1} Seconds Because ${event.message[0].gifter} Gifted A Tier 1 Sub`);
                }
                else if (event.message[0].sub_plan == "2000") {
                    addTime(endingTime, seconds_added_per_giftsub_tier2);
                    logMessage("Streamlabs", `Added ${seconds_added_per_giftsub_tier2} Seconds Because ${event.message[0].gifter} Gifted A Tier 2 Sub`);
                }
                else if (event.message[0].sub_plan == "3000") {
                    addTime(endingTime, seconds_added_per_giftsub_tier3);
                    logMessage("Streamlabs", `Added ${seconds_added_per_giftsub_tier3} Seconds Because ${event.message[0].gifter} Gifted A Tier 3 Sub`);
                }
                else {
                    addTime(endingTime, seconds_added_per_giftsub_tier1);
                    logMessage("Streamlabs", `Added ${seconds_added_per_giftsub_tier1} Seconds Because ${event.message[0].gifter} Gifted A Tier 1 Sub`);
                }
                if (!users.includes(event.message[0].name)) {
                    users.push(event.message[0].name);
                }
            }
        }

        else if (event.type == "donation") {
            if (!countdownEnded) {
                let dono = parseInt(event.message[0].amount);
                let currency = event.message[0].currency;
                if (dono >= min_donation_amount) {
                    let times = Math.floor(dono/min_donation_amount);
                    addTime(endingTime, seconds_added_per_donation * times);
                    logMessage("Streamlabs", `Added ${seconds_added_per_donation * times} Seconds Because ${event.message[0].name} Donated ${dono} ${currency}`);
                    if (!users.includes(event.message[0].name)) {
                        users.push(event.message[0].name);
                    }
                }
            }
        }

        else if (event.type == "bits") {
            if (!countdownEnded) {
                let bits = parseInt(event.message[0].amount);
                if (bits >= min_amount_of_bits) {
                    let times = Math.floor(bits/min_amount_of_bits);
                    addTime(endingTime, seconds_added_per_bits * times);
                    logMessage("Streamlabs", `Added ${seconds_added_per_bits * times} Seconds Because ${event.message[0].name} Donated ${bits} Bits`);
                    if (!users.includes(event.message[0].name)) {
                        users.push(event.message[0].name);
                    }
                }
            }
        }
    });

    socket.on("disconnect", () => {
        logMessage("Streamlabs", "Socket Disconnected");
        socket.connect();
    });
}