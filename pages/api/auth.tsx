// import Cors from 'cors';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { BASE_URL } from '../../constants/url';

// // Initializing the cors middleware
// const cors = Cors({
//   methods: ['GET', 'HEAD', 'POST'],
// })

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Run the middleware
//   await runMiddleware(req, res, cors);
// 	if (req.method === 'POST') {
// 		const psw = 
// 	}
// }

// export default handler
