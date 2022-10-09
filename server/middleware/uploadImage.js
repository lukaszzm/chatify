const multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};


const fileUpload = multer({
  limits: 5000000,
  storage: FirebaseStorage({
    bucketName: process.env.FIREBASE_BUCKET,
    credentials: {
      clientEmail: process.env.FIREBASE_EMAIL,
      privateKey: process.env.FIREBASE_KEY.replace(/\\n/g, '\n'),
      projectId: process.env.FIREBASE_ID,
    },
    public: true,
    unique: true,
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid type.");
    cb(error, isValid);
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, uuidv4() + "." + ext);
  },

});

module.exports = fileUpload;