import multer from "multer";
import path from "path";

// user Photo Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ); 
  },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|png|webp|jpg/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
  
    if ((extname, mimetype)) {
      return cb(null, true);
    } else {
      cb(
        new Error("Invalid file type, only JPEG, PNG, WEBP and JPG are allowed!")
      );
    }
  };

  const sizeLimit = {
    fileSize: 10 * 1024 * 1024,
  }

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: sizeLimit
});




// song ----------------------------------
const SongStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/songs");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});


export const uploadSong = multer({
  storage: SongStorage,
  limits: sizeLimit,
  // fileFilter: fileFilter,
});