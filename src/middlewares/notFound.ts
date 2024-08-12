import { RequestHandler } from "express";

const notFound:RequestHandler = (req, res, next) => {
    return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Page not found",
    });
} 

export default notFound