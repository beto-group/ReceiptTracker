---
name: RECEIPT TRACKER
desc: An end-to-end financial automation system that uses OCR and AI (Groq/Llama 3) to extract data from receipt images and visualize spending in an interactive dashboard.
---

```datacorejsx
const { View } = await dc.require(dc.resolvePath("RECEIPT TRACKER/src/index.jsx"));
return View({ folderPath: dc.resolvePath("RECEIPT TRACKER") });
```
