

window.addEventListener("load", (event) => {
    const statusDisplay = document.getElementById("status")
    statusDisplay.textContent = navigator.onLine ? "Online" : "Offline";
})