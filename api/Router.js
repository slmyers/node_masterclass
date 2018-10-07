module.exports = class Router {
    constructor(routes){
        this.routes = routes
    }
    match(pathname) {
        const key = Object.keys(this.routes).find(key => key.toLowerCase() === pathname.toLowerCase())
        const notFound = (this.routes.notFound || Router.notFound)
        return this.routes[key] || notFound
    }

    static notFound(data={}, cb) {
        cb(404, {'name': 'default notFound', ...data})
    }
};
