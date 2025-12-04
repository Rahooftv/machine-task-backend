import multer from "multer";
import path from "path";


const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  },
})


const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg", "application/pdf"]

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only images or PDF files allowed!"))
  }

  cb(null, true)
};

export const upload = multer({ storage, fileFilter })
