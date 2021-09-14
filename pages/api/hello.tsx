import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { BASE_URL } from '../../constants/url';
const fs = require("fs");

// Initializing the cors middleware
// const cors = Cors({
//   methods: ['GET', 'HEAD'],
// })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  // await runMiddleware(req, res, cors);
	if (req.method === 'GET') {
		try {
			const path = req.query.id;
			console.dir(path);
			const response = await fetch(`${BASE_URL}/img/${path}`);
			const data = await response.text();
			const buffer = Buffer.from(data, "base64");
			fs.writeFileSync('any.jpg', buffer);
			fs.createReadStream('any.jpg').pipe(res)
		} catch (err) {
			res.status(500).json({ error: err })
		}

		// Jimp.read(buffer, (err, res) => {
		// 	if (err) throw new Error(err);
		// 	res.write("resized.jpg");
		// });
	}
}

export default handler
