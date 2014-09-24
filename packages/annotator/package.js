Package.describe({
  summary: 'Annotator package for Annotorious',
});

Package._transitional_registerBuildPlugin({
  name: 'compile',
  sources: ['compile.js'],
  npmDependencies: {
    // TODO: update browserify
    browserify: '3.30.4',
    coffeeify: '0.7.0',
    'convert-source-map': '0.4.1'
  }
});

Package.onUse(function(api) {
  var annotator_path = ['.npm', 'package', 'node_modules', 'annotator'];
  var path = Npm.require('path');

  var paths = [
    ['src', 'annotator.coffee'],
    ['css', 'annotator.css'],
    ['img', 'annotator-glyph-sprite.png'],
    ['img', 'annotator-icon-sprite.png']
  ].map(function(p) {
    return path.join.apply(path, annotator_path.concat(p));
  });

  api.addFiles(paths, ['client']);
  api.export('require', 'client');
});

Npm.depends({
  // TODO: get the meteor store stuff merged into upstream and switch away from the FinalsClub fork
  annotator: 'https://github.com/FinalsClub/annotator/tarball/6c100fd411c36221833f01d43f4f19b8cba03100'
});
