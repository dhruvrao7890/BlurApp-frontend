// Backend URL (replace with the deployed backend URL)
const backendUrl = 'https://blurapp-production.up.railway.app/upload';

// Function to upload file to the backend
async function uploadFile(blob, type) {
    const formData = new FormData();
    formData.append('mediaFile', blob, `${type}_submission.${type === "video" ? "mp4" : "mp3"}`);

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        statusMessage.textContent = data.message || "File uploaded successfully!";
    } catch (error) {
        console.error("Error uploading file:", error);
        statusMessage.textContent = "Failed to upload file.";
    }
}

// Function to save and upload recording
function saveRecording(type) {
    const blob = new Blob(recordedChunks, { type: type === "video" ? 'video/mp4' : 'audio/mp3' });

    // Optionally: Download locally
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_submission.${type === "video" ? 'mp4' : 'mp3'}`;
    a.click();

    // Update status
    statusMessage.textContent = "Uploading to server...";

    // Upload to backend
    uploadFile(blob, type);
}
