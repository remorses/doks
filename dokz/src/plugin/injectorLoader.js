const { getRepoRoot } = require('get-git-config')
const path = require('path')


module.exports = function (content) {
    const callback = this.async()
    // const options = this.getOptions()
    const root = getRepoRoot()
    if (!root) {
        throw new Error(
            `cannot find the .git directory, edit-this-page plugin only works with git repos`,
        )
    }
    const filePath = this.resourcePath
    const editThisPagePath = path.relative(root, filePath)
    const toInject = {
        editThisPagePath,
    }
    console.log(editThisPagePath)
    const codeToInsert = `
    \n
    if (typeof window !== 'undefined') {
        const toInject = ${JSON.stringify(toInject)};
        for (let k in toInject) {
            window[k] = toInject[k];
        }
    };\n`
    return callback(null, content + codeToInsert)
}