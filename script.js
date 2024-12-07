const apiKey = "c558b5d6-5a49-49c4-b24b-659b0d2b89ba"; // Replace with your Hypixel API key
const webhookUrl = "https://discord.com/api/webhooks/1314929346741403728/LH83TcZEzTZOQ8jYUyM3l4A3s8KDvazcMC77IQ8W41AH6weFNUkkwdY3YZrokCe7fPze"; // Replace with your Discord webhook URL

document.getElementById("checkStatus").addEventListener("click", async () => {
    const uuid = document.getElementById("uuid").value.trim(); // Expect UUID instead of username
    const resultElement = document.getElementById("result");

    if (!uuid) {
        resultElement.textContent = "Please enter a UUID!";
        return;
    }

    resultElement.textContent = "Checking...";

    try {
        // Step 1: Check Hypixel Status using UUID
        const hypixelResponse = await fetch(`https://api.hypixel.net/status?key=${apiKey}&uuid=${uuid}`);
        if (!hypixelResponse.ok) throw new Error("Failed to fetch Hypixel status!");
        const hypixelData = await hypixelResponse.json();

        if (hypixelData.session.online) {
            resultElement.textContent = `Player with UUID ${uuid} is online! Sending notification...`;

            // Step 2: Send Discord Webhook
            await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: `Player with UUID **${uuid}** is online!`
                })
            });

            resultElement.textContent = `Player with UUID ${uuid} is online! Notification sent.`;
        } else {
            resultElement.textContent = `Player with UUID ${uuid} is offline.`;
        }
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
});



const uuid = "ef01b4bc-4101-479b-9b24-d10b7d370ada"; // UUID to track

// Function to check player status
async function checkPlayerStatus() {
    const resultElement = document.getElementById("result");

    try {
        resultElement.textContent = `Checking status for UUID ${uuid}...`;

        // Step 1: Check Hypixel Status using UUID
        const hypixelResponse = await fetch(`https://api.hypixel.net/status?key=${apiKey}&uuid=${uuid}`);
        if (!hypixelResponse.ok) throw new Error("Failed to fetch Hypixel status!");
        const hypixelData = await hypixelResponse.json();

        if (hypixelData.session.online) {
            resultElement.textContent = `Player with UUID ${uuid} is online! Sending notification...`;

            // Step 2: Send Discord Webhook
            await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: `Player with UUID **${uuid}** is online!`
                })
            });

            resultElement.textContent = `Player with UUID ${uuid} is online! Notification sent.`;
        } else {
            resultElement.textContent = `Player with UUID ${uuid} is offline.`;
        }
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
}

// Automatically check every minute (60000 ms)
setInterval(checkPlayerStatus, 60000);

// Immediately check when the script starts
checkPlayerStatus();