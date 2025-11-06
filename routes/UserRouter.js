const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const multer = require("multer");
const {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
    uploadImage,
} = require("../controllers/UserController");
const { upload } = require("../cloudinary/storage");

const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const folder = req.query.folder || req.body.folder || "default";
//         const uploadPath = path.join("public", folder);
//         fs.mkdirSync(uploadPath, { recursive: true });
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         cb(
//             null,
//             `${path.parse(file.originalname).name}-${Date.now()}${path.extname(file.originalname)}`
//         );
//     },
// });

// const upload = multer({ storage });

// 🟢 Đặt route upload trước route có :id
router.post("/upload-image", upload.single("file"), uploadImage);

// Các route còn lại
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createNewUser);
router.patch("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
