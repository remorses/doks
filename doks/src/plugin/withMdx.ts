import path from 'path'

type Options = {
    extension?: RegExp
    options?: any
}

export const withMdx = (pluginOptions: Options = {}) => (
    nextConfig = {} as any,
) => {
    const { extension = /\.mdx$/, options = {} } = pluginOptions

    const MDXLoader = {
        loader: '@mdx-js/loader',
        options,
    }
    const frontmatterLoader = {
        loader: require.resolve('./mdxLoader'),
    }

    return Object.assign({}, nextConfig, {
        webpack(config, options) {
            if (!options.defaultLoaders) {
                throw new Error(
                    'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
                )
            }
            config.resolve.alias['root_'] = path.join(process.cwd(), )
            config.module.rules.push({
                test: extension,
                use: [
                    options.defaultLoaders.babel,
                    MDXLoader,
                    frontmatterLoader,
                ],
            })

            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options)
            }

            return config
        },
    })
}

