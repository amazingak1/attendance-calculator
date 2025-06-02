document.getElementById("calculateBtn").addEventListener("click", calculateAttendance);
document.getElementById("portalBtn").addEventListener("click", () => {
  window.open('https://tech.kiet.edu/StudentPortal/#/dashboard', '_blank');
});
document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);

// Load dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
}

function calculateAttendance() {
  const totalClasses = parseFloat(document.getElementById("totalClasses").value);
  const attendedClasses = parseFloat(document.getElementById("attendedClasses").value);
  let expectedPercentage = parseFloat(document.getElementById("expectedPercentage").value);
  if (isNaN(expectedPercentage) || expectedPercentage <= 0 || expectedPercentage > 100) {
    expectedPercentage = 75.0;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("show");

  if (isNaN(totalClasses) || isNaN(attendedClasses) || totalClasses <= 0 || attendedClasses < 0 || attendedClasses > totalClasses) {
    resultDiv.innerHTML = "⚠️ Please enter valid class numbers.";
    setTimeout(() => resultDiv.classList.add("show"), 50);
    return;
  }

  const currentAttendance = (attendedClasses / totalClasses) * 100;
  let message = `<strong>Your current attendance:</strong> ${currentAttendance.toFixed(2)}%<br/><br/>`;

  const targetFraction = expectedPercentage / 100;

  if (currentAttendance >= expectedPercentage) {
    const maxMissable = Math.floor((attendedClasses - targetFraction * totalClasses) / targetFraction);
    message += `🎉 You can miss <strong>${maxMissable}</strong> more class${maxMissable !== 1 ? "es" : ""} and still maintain at least <strong>${expectedPercentage}%</strong> attendance.`;
  } else {
    const required = Math.ceil((targetFraction * totalClasses - attendedClasses) / (1 - targetFraction));
    message += `⚠️ You need to attend the next <strong>${required}</strong> class${required !== 1 ? "es" : ""} to reach <strong>${expectedPercentage}%</strong> attendance.`;
  }

  resultDiv.innerHTML = message;
  setTimeout(() => resultDiv.classList.add("show"), 50);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
}
