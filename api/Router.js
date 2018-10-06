module.exports = class Router {
    constructor(routes){
        this.match = this.match.bind(this)
        this.routes = routes
    }
    match(pathname) {
        const key = Object.keys(this.routes).find(key => key.toLowerCase() === pathname.toLowerCase())
        return this.routes[key] || (this.routes.notFound ? this.routes.notFound : Router.notFound)
    }

    static notFound(data={}, cb) {
        cb(404, {'name': 'default notFound', ...data})
    }
};
