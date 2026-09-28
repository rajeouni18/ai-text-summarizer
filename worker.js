import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/transformers.min.js';

const summarizer = await pipeline(
    'summarization',
    'Xenova/distilbart-cnn-6-6'
);

self.onmessage = async (event) => {
    const text = event.data;

    try {
        const result = await summarizer(text, {
            max_new_tokens: 60
        });

        self.postMessage({
            success: true,
            summary: result[0].summary_text
        });

    } catch (error) {
        self.postMessage({
            success: false,
            error: 'Failed to summarize the text.'
        });

        console.error(error);
    }
};