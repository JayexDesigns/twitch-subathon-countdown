<h1 align="center">Twitch Subathon Countdown</h1>
<p align="center">This is a countdown specifically made for the Twitch streamer "SugusSusana"</p>
<br/>

<h2>Description</h2>
<p>A subathon timer that increases when someone subscribes, donates money, donates bits or purchases streamloots chests.</p>
<br/>

<h2>Usage</h2>
<p>After cloning this repository you'll have to edit the "config.js" file with any plain text editor, then change the value of the variables acording to what you want:</p>

<h3>Streamlabs Token</h3>
<p>To get the token you'll have to go to the api settings tab of your <a href="https://streamlabs.com/dashboard#/settings/api-settings">streamlabs dashboard</a> then click on tokens API, copy your socket API token and finally paste the code on the "streamlabsToken" variable in the "config.js" file.</p>
<img src="./auth_streamlabs.png">

<h3>Streamloots Token</h3>
<p>To get the token you'll have to go to your streamloots creator dashboard, then to alerts & widgets, then go to alerts, then copy the last part of the alerts url and finally paste the code on the "streamlootsToken" variable in the "config.js" file.</p>
<img src="./auth_streamloots.png">

<h3>Initial Time</h3>
<p>You can set the initial time of the timer by setting the hours, minutes and seconds to be added when the timer is added.</p>

<h3>Other Value</h3>
<p>Change the other values to set the amount of seconds that will be added for the suscriptions, donations... And the minimum donation amounts to trigger the countdown increase.</p>

<h3>Add To OBS</h3>
<p>To add it to OBS you just have to drag the "index.html" file to the sources section or add a browser source that points to the "index.html" file.</p>
