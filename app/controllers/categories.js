import { Category } from "../models/category.js";
import { matchedData } from "express-validator";

export const getCategories = async (req, res) => {
    const params = matchedData(req);

    const quantity = await Category.count({ paranoid: params?.includeDeleted === "true" ? false : true });
    const data = await Category.findAll({
        paranoid: params?.includeDeleted === "true" ? false : true,
        offset: params?.page && params?.pageSize ? (params.page - 1) * params.pageSize : 0,
        limit: params?.pageSize ? params.pageSize : 10,
        order: params?.orderBy && params?.orderDir ? [[params.orderBy, params.orderDir]] : [["id", "asc"]]
    });

    if (!data) return res.status(404).json({ message: "Categories not found" });
    return res.status(200).json({ quantity, data });
}

export const getCategoryByID = async (req, res) => {
    const { id } = req.params;
    const data = await Category.findByPk(id, { paranoid: false });
    if (!data) return res.status(404).json({ message: "Category not found" });
    return res.status(200).json(data);
}

export const createCategory = async (req, res) => {
    const newCategory = matchedData(req);
    const data = await Category.create({
        name: newCategory.name,
        description: newCategory?.description
    });

    if (data) return res.status(201).json(data);
    return res.status(500).json({ message: "Error creating category" });
}

export const updateCategory = async (req, res) => {
    const category = matchedData(req);
    if (!category.id) return res.status(400).json({ message: "Category id is required" });
    const categoryToUpdate = await Category.findByPk(category.id, { paranoid: false });
    if (!categoryToUpdate) return res.status(404).json({ message: "Category not found" });

    categoryToUpdate.name = category.name;
    categoryToUpdate.description = category?.description;

    await categoryToUpdate.save().then(() => {
        return res.status(200).json(categoryToUpdate);
    }).catch((error) => {
        return res.status(500).json({ message: "Error updating category", error });
    });
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Category id is required" });
    const categoryToDelete = await Category.findByPk(id, { paranoid: false });
    if (!categoryToDelete) return res.status(404).json({ message: "Category not found" });
    if (categoryToDelete.deletedAt) return res.status(410).json({ message: "Category already deleted" });

    await categoryToDelete.destroy().then(() => {
        return res.status(200).json({ message: "Category deleted successfully" });
    }).catch((error) => {
        return res.status(500).json({ message: "Error deleting category", error });
    });
}

export const restoreCategory = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Category id is required" });
    const categoryToRestore = await Category.findByPk(id, { paranoid: false });
    if (!categoryToRestore) return res.status(404).json({ message: "Category not found" });
    if (!categoryToRestore.deletedAt) return res.status(400).json({ message: "Category not deleted" });

    await categoryToRestore.restore().then(() => {
        return res.status(200).json({ message: "Category restored successfully" });
    }).catch((error) => {
        return res.status(500).json({ message: "Error restoring category", error });
    });
}
