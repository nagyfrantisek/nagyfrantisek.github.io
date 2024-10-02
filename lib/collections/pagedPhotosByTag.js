const siteData = require('../../src/_data/site');

module.exports = (coll) => {
  const tagList = require('./tagList')(coll);

  const maxPhotosPerPage = siteData.paginate;
  const pagedPhotos = [];

  Object.keys(tagList).forEach((tagName) => {
    const taggedPhotos = [...coll.getFilteredByTag(tagName)].reverse();
    const numberOfPages = Math.ceil(taggedPhotos.length / maxPhotosPerPage);

    for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
      const sliceFrom = (pageNum - 1) * maxPhotosPerPage;
      const sliceTo = sliceFrom + maxPhotosPerPage;

      pagedPhotos.push({
        tagName,
        number: pageNum,
        posts: taggedPhotos.slice(sliceFrom, sliceTo),
        first: pageNum === 1,
        last: pageNum === numberOfPages
      });
    }
  });

  return pagedPhotos;
};
