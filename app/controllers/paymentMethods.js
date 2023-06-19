import { PaymentMethod } from '../models/index.js';
import { matchedData } from 'express-validator';

export const getPaymentMethods = async (req, res) => {
    const params = matchedData(req);

    const quantity = await PaymentMethod.count({ paranoid: params?.includeDeleted === "true" ? false : true });
    const data = await PaymentMethod.findAll({
        paranoid: params?.includeDeleted === "true" ? false : true,
        limit: params?.pageSize ? parseInt(params.pageSize) : null,
        offset: params?.page && params?.pageSize ? (params.page - 1) * params.pageSize : null,
        order: [[params?.orderBy ? params.orderBy : "id", params?.orderDir || "asc"]]
    });

    if (!data) return res.status(404).json({ message: "Payment methods not found" });
    return res.status(200).json({ quantity, data });
}

export const getPaymentMethodByID = async (req, res) => {
    const { id } = req.params;
    const data = await PaymentMethod.findByPk(id, { paranoid: false });
    if (!data) return res.status(404).json({ message: "Payment method not found" });
    return res.status(200).json(data);
}

export const createPaymentMethod = async (req, res) => {
    const newPaymentMethod = matchedData(req);
    const data = await PaymentMethod.create({
        name: newPaymentMethod.name,
        description: newPaymentMethod?.description,
        currency: newPaymentMethod.currency,
        balance: newPaymentMethod?.balance,
        status: newPaymentMethod?.status
    });

    if (data) return res.status(201).json(data);
    return res.status(500).json({ message: "Error creating payment method" });
}

export const updatePaymentMethod = async (req, res) => {
    const paymentMethod = matchedData(req);
    if (!paymentMethod.id) return res.status(400).json({ message: "Payment method id is required" });
    const paymentMethodToUpdate = await PaymentMethod.findByPk(paymentMethod.id, { paranoid: false });
    if (!paymentMethodToUpdate) return res.status(404).json({ message: "Payment method not found" });

    paymentMethodToUpdate.name = paymentMethod.name;
    paymentMethodToUpdate.description = paymentMethod?.description;
    paymentMethodToUpdate.currency = paymentMethod.currency;
    paymentMethodToUpdate.balance = paymentMethod?.balance;
    paymentMethodToUpdate.status = paymentMethod?.status;

    await paymentMethodToUpdate.save().then(() => {
        return res.status(200).json(paymentMethodToUpdate);
    }).catch((error) => {
        return res.status(500).json({ message: "Error updating payment method", error });
    });
}

export const deletePaymentMethod = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Payment method id is required" });
    const paymentMethodToDelete = await PaymentMethod.findByPk(id, { paranoid: false });
    if (!paymentMethodToDelete) return res.status(404).json({ message: "Payment method not found" });
    if (paymentMethodToDelete.deletedAt) return res.status(410).json({ message: "Payment method already deleted" });

    await paymentMethodToDelete.destroy().then(() => {
        return res.status(200).json({ message: "Payment method deleted" });
    }).catch((error) => {
        return res.status(500).json({ message: "Error deleting payment method", error });
    });
}

export const restorePaymentMethod = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Payment method id is required" });
    const paymentMethodToRestore = await PaymentMethod.findByPk(id, { paranoid: false });
    if (!paymentMethodToRestore) return res.status(404).json({ message: "Payment method not found" });
    if (!paymentMethodToRestore.deletedAt) return res.status(400).json({ message: "Payment method not deleted" });

    await paymentMethodToRestore.restore().then(() => {
        return res.status(200).json({ message: "Payment method restored" });
    }).catch((error) => {
        return res.status(500).json({ message: "Error restoring payment method", error });
    });
}
