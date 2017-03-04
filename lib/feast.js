const fs = require('fs')
const search = require('./search')
const fetchNPMDeps = require('./helpers/fetchNPMDeps')
const l = require('./helpers/loggers')

function feast(module) {
    if (module) {
        fetchNPMDeps(module)
        .then((deps) => {
            if (deps) {
                if (module === 'pkgparse') {
                    console.log(`${module} is... hey wait, that's me!`)
                } else {
                    console.log(`${module} is made of...`)
                }
                searchArray(deps)
            }
        })
        .catch((err) => {
            l.error('That module doesn\'t seem to have any dependencies!')
        })
    } else {
        let package = JSON.parse(fs.readFileSync(process.cwd() + '/package.json', 'utf-8'))
        let deps = [...Object.keys(package.dependencies), ...Object.keys(package.devDependencies)].sort()
        searchArray(deps)
    }

    function searchArray(deps) {
        for (let i of deps) {
            search(i)
        }
    }
}

module.exports = feast