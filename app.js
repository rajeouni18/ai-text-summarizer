const inputText = document.getElementById("inputText");
const summarizeBtn = document.getElementById("summarizeBtn");
const clearBtn = document.getElementById("clearBtn");
const outputText = document.getElementById("outputText");
const status = document.getElementById("status");
const charCount = document.getElementById("charCount");
const copyBtn = document.getElementById("copyBtn");
const processingTime = document.getElementById("processingTime");


const worker = new Worker(
    "./worker.js",
    {
        type: "module"
    }
);


let modelReady = false;
let startTime = 0;


function updateCharacterCount() {

    const count = inputText.value.length;

    charCount.textContent = `${count} characters`;
}


function setStatus(message, type = "") {

    status.textContent = message;

    status.className = "status";

    if (type) {
        status.classList.add(type);
    }
}


function setProcessingState(isProcessing) {

    summarizeBtn.disabled = isProcessing;
    clearBtn.disabled = isProcessing;

    if (isProcessing) {

        summarizeBtn.textContent = "Summarizing...";

    } else {

        summarizeBtn.textContent = "Summarize";
    }
}


inputText.addEventListener(
    "input",
    updateCharacterCount
);


summarizeBtn.addEventListener(
    "click",
    () => {

        const text = inputText.value.trim();


        if (!text) {

            setStatus(
                "Please enter some text first.",
                "error"
            );

            outputText.textContent =
                "Your summary will appear here.";

            copyBtn.disabled = true;

            return;
        }


        if (!modelReady) {

            setStatus(
                "The AI model is still loading. Please wait.",
                "processing"
            );

            return;
        }


        startTime = performance.now();


        setProcessingState(true);

        setStatus(
            "Summarizing...",
            "processing"
        );


        outputText.textContent =
            "Generating summary...";


        processingTime.textContent = "";

        copyBtn.disabled = true;


        worker.postMessage({
            type: "summarize",
            text: text
        });
    }
);


clearBtn.addEventListener(
    "click",
    () => {

        inputText.value = "";

        outputText.textContent =
            "Your summary will appear here.";

        processingTime.textContent = "";

        copyBtn.disabled = true;

        updateCharacterCount();

        setStatus(
            modelReady
                ? "Ready."
                : "Loading AI model..."
        );
    }
);


copyBtn.addEventListener(
    "click",
    async () => {

        const summary = outputText.textContent.trim();


        if (!summary) {
            return;
        }


        try {

            await navigator.clipboard.writeText(summary);

            copyBtn.textContent = "Copied!";


            setTimeout(
                () => {
                    copyBtn.textContent = "Copy";
                },
                1500
            );

        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

            setStatus(
                "Could not copy the summary.",
                "error"
            );
        }
    }
);


worker.addEventListener(
    "message",
    (event) => {

        const data = event.data;


        if (data.type === "status") {

            setStatus(
                data.message,
                "processing"
            );

            return;
        }


        if (data.type === "ready") {

            modelReady = true;

            setProcessingState(false);

            setStatus(
                "AI model is ready.",
                "ready"
            );

            return;
        }


        if (data.type === "result") {

            const endTime = performance.now();

            const seconds =
                ((endTime - startTime) / 1000).toFixed(2);


            outputText.textContent =
                data.summary;


            processingTime.textContent =
                `Processing time: ${seconds} seconds`;


            copyBtn.disabled = false;

            setProcessingState(false);

            setStatus(
                "Summary completed.",
                "ready"
            );

            return;
        }


        if (data.type === "error") {

            console.error(
                "Worker error:",
                data.message
            );


            outputText.textContent =
                "Could not generate the summary.";


            processingTime.textContent = "";


            copyBtn.disabled = true;

            setProcessingState(false);

            setStatus(
                `Error: ${data.message}`,
                "error"
            );
        }
    }
);


worker.addEventListener(
    "error",
    (error) => {

        console.error(
            "Worker error:",
            error
        );


        setProcessingState(false);


        setStatus(
            "An unexpected error occurred.",
            "error"
        );
    }
);


updateCharacterCount();


worker.postMessage({
    type: "load"
});
