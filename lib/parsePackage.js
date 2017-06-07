const fetchDescription = (pkg) => {
  if (pkg.description) {
    return pkg.description
  }
  
  if (pkg.name) {
    return 'No description available.'
  }
}

const fetchDependencies = (pkg) => {
  let deps = new Set()

  if (pkg.dependencies) {
    for (let name of Object.keys(pkg.dependencies)) {
      deps.add(name)
    }
  }

  if (pkg.devDependencies) {
    for (let name of Object.keys(pkg.devDependencies)) {
      deps.add(name)
    }
  }

  return [...deps].sort()
}

module.exports = {
  fetchDependencies,
  fetchDescription
}