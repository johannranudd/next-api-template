import fs from 'fs';
import path from 'path';

async function handler(req, res) {
  // get file path
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  //  get data from file
  const fileData = fs.readFileSync(filePath);
  //   parse data
  const data = JSON.parse(fileData);

  if (req.method === 'POST') {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const age = req.body.age;

    const newPerson = {
      id: Date.now(),
      fName: fName,
      lName: lName,
      age: age,
    };

    data.push(newPerson);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ newPerson });
  } else if (req.method === 'DELETE') {
    const newArray = data.filter((item) => {
      return item.id !== req.body;
    });
    fs.writeFileSync(filePath, JSON.stringify(newArray));
    res.status(202).json({ newArray });
  } else {
    return res.status(200).json({ data });
  }
}

export default handler;
