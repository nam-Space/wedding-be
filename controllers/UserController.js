
const User = require("../db/userModel");
const { default: aqp } = require("api-query-params");
require("dotenv").config();

const getAllUsers = async (request, response) => {
    try {
        const { current = 1, limit = 10 } = request.query
        const qs = request.query
        const { filter, sort, population } = aqp(qs);
        delete filter.current;
        delete filter.limit;

        const offset = (current - 1) * +limit;
        const defaultLimit = limit ? limit : 10;
        const totalItems = (await User.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);

        const result = await User
            .find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort)
            .populate(population)
            .exec()

        return response.json({
            isSuccess: true,
            meta: {
                current: current, //trang hiện tại
                pageSize: limit, //số lượng bản ghi đã lấy
                pages: totalPages, //tổng số trang với điều kiện query
                total: totalItems, // tổng số phần tử (số bản ghi)
            },
            data: result, //kết quả query
        });
    } catch (error) {
        return response.status(400).send({ isSuccess: false, error });
    }
}


const getUserById = async (request, response) => {
    try {
        const { id } = request.params
        const user = await User.findOne({ _id: id })
        if (!user) {
            return response.json({
                isSuccess: false,
                message: 'Cannot find user',
            });
        }
        return response.json({
            isSuccess: true,
            data: user,
        });
    } catch (error) {
        return response.status(400).send({ isSuccess: false, error });
    }
}

const createNewUser = async (request, response) => {
    try {
        const {
            fullName,
            image,
            song,
            location,
            lat,
            lng,
        } = request.body

        const res = await User.create({
            fullName,
            image,
            song,
            location,
            lat,
            lng,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        const url = `${process.env.WEDDING_URL}?q=${encodeURIComponent(`${fullName}-${res._id}`)}`

        res.url = url
        res.save()

        return response.json({
            isSuccess: true,
            data: res,
        });
    } catch (error) {
        return response.status(400).send({ isSuccess: false, error });
    }
}

const updateUserById = async (request, response) => {
    try {
        const { id } = request.params
        const { fullName,
            image,
            song,
            location,
            lat,
            lng,
        } = request.body
        const user = await User.findOne({ _id: id })
        if (!user) {
            return response.json({
                isSuccess: false,
                message: 'Cannot find user',
            });
        }

        const url = `${process.env.WEDDING_URL}?q=${encodeURIComponent(`${fullName}-${user._id}`)}`

        const res = await User.updateOne(
            { _id: id },
            {
                fullName,
                image,
                url,
                song,
                location,
                lat,
                lng,
                updatedAt: Date.now()
            },
        )

        return response.json({
            isSuccess: true,
            data: res,
        });
    } catch (error) {
        return response.status(400).send({ isSuccess: false, error });
    }
}

const deleteUserById = async (request, response) => {
    try {
        const { id } = request.params
        const user = await User.findOne({ _id: id })
        if (!user) {
            return response.json({
                isSuccess: false,
                message: 'Cannot find user',
            });
        }

        const res = await User.deleteOne(
            { _id: id },
        )

        return response.json({
            isSuccess: true,
            data: 'Delete user successfully!',
        });
    } catch (error) {
        return response.status(400).send({ isSuccess: false, error });
    }
}

const uploadImage = async (request, response) => {
    try {
        // if (!request.file) {
        //     return response.status(400).json({ message: "Không có file được tải lên" });
        // }

        // // 🔹 Đường dẫn truy cập public URL
        // const folder = request.query.folder || "default";
        // const fileUrl = `/${folder}/${request.file.filename}`;

        return response.json({
            isSuccess: true,
            message: "Upload thành công!",
            fileUrl: request.file.path, // 🔹 Cloudinary URL
            type: request.file.mimetype,
        });
    } catch (error) {
        console.log('error', error)
        return response.status(400).send({ isSuccess: false, error });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
    uploadImage
}
