import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // create file path
  const filePath = path.join(process.cwd(), 'data', 'jsonAPI.json');
  //   read file
  const fileData = fs.readFileSync(filePath);
  //   parse file data
  const data = JSON.parse(fileData);

  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    res.status(200).json({ data });
  }
}
