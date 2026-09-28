# AI Text Summarizer

A browser-based AI text summarizer built with JavaScript and Transformers.js.

The application generates text summaries directly in the user's browser.

## Features

* AI-powered text summarization
* Runs directly in the browser
* No backend server required
* No external AI API required
* Web Worker for AI processing
* Character counter
* Copy summary button
* Clear input button
* Processing time display
* Error handling
* Responsive interface

## Technologies

* HTML5
* CSS3
* JavaScript
* Transformers.js
* Hugging Face
* Web Workers

## How It Works

The application uses Transformers.js to run an AI summarization model in the browser.

The main application communicates with a Web Worker.

```text
User
 │
 ▼
Web Interface
 │
 ▼
app.js
 │
 ▼
Web Worker
 │
 ▼
Transformers.js
 │
 ▼
AI Model
 │
 ▼
Generated Summary
```

## Project Structure

```text
ai-text-summarizer/
│
├── index.html
├── style.css
├── app.js
├── worker.js
└── README.md
```

## Running the Project

Because the project uses ES modules and Web Workers, it should be served through a local web server.

For example, with VS Code and Live Server:

```text
Open index.html
       ↓
Right Click
       ↓
Open with Live Server
```

## Privacy

Text processing is performed in the browser.

The application does not require a backend server or an external AI API for summarization.

## Future Improvements

Planned improvements include:

* Multiple summarization lengths
* Better text validation
* Loading progress
* Dark mode
* Improved mobile interface
* Model selection
* Deployment
* Performance improvements

## License

This project is created for learning and portfolio purposes.
