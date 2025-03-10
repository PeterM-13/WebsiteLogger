import express from "express";
const router = express.Router();

import {
  addVisit,
  addEmail,
} from "../models/index.js";



// POST to add a visit
router.post("/visit/:url", async (req, res) => {
  const result = await addVisit(req.params.url);
  res.status(201).json({
    success: true,
    payload: result,
  });
});

// POST to add an email
router.post("/email/:email", async (req, res) => {
  const result = await addEmail(req.params.email);
  res.status(201).json({
    success: true,
    payload: result,
  });
});




export default router;
