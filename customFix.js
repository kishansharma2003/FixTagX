//Download file Script










document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       FIX TAG UI LOGIC
       =============================== */

    const Operations_BTNS = document.getElementsByClassName("Operations")[0];

    class Fix {
        tagsDiv = new Array(20);
        indexInput = new Array(20);
        descInput = new Array(20);
        count = -1;

        constructor() {
            for (let i = 0; i < 20; i++) {
                this.tagsDiv[i] = document.createElement("div");
                this.tagsDiv[i].className = "Tags";

                this.indexInput[i] = document.createElement("input");
                this.indexInput[i].type = "number";
                this.indexInput[i].min = "0";
                this.indexInput[i].placeholder = "Index (0,1,2,..)";
                this.indexInput[i].className = "fix_index";

                this.descInput[i] = document.createElement("input");
                this.descInput[i].type = "text";
                this.descInput[i].placeholder = "Part / Replace / TLTC";
                this.descInput[i].className = "fix_index_desc";

                this.tagsDiv[i].appendChild(this.indexInput[i]);
                this.tagsDiv[i].appendChild(this.descInput[i]);
            }
        }
    }

    const Tag31 = new Fix();

    window.increment = function () {
        Tag31.count++;
        Operations_BTNS.insertAdjacentElement(
            "beforebegin",
            Tag31.tagsDiv[Tag31.count]
        );
    };

    window.decrement = function () {
        if (Tag31.count >= 0) {
            Tag31.tagsDiv[Tag31.count].remove();
            Tag31.count--;
        }
    };

    /* ===============================
       IFRAME NAVIGATION
       =============================== */

    const iframe = document.getElementById("innerFrame");
    window.updateIframe = function (path) {
        iframe.src = path;
    };

    /* ===============================
       FIX JSON UPLOAD + STATUS
       =============================== */

    const jsonUploader = document.getElementById("jsonUploader");
    const uploadStatus = document.getElementById("uploadStatus");
     
    window.triggerUpload = function () {
        jsonUploader.click();
    };

    jsonUploader.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        if (!file.name.endsWith(".json")) {
            alert("Please upload a valid JSON file");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const jsonText = e.target.result;

                // validate JSON
                JSON.parse(jsonText);

                // store JSON + filename
                localStorage.setItem("fixTagsJSON", jsonText);
                localStorage.setItem("fixTagsFileName", file.name);

                showActiveFile();
            } catch {
                alert("Invalid JSON file");
            }
        };

        reader.readAsText(file);
    });

    function showActiveFile() {
        const fileName = localStorage.getItem("fixTagsFileName");

        if (fileName) {
            uploadStatus.innerText = `🟢 File in use: ${fileName}`;
        } else {
            uploadStatus.innerText = "🔴 No FIX JSON file uploaded";
        }
    }

    // show status on refresh
    showActiveFile();

});
