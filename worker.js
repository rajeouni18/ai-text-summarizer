import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1/dist/transformers.min.js';

const summarizer = await pipeline(
    'summarization',
    'Xenova/distilbart-cnn-6-6'
);
self.onmessage = async (event) => {
    const text = event.data;

    const result = await summarizer(text, {
        max_new_tokens: 60
    });

    self.postMessage(result[0].summary_text);
};