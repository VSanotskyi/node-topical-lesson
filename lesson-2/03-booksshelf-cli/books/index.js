const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const FILE_PATH = path.join(__dirname, "books.json");

const readBooks = async () => {
    const data = await fs.readFile(FILE_PATH, {encoding: "utf-8"});
    return JSON.parse(data);
};

const writeBooks = (books) => {
    return fs.writeFile(FILE_PATH, JSON.stringify(books, null, 2));
};

const getAll = async () => {
    return await readBooks();
};

const getById = async (id) => {
    const books = await readBooks();

    return books.find(book => book.id === id);
};

const creat = async (book) => {
    const books = await readBooks();

    const newBook = {...book, id: crypto.randomUUID()};

    books.push(newBook);

    await writeBooks(books);

    return newBook;
};

const update = async (id, book) => {
    const books = await readBooks();
    const index = books.findIndex(book => book.id === id);

    if (index === -1) return null;

    const updateBook = {id, ...book};

    books[index] = updateBook;

    await writeBooks(books);

    return updateBook;
};

const remove = async (id) => {
    const books = await readBooks();
    const index = books.findIndex(book => book.id === id);

    if (index === -1) return null;

    const [deletedBook] = books.splice(index, 1);

    await writeBooks(books);

    return deletedBook;
};

module.exports = {
    getAll,
    getById,
    creat,
    update,
    remove,
};