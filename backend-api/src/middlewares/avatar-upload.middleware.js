const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const storageOptions = {
  projectId: "project1-flutter-454507",
};

// Chỉ thêm keyFilename nếu chạy local (dựa trên biến môi trường)
if (process.env.NODE_ENV !== "production") {
  storageOptions.keyFilename =
    "C:/Users/chaud/cdthong/OLD/ct313h03-project-dinhthongchau/backend-api/src/services/project1-flutter-454507-3a3315a078e1.json";
}

const storage = new Storage(storageOptions);

const bucketName = "project1-flutter-454507.appspot.com";
const bucket = storage.bucket(bucketName);

const upload = multer({
  storage: multer.memoryStorage(),
});

const avatarUpload = upload.array("product_image", 5); // Giới hạn 5 file, có thể thay đổi

const uploadToGCS = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    console.log("No files uploaded");
    return next();
  }

  const uploadPromises = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = `uploads/${uniqueSuffix}-${file.originalname}`;
      const gcsFile = bucket.file(fileName);

      const stream = gcsFile.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
        resumable: false,
      });

      stream.on("error", (err) => {
        console.error("Error uploading to GCS:", err);
        reject(err);
      });

      stream.on("finish", () => {
        const gcsUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        console.log("File uploaded to GCS:", gcsUrl);
        resolve(gcsUrl);
      });

      stream.end(file.buffer);
    });
  });

  Promise.all(uploadPromises)
    .then((urls) => {
      req.gcsUrls = urls; // Lưu mảng URL vào req.gcsUrls
      next();
    })
    .catch((err) => next(err));
};

module.exports = [avatarUpload, uploadToGCS];
