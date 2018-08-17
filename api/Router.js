



class Handlers {

    constructor() {
        this.paths = {
            'sample': this.sample,
        }
    }

    sample(data, callback) {
        callback(406, {'name': 'sample handler'})
    }

    notFound(data, callback) {
        callback(404)
    }
}

module.exports = class Router {
    constructor(){
        this.handlers = new Handlers();
    }

    match(pathname) {
        const { paths } = this.handlers;
        return paths[pathname] || this.handlers.notFound;
    }
};
