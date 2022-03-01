module.exports = {
    cacheGroups: {
        vendors: {
            test: /^.*node_modules((?!imask|dom7|ssr-window|swiper|gsap).)*$/,
            // test: /(node_modules)/,
            name: 'vendors',
            enforce: true,
            chunks: 'all',
        },
        xpage: {
            test: /^.*xpage((?!index|select|mobileMenu).)*$/,
            name: 'xpage',
            enforce: true,
            chunks: 'all'
        }
    }
}