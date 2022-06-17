import fs from 'fs';
import { buildPath, extractData } from '../../utils/fetch';

export default function handler(req, res) {
  const filePath = buildPath();
  const data = extractData(filePath);
  if (req.method === 'POST') {
    data.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ data });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ data });
  }
}
