const apiKey = "c558b5d6-5a49-49c4-b24b-659b0d2b89ba"; // IDK if u steal this
const webhookUrl = "1314929346741403728/LH83TcZEzTZOQ8jYUyM3l4A3s8KDvazcMC77IQ8W41AH6weFNUkkwdY3YZrokCe7fPze"; // Replace with your Discord webhook URL

document.getElementById("checkStatus").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const resultElement = document.getElementById("result");

    if (!username) {
        resultElement.textContent = "Please enter a username!";
        return;
    }

    resultElement.textContent = "Checking...";

    try {
        // Step 1: Get UUID from Mojang API
        const uuidResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        if (!uuidResponse.ok) throw new Error("Player not found!");
        const uuidData = await uuidResponse.json();
        const uuid = uuidData.id;

        // Step 2: Check Hypixel Status
        const hypixelResponse = await fetch(`https://api.hypixel.net/status?key=${apiKey}&uuid=${uuid}`);
        if (!hypixelResponse.ok) throw new Error("Failed to fetch Hypixel status!");
        const hypixelData = await hypixelResponse.json();

        if (hypixelData.session.online) {
            resultElement.textContent = `${username} is online! Sending notification...`;

            // Step 3: Send Discord Webhook
            await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: `Player **${username}** is online!`
                })
            });

            resultElement.textContent = `${username} is online! Notification sent.`;
        } else {
            resultElement.textContent = `${username} is offline.`;
        }
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
});