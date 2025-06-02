const toggle = document.getElementById('darkModeToggle');

// Load saved preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  toggle.checked = true;
}

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
});

function calculateAttendance() {
  const totalClasses = parseFloat(document.getElementById("totalClasses").value);
  const attendedClasses = parseFloat(document.getElementById("attendedClasses").value);
  let expectedPercentage = parseFloat(document.getElementById("expectedPercentage").value);
  if (isNaN(expectedPercentage) || expectedPercentage <= 0 || expectedPercentage > 100) {
    expectedPercentage = 75.0;
  }

  const resultDiv = document.getElementById("result");
  if (isNaN(totalClasses) || isNaN(attendedClasses) || totalClasses <= 0 || attendedClasses < 0 || attendedClasses > totalClasses) {
    resultDiv.innerHTML = "⚠️ Please enter valid class numbers.";
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

  // Trigger animation
  resultDiv.classList.remove('pop');
  void resultDiv.offsetWidth; // Trick to restart the animation
  resultDiv.classList.add('pop');
}
