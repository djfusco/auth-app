// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

///export default function handler(req, res) {
///  res.status(200).json({ name: 'John Doe' })
///}

import { connectToDatabase } from "./_connector";

export default async (req, res) => {
  await connectToDatabase();

  res.status(200).json({ name: 'John Doe' })
}