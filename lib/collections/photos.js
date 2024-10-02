module.exports = (coll) => {
  const posts = [...coll.getFilteredByGlob('src/photos/*.md')];

  return posts.reverse();
};
