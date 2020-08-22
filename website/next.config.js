const compose = require('compose-function')
const { withDokz } = require('dokz/dist/plugin')
const withTM = require('next-transpile-modules')([
    'dokz',
    'landing-blocks',
    'page-enter-transition',
])
const withImages = require('next-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: !!process.env.ANAL,
})

const composed = compose(withTM, withDokz, withImages)

module.exports = composed({
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    webpack: (c, options) => {
        // console.log(JSON.stringify(options.isServer, null, 4))
        // console.log(c.module.rules.map(x => {
        //     if (x.loader && x.loader.loader === 'next-babel-loader') {
        //         // console.log(x.loader.options)
        //         console.log(x)
        //     }
        // }))
        return c
    },
})
