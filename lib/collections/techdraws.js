module.exports = (coll) => {
  const posts = [...coll.getFilteredByGlob('src/techdraws/*.md')];

  return posts.reverse();
};
