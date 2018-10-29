module.exports = {
    info: {
        "title": "SuGo Stack Express Backend",
        "description": "Leroy Merlin España Central API",
        "termsOfService": "http://example.com/terms/",
        "contact": {
            "name": "API Support",
            "url": "http://www.example.com/support",
            "email": "support@example.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "servers": [{
            "url": "https://{username}.gigantic-server.com:{port}/{basePath}",
            "description": "The production API server",
            "variables": {
                "username": {
                    "default": "demo",
                    "description": "this value is assigned by the service provider, in this example `gigantic-server.com`"
                },
                "port": {
                    "enum": [
                        "8443",
                        "443"
                    ],
                    "default": "8443"
                },
            }
        }],
        "version": require('../package.json').version
    },
    host: process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'localhost:3000',
    basePath: "/"
}
