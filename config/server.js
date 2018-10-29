let conf = {
    host: 'localhost',
    port: 3000
};

if (process.env.NODE_ENV === 'production') {
    conf = Object.assign(conf, {})
} else if (process.env.NODE_ENV === 'test') {
    conf = Object.assign(conf, {})
} else if (process.env.NODE_ENV === 'development') {
    conf = Object.assign(conf, {})
}

module.exports = conf;