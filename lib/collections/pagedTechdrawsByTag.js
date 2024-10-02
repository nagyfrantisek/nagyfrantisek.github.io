const siteData = require('../../src/_data/site');

module.exports = (coll) => {
  const tagList = require('./tagList')(coll);

  const maxTechdrawsPerPage = siteData.paginate;
  const pagedTechdraws = [];

  Object.keys(tagList).forEach((tagName) => {
    const taggedTechdraws = [...coll.getFilteredByTag(tagName)].reverse();
    const numberOfPages = Math.ceil(taggedTechdraws.length / maxTechdrawsPerPage);

    for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
      const sliceFrom = (pageNum - 1) * maxTechdrawsPerPage;
      const sliceTo = sliceFrom + maxTechdrawsPerPage;

      pagedTechdraws.push({
        tagName,
        number: pageNum,
        posts: taggedTechdraws.slice(sliceFrom, sliceTo),
        first: pageNum === 1,
        last: pageNum === numberOfPages
      });
    }
  });

  return pagedTechdraws;
};
