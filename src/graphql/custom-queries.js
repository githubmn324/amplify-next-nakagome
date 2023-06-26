export const getBlogPostsKeysOnly = /* GraphQL */ `
query GetBlog($id: ID!) {
  getBlog(id: $id) {
    id
    name
    posts {
      items {
        id
        blogPostsId
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;