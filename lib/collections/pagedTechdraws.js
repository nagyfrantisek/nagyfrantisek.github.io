const siteData = require('../../src/_data/site');

module.exports = (coll) => {
  const allTechdraws = require('./techdraws')(coll);

  const maxTechdrawsPerPage = siteData.paginate;
  const numberOfPages = Math.ceil(allTechdraws.length / maxTechdrawsPerPage);
  const pagedTechdraws = [];

  for (let pageNum = 1; pageNum <= numberOfPages; pageNum++) {
    const sliceFrom = (pageNum - 1) * maxTechdrawsPerPage;
    const sliceTo = sliceFrom + maxTechdrawsPerPage;

    pagedTechdraws.push({
      number: pageNum,
      posts: allTechdraws.slice(sliceFrom, sliceTo),
      first: pageNum === 1,
      last: pageNum === numberOfPages
    });
  }

  return pagedTechdraws;
};
