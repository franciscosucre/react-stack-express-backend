let conf = {
    host: 'localhost',
    port: 9200,
    logType: 'sugo-stack-express-backend',
    logToConsole: true,
    logIndexTemplate: {
        "order": 1,
        "template": "logs-*",
        "settings": {
            "index": {
                "number_of_shards": "5",
                "number_of_replicas": "3"
            }
        },
        "mappings": {
            "logs": {
                "properties": {
                    "level": {
                        "type": "text"
                    },
                    "message": {
                        "type": "text"
                    },
                    "timestamp": {
                        "type": "date"
                    }
                }
            }
        },
        "aliases": {}
    }
}

if (process.env.NODE_ENV === 'production') {
    conf = Object.assign(conf, {})
} else if (process.env.NODE_ENV === 'test') {
    conf = Object.assign(conf, {
        logToConsole: false
    })
} else if (process.env.NODE_ENV === 'development') {
    conf = Object.assign(conf, {})
}

module.exports = conf;
