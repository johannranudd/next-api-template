import fs from 'fs';
import { buildPath, extractData } from '../../utils/fetch';

export default function handler(req, res) {
  const filePath = buildPath();
  const data = extractData(filePath);
  if (req.method === 'POST') {
    const test = {
      id: req.body.id,
      fName: req.body.fName,
    };
    data.push(test);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ data });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ data });
  }
}
