import type { NextApiRequest, NextApiResponse } from 'next';
import z from 'zod';
import crypto from 'crypto-js';

type Data = {
  message: string,
  data: any,
}

const bodySchema = z.object({
  guess: z.string(),
  wordle: z.string(),
})

interface IResult {
  letter: string,
  correctSpot: boolean,
  presentInWord: boolean,
  selected: boolean,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case 'POST':
      const body = JSON.parse(req.body);
      const data = bodySchema.safeParse(body);
      if (data.success) {
        const { guess, wordle } = data.data;
        const _choice = crypto.AES.decrypt(wordle, process.env.NEXT_PUBLIC_SECRET_KEY as string).toString(
          crypto.enc.Utf8
        );
        let _data: IResult[] = [];
        guess.split("").forEach((letter: string, index: number) => {
          if (letter === _choice[index]) {
            _data.push({
              letter,
              correctSpot: true,
              presentInWord: true,
              selected: false,
            });
          } else if (_choice.includes(letter)) {
            _data.push({
              letter,
              correctSpot: false,
              presentInWord: true,
              selected: false,
            });
          } else {
            _data.push({
              letter,
              correctSpot: false,
              presentInWord: false,
              selected: false,
            });
          }
        });
        res.status(200).json({ message: 'Success', data: _data });
      } else {
        res.status(400).json({ message: 'Bad Request', data: false });
      }
    case 'GET':
      fetch(
        "https://raw.githubusercontent.com/tabatkins/wordle-list/main/words"
      )
      .then((response) => response.text())
      .then((data) => {
        const words = data.split("\n");
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const hash = crypto.AES.encrypt(
          randomWord,
          process.env.SECRET_KEY as string
        ).toString();
        res.status(200).json({ message: 'Here\'s your wordle!', data: hash })
      });
  }
}
