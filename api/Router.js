module.exports = class Router {
    constructor(routes){
        this.routes = routes
    }
    match(pathname) {
        const notFound = (this.routes.notFound || Router.notFound)
        const lowercased = typeof pathname === "string" ? pathname.toLowerCase() : null
        // so the user can not access functions on the prototype
        const key = Object.keys(this.routes).find(k => k === lowercased)
        return this.routes[key] || notFound
    }
    static notFound(data={}, cb) {
        cb(404, {'name': 'default notFound', ...data})
    }
};
