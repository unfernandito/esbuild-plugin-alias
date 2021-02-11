module.exports = function(options) {
  const aliases = Object.keys(options);
  const re = new RegExp(`^${aliases.map(x => escapeRegExp(x)).join('|')}$`);

  return {
    name: 'alias',
    setup(build) {
      build.onResolve({ filter: re, namespace: 'file' }, (args) => {
        return {
          path: options[args.path],
        }
      });
    }
  };
}

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
