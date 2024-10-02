module.exports = (config) => {
  config.addPassthroughCopy('src/assets/img/**/*');
  config.addPassthroughCopy({ 'src/posts/img/**/*': 'assets/img/' });
  config.addPassthroughCopy({ 'src/photos/img/**/*': 'assets/img/photos/' });
  config.addPassthroughCopy({ 'src/techdraws/img/**/*': 'assets/img/techdraws/' });

  config.addWatchTarget("src/assets/js/");

  config.addLayoutAlias('default', 'layouts/default.njk');
  config.addLayoutAlias('post', 'layouts/post.njk');
  config.addLayoutAlias('photo', 'layouts/photo.njk');
  config.addLayoutAlias('techdraw', 'layouts/techdraw.njk');

  config.addFilter('readableDate', require('./lib/filters/readableDate'));
  config.addFilter('minifyJs', require('./lib/filters/minifyJs'));

  config.addTransform('minifyHtml', require('./lib/transforms/minifyHtml'));

  config.addCollection('posts', require('./lib/collections/posts'));
  config.addCollection('tagList', require('./lib/collections/tagList'));
  config.addCollection('pagedPosts', require('./lib/collections/pagedPosts'));
  config.addCollection('pagedPostsByTag', require('./lib/collections/pagedPostsByTag'));
  config.addCollection('photos', require('./lib/collections/photos'));
  config.addCollection('pagedPhotos', require('./lib/collections/pagedPhotos'));
  config.addCollection('pagedPhotosByTag', require('./lib/collections/pagedPhotosByTag'));
  config.addCollection('techdraws', require('./lib/collections/techdraws'));
  config.addCollection('pagedTechdraws', require('./lib/collections/pagedTechdraws'));
  config.addCollection('pagedTechdrawsByTag', require('./lib/collections/pagedTechdrawsByTag'));

  config.addPassthroughCopy("src/CNAME");

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    // pathPrefix: "/subfolder/",
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
