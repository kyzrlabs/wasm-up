import fs from 'fs';
import http from 'http'; // Change from https to http
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENTITIES_URL = 'http://localhost:8001/static/entities.js'; // URL of the entities.js file on your server
const DEST_DIR = path.join(__dirname, '../src/entities'); // Destination folder
const DEST_FILE = path.join(DEST_DIR, 'entities.js'); // Full destination file path

// Ensure the destination directory exists
if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
}

// Function to download the file using http module
function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        http.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                fs.unlink(dest, () => reject(new Error(`Error: Server returned ${response.statusCode}`)));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

// Call the download function
downloadFile(ENTITIES_URL, DEST_FILE)
    .then(() => {
        console.log(`Downloaded ${ENTITIES_URL} to ${DEST_FILE}`);
    })
    .catch((err) => {
        console.error(`Failed to download ${ENTITIES_URL}: ${err.message}`);
    });
