const express = require('express');
const router  = express.Router();
const { downloadPDF, downloadDOCX } = require('../controllers/cvController');

// GET /api/cv/pdf   — download resume as PDF
router.get('/pdf',  downloadPDF);

// GET /api/cv/docx  — download resume as DOCX
router.get('/docx', downloadDOCX);

module.exports = router;