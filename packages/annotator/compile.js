// Some of this is based on code in the "tools/build" file in the annotator repository.
Plugin.registerSourceHandler('annotator.coffee', { archMatching: 'web' }, function(compileStep) {
  // TODO: automatically expose plugins that are in the bundle anyway? (i.e. core plugins)
  var plugins = ['highlighter'];

  var browserify = Npm.require('browserify'),
      coffeeify = Npm.require('coffeeify'),
      convert = Npm.require('convert-source-map');

  var path = Npm.require('path'),
      Future = Npm.require('fibers/future');

  var srcdir = path.dirname(compileStep._fullInputPath);
  var b = browserify({
    extensions: ['.coffee'],
    basedir: srcdir
  }).transform(coffeeify);

  var index = compileStep._fullInputPath.lastIndexOf(compileStep.inputPath);
  if (index !== compileStep._fullInputPath.length - compileStep.inputPath.length) {
    throw new Error('_fullInputPath does not end in inputPath???');
  } else if (index === 0) {
    throw new Error('_fullInputPath starts with inputPath???');
  }

  var pkgdir = compileStep._fullInputPath.slice(0, index - 1);

  b.require('./annotator', {
      expose: 'annotator'
    })
   .require(pkgdir + '/meteorstore.js', {
      expose: 'annotator-store-meteor'
    });
  // TODO: expose xpath-range? jquery?

  plugins.forEach(function(plugin) {
    b.require('./plugin/' + plugin, {
      expose: 'annotator-plugin-' + plugin
    });
  });

  var result = Future.wrap(b.bundle.bind(b))({ debug: true }).wait();

  var src = convert.removeComments(result);
  var srcMap = convert.fromSource(result).toObject();

  // Make the source file paths relative
  srcMap.sources = srcMap.sources.map(function (src) {
    return path.relative(path.dirname(srcdir), src);
  });

  srcMap.file = 'annotator.js';
  compileStep.addJavaScript({
    path: srcMap.file,
    sourcePath: compileStep.inputPath,
    data: src,
    sourceMap: srcMap
  });
});
