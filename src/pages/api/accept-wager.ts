import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function acceptWagerHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log('[SERVER] Request body', req.body);
    const bodyRequest = req.body;
    bodyRequest.api_key = process.env.API_KEY;
    console.log('[SERVER] Request body with API', bodyRequest);
    fetch(process.env.BACKEND_ENDPOINT + '/accept-wager', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyRequest)
    })
        .then(response => response.json())
        .then(data => {
            console.log('[SERVER] Data received', data)
            res.status(200).json(data);
        })
        .catch(error => 
            {
                console.log('[SERVER] Error', error);
                res.status(201).json(error.message);
            }
        );
}
