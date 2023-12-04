
window.addEventListener("load", (event) => {
    const statusDisplay = document.getElementById("status")
    statusDisplay.textContent = navigator.onLine ? "Online" : "Offline";
})

window.addEventListener("Offline", (event) => {
    const statusDisplay = document.getElementById("status")
    statusDisplay.textContent = "OFFline";
})

window.addEventListener("online", (event) => {
    const statusDisplay = document.getElementById("status")
    statusDisplay.textContent = "Online";
})