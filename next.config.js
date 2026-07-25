/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  sassOptions: {
    // resolve `@use "styles/..."` from the project root in every .module.scss
    loadPaths: [__dirname],
    includePaths: [__dirname],
  },
}
