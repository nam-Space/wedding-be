const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("./cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const folder = req.query.folder || "uploads"; // 👈 Lấy folder từ frontend
        const resourceType =
            file.mimetype.startsWith("audio/") ? "video" : "image"; // Cloudinary coi audio/video chung nhóm “video”

        return {
            folder: folder,
            resource_type: resourceType,
            public_id: file.originalname.split(".")[0],
        };
    },
});

const upload = multer({ storage });
module.exports = { upload };
