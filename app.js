const worker = new Worker('./worker.js', {
    type: 'module'
});
document.querySelector('#summarizeBtn').addEventListener('click', async () => {
    const text = document.querySelector('#input').value;
    const button = document.querySelector('#summarizeBtn');
    const output = document.querySelector('#output');
    if (!text.trim()) {
        output.textContent = 'Please enter some text first.';
        return;
}

worker.onmessage = (event) => {
    document.querySelector('#output').textContent = event.data;

    const button = document.querySelector('#summarizeBtn');
    button.textContent = 'Summarize';
    button.disabled = false;
};
    button.textContent = 'Summarizing...';
    button.disabled = true;
    output.textContent = '';

    try {
    worker.postMessage(text);

    } catch (error) {
        output.textContent = 'Something went wrong. Please try again.';
        console.error(error);

    } finally {
        button.textContent = 'Summarize';
        button.disabled = false;
    }
});