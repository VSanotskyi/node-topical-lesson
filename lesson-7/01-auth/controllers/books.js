import Book from "../models/book.js";
import book from "../models/book.js";

const getBooks = async (req, res, next) => {
    try {
        const books = await book.find();
        res.send(books);
    } catch (error) {
        next(error);
    }
};

const getBook = async (req, res, next) => {
    const {id} = req.params;
    try {
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).send("Book not found");
        }

        res.send(book);
    } catch (error) {
        next(error);
    }
};

const createBook = async (req, res, next) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
    };

    try {
        const resutl = await Book.create(book);
        res.status(201).send(resutl);
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    const {id} = req.params;

    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        year: req.body.year,
    };

    try {
        const result = await Book.findByIdAndUpdate(id, book, {new: true});

        if (!result) {
            return res.status(404).send("Book not fount");
        }

        res.send(result);
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    const {id} = req.params;

    try {
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send("Book not found");
        }

        res.send({id});
    } catch (error) {
        next(error);
    }
};

export default {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};