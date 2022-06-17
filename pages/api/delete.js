import fs from 'fs';
import path from 'path';
import { buildPath, extractData } from '../../utils/fetch';

export default async function handler(req, res) {
  const filePath = buildPath();
  const data = extractData(filePath);

  if (req.method === 'DELETE') {
    const deleteArray = req.body;
    data.push(deleteArray);
    fs.writeFileSync(filePath, JSON.stringify(deleteArray));
    res.status(202).json({ data });
  }
}
