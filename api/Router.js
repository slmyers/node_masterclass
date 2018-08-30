



const Handlers = {

    sample: (data, callback) => {
        callback(406, {'name': 'sample handler'})
    },

    notfound: (data, callback) => {
        callback(404, {'name': 'notfound handler'})
    }
};

module.exports = class Router {

    constructor() {
        this.handlers = Object.keys(Handlers).reduce( (_handlers, key) => ({[key.toLowerCase()]: Handlers[key], ..._handlers}), {});
    }

    match(pathname) {
        return this.handlers[pathname.toLowerCase()] || this.handlers.notfound
    }
};
