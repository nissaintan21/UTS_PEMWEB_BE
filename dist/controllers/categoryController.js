import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// 1. GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
    try {
        // Mengambil semua data dari tabel category di database
        const allCategories = await prisma.category.findMany({
            orderBy: {
                id: "asc" // Diurutkan berdasarkan ID terkecil
            }
        });
        return res.status(200).json(allCategories);
    }
    catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan saat mengambil data category",
            error
        });
    }
};
// 2. CREATE CATEGORY (Menyimpan data category baru)
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body; // Mengambil 'name' dari frontend React
        if (!name) {
            return res.status(400).json({ message: "Nama category tidak boleh kosong" });
        }
        const newCategory = await prisma.category.create({
            data: {
                name: name
            }
        });
        // FIX DI SINI: Diubah dari newEvent menjadi newCategory
        return res.status(201).json(newCategory);
    }
    catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan saat menyimpan category baru",
            error
        });
    }
};
// 3. GET BY ID (Menampilkan category berdasarkan id)
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: { id: Number(id) }
        });
        if (!category) {
            return res.status(404).json({ message: "Category tidak ditemukan" });
        }
        return res.status(200).json(category);
    }
    catch (error) {
        return res.status(500).json({ message: "Gagal mengambil data", error });
    }
};
// 4. UPDATE BY ID (Mengupdate data kategori berdasarkan id)
export const updateCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: { name }
        });
        return res.status(200).json(updatedCategory);
    }
    catch (error) {
        return res.status(500).json({ message: "Gagal mengupdate category", error });
    }
};
// 5. DELETE BY ID (Menghapus data category berdasarkan id)
export const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.category.delete({
            where: { id: Number(id) }
        });
        return res.status(200).json({ message: "Category berhasil dihapus" });
    }
    catch (error) {
        return res.status(500).json({ message: "Gagal menghapus category", error });
    }
};
//# sourceMappingURL=categoryController.js.map