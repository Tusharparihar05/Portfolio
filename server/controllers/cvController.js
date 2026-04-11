const path = require('path');
const fs   = require('fs');

// ── GET /api/cv/pdf ──
exports.downloadPDF = (req, res) => {
  const filePath = path.join(__dirname, '../public/cv/My_Resume.pdf');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'PDF file not found on server.' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Tushar_Scorecard_Resume.pdf"');
  res.sendFile(filePath);
};

// ── GET /api/cv/docx ──
exports.downloadDOCX = (req, res) => {
  const filePath = path.join(__dirname, '../public/cv/My_Resume.docx');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'DOCX file not found on server.' });
  }

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  res.setHeader('Content-Disposition', 'attachment; filename="Tushar_Scorecard_Resume.docx"');
  res.sendFile(filePath);
};