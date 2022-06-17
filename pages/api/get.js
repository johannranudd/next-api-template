import fs from 'fs';
import path from 'path';
import { buildPath, extractData } from '../../utils/fetch';

export default async function handler(req, res) {
  const filePath = buildPath();
  const data = extractData(filePath);

  // Handle any other HTTP method
  res.status(200).json({ data });
}
