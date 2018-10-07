module.exports = class Router {
    constructor(routes){
        this.routes = routes
    }
    match(pathname) {
        const notFound = (this.routes.notFound || Router.notFound)
        const lowercased = typeof pathname === "string" ? pathname.toLowerCase() : null
        return this.routes[lowercased] || notFound
    }
    static notFound(data={}, cb) {
        cb(404, {'name': 'default notFound', ...data})
    }
};
