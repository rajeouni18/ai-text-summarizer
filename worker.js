
import { pipeline } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2";

let summarizer = null;

self.onmessage = async (event) => {

    const { type, text } = event.data;


    try {

        if (type === "load") {

            if (!summarizer) {

                self.postMessage({
                    type: "status",
                    message: "Loading AI model..."
                });

                summarizer = await pipeline(
                    "summarization",
                    "Xenova/distilbart-cnn-6-6"
                );
            }

            self.postMessage({
                type: "ready"
            });

            return;
        }


        if (type === "summarize") {

            if (!summarizer) {

                summarizer = await pipeline(
                    "summarization",
                    "Xenova/distilbart-cnn-6-6"
                );
            }


            const result = await summarizer(text, {
                max_new_tokens: 100,
                min_new_tokens: 20
            });


            if (
                Array.isArray(result) &&
                result.length > 0 &&
                result[0].summary_text
            ) {

                self.postMessage({
                    type: "result",
                    summary: result[0].summary_text
                });

            } else {

                self.postMessage({
                    type: "error",
                    message: "No summary was generated."
                });
            }
        }

    } catch (error) {

        self.postMessage({
            type: "error",
            message: error.message || "Unknown error"
        });
    }
};
