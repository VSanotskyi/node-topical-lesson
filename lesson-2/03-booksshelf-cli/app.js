const {program} = require("commander");

const Books = require("./books");

const invokeAction = async ({action, id, title, author}) => {
    switch (action) {
        case "getAll":
            return await Books.getAll();
        case "getById":
            return await Books.getById(id);
        case "create":
            return await Books.creat({title, author});
        case "update":
            return await Books.update(id, {title, author});
        case "remove":
            return await Books.remove(id);
        default:
            return "Unknown action";
    }
};

program
    .option("-a, --action <action>", "Action to invoke")
    .option("-i, --id <id>", "Book id")
    .option("-t, --title <title>", "Book title")
    .option("-at, --author <author>", "book author");

program.parse(process.argv);

invokeAction(program.opts()).then(console.log).catch(console.error);