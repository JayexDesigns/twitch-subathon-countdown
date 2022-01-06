if (streamelements_token !== "") {
    var streamElementsSocket;
    const streamElementsConnect = () => {
        streamElementsSocket = undefined;
        streamElementsSocket = io('https://realtime.streamelements.com', {
            transports: ['websocket']
        });

        streamElementsSocket.on('connect', onConnect);
        streamElementsSocket.on('disconnect', onDisconnect);
        streamElementsSocket.on('authenticated', onAuthenticated);
        streamElementsSocket.on('unauthorized', console.error);
        streamElementsSocket.on('event:test', onEvent);
        streamElementsSocket.on('event', onEvent);
        streamElementsSocket.on('event:update', onEvent);
        streamElementsSocket.on('event:reset', onEvent);

        function onConnect() {
            logMessage("StreamElements", "Socket Connected");
            streamElementsSocket.emit('authenticate', {method: 'apikey', token: streamelements_token});
        }

        function onDisconnect() {
            logMessage("StreamElements", "Socket Disconnected");
            streamElementsConnect();
        }

        function onAuthenticated(data) {
            const {
                channelId
            } = data;
            logMessage("StreamElements", `Channel ${channelId} Connected`);
        }

        function onEvent(data) {
            logObject("StreamElements", data);
            if (!countdownEnded) {
                if (data['listener'] === "subscriber-latest") {
                    if (data['event']['gifted'] || data['event']['bulkGifted']) {
                        let amount;
                        if (data['event']['gifted']) amount = 1;
                        else amount = data['event']['amount'];
                        if (data['event']['tier'] == "prime" || data['event']['tier'] == "1000") {
                            addTime(endingTime, seconds_added_per_giftsub_tier1 * amount);
                            logMessage("StreamElements", `Added ${seconds_added_per_giftsub_tier1 * amount} Seconds Because ${data['event']['name']} Gifted ${amount} Tier 1 Subs`);
                        }
                        else if (data['event']['tier'] == "2000") {
                            addTime(endingTime, seconds_added_per_giftsub_tier2 * amount);
                            logMessage("StreamElements", `Added ${seconds_added_per_giftsub_tier2 * amount} Seconds Because ${data['event']['name']} Gifted ${amount} Tier 2 Subs`);
                        }
                        else if (data['event']['tier'] == "3000") {
                            addTime(endingTime, seconds_added_per_giftsub_tier3 * amount);
                            logMessage("StreamElements", `Added ${seconds_added_per_giftsub_tier3 * amount} Seconds Because ${data['event']['name']} Gifted ${amount} Tier 3 Subs`);
                        }
                    }
                    else if (data['event']['amount'] != "1") {
                        if (data['event']['tier'] == "prime") {
                            addTime(endingTime, seconds_added_per_resub_prime);
                            logMessage("StreamElements", `Added ${seconds_added_per_resub_prime} Seconds Because ${data['event']['name']} ReSubscribed With Prime`);
                        }
                        else if (data['event']['tier'] == "1000") {
                            addTime(endingTime, seconds_added_per_resub_tier1);
                            logMessage("StreamElements", `Added ${seconds_added_per_resub_tier1} Seconds Because ${data['event']['name']} ReSubscribed With Tier 1`);
                        }
                        else if (data['event']['tier'] == "2000") {
                            addTime(endingTime, seconds_added_per_resub_tier2);
                            logMessage("StreamElements", `Added ${seconds_added_per_resub_tier2} Seconds Because ${data['event']['name']} ReSubscribed With Tier 2`);
                        }
                        else if (data['event']['tier'] == "3000") {
                            addTime(endingTime, seconds_added_per_resub_tier3);
                            logMessage("StreamElements", `Added ${seconds_added_per_resub_tier3} Seconds Because ${data['event']['name']} ReSubscribed With Tier 3`);
                        }
                    }
                    else {
                        if (data['event']['tier'] == "prime") {
                            addTime(endingTime, seconds_added_per_sub_prime);
                            logMessage("StreamElements", `Added ${seconds_added_per_sub_prime} Seconds Because ${data['event']['name']} Subscribed With Prime`);
                        }
                        else if (data['event']['tier'] == "1000") {
                            addTime(endingTime, seconds_added_per_sub_tier1);
                            logMessage("StreamElements", `Added ${seconds_added_per_sub_tier1} Seconds Because ${data['event']['name']} Subscribed With Tier 1`);
                        }
                        else if (data['event']['tier'] == "2000") {
                            addTime(endingTime, seconds_added_per_sub_tier2);
                            logMessage("StreamElements", `Added ${seconds_added_per_sub_tier2} Seconds Because ${data['event']['name']} Subscribed With Tier 2`);
                        }
                        else if (data['event']['tier'] == "3000") {
                            addTime(endingTime, seconds_added_per_sub_tier3);
                            logMessage("StreamElements", `Added ${seconds_added_per_sub_tier3} Seconds Because ${data['event']['name']} Subscribed With Tier 3`);
                        }
                    }
                    if (!users.includes(data['event']['name'])) {
                        users.push(data['event']['name']);
                    }
                }

                else if (data['listener'] === "cheer-latest") {
                    if (data['event']['amount'] >= min_amount_of_bits) {
                        let times = Math.floor(data['event']['amount']/min_amount_of_bits);
                        addTime(endingTime, seconds_added_per_bits * times);
                        logMessage("StreamElements", `Added ${seconds_added_per_bits * times} Seconds Because ${data['event']['name']} Donated ${data['event']['amount']} Bits`);
                        if (!users.includes(data['event']['name'])) {
                            users.push(data['event']['name']);
                        }
                    }
                }

                else if (data['listener'] === "tip-latest") {
                    if (data['event']['amount'] >= min_donation_amount) {
                        let times = Math.floor(data['event']['amount']/min_donation_amount);
                        addTime(endingTime, seconds_added_per_donation * times);
                        logMessage("StreamElements", `Added ${seconds_added_per_donation * times} Seconds Because ${data['event']['name']} Donated ${data['event']['amount']}$`);
                        if (!users.includes(data['event']['name'])) {
                            users.push(data['event']['name']);
                        }
                    }
                }
            }
        }
    }
    streamElementsConnect();
}