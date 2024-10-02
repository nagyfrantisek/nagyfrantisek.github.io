const siteData = require('../../src/_data/site');

module.exports = (coll) => {
  const allPhotos = require('./photos')(coll);

  const maxPhotosPerPage = siteData.paginate;
  const numberOfPages = Math.ceil(allPhotos.length / maxPhotosPerPage);
  const pagedPhotos = [];

  for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
    const sliceFrom = (pageNum - 1) * maxPhotosPerPage;
    const sliceTo = sliceFrom + maxPhotosPerPage;

    pagedPhotos.push({
      number: pageNum,
      posts: allPhotos.slice(sliceFrom, sliceTo),
      first: pageNum === 1,
      last: pageNum === numberOfPages
    });
  }

  return pagedPhotos;
};
