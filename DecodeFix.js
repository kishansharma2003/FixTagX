let fixTags = {};

function loadFixTags() {
    const storedJSON = localStorage.getItem("fixTagsJSON");

    if (!storedJSON) {
        alert("FIX tag JSON not found. Please upload it from the landing page.");
        return;
    }

    try {
        fixTags = JSON.parse(storedJSON);
    } catch (e) {
        alert("Stored FIX JSON is corrupted. Please re-upload.");
    }
}

loadFixTags();

// Clear textarea and result
function clearTextArea(inputId, resultId) {
    document.getElementById(inputId).value = "";
    document.getElementById(resultId).innerHTML = "";
}

// Convert & sort FIX message
function convertMessage(inputId, resultId) {
    let fixMsg = document.getElementById(inputId).value.trim();
    const resultBox = document.getElementById(resultId);

    if (!fixMsg) return;

    if (fixMsg[0] === "|") fixMsg = fixMsg.slice(1);
    if (fixMsg[fixMsg.length - 1] === "|") fixMsg = fixMsg.slice(0, -1);

    resultBox.innerHTML = "";

    let tags = fixMsg.split("|");

    // Sort by tag number
    tags.sort((a, b) => {
        return Number(a.split("=")[0]) - Number(b.split("=")[0]);
    });

    tags.forEach((item, index) => {
        const [tagNum, value] = item.split("=");

        const p = document.createElement("p");
        p.className = `records ${index % 2 === 0 ? "even" : "odd"}`;

        p.innerText =
            `${tagNum} (${fixTags[tagNum]?.Desc || "Undefined"}) ➡️ ${value} [${fixTags[tagNum]?.[value] ?? ""}]`;

        resultBox.appendChild(p);
    });
}
