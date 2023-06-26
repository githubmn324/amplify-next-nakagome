/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      name
      posts {
        items {
          id
          title
          createdAt
          updatedAt
          blogPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      blog {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          postCommentsId
        }
        nextToken
      }
      tags {
        items {
          id
          postId
          tagId
          taglabel
          taglabelColor
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      blogPostsId
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        blog {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        blogPostsId
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      post {
        id
        title
        blog {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        blogPostsId
      }
      content
      createdAt
      updatedAt
      postCommentsId
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post {
          id
          title
          createdAt
          updatedAt
          blogPostsId
        }
        content
        createdAt
        updatedAt
        postCommentsId
      }
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!, $label: String!, $labelColor: String!) {
    getTag(id: $id, label: $label, labelColor: $labelColor) {
      id
      label
      labelColor
      posts {
        items {
          id
          postId
          tagId
          taglabel
          taglabelColor
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $id: ID
    $labelLabelColor: ModelTagPrimaryCompositeKeyConditionInput
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTags(
      id: $id
      labelLabelColor: $labelLabelColor
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        label
        labelColor
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPostTags = /* GraphQL */ `
  query GetPostTags($id: ID!) {
    getPostTags(id: $id) {
      id
      postId
      tagId
      taglabel
      taglabelColor
      post {
        id
        title
        blog {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        createdAt
        updatedAt
        blogPostsId
      }
      tag {
        id
        label
        labelColor
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPostTags = /* GraphQL */ `
  query ListPostTags(
    $filter: ModelPostTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        tagId
        taglabel
        taglabelColor
        post {
          id
          title
          createdAt
          updatedAt
          blogPostsId
        }
        tag {
          id
          label
          labelColor
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postTagsByPostId = /* GraphQL */ `
  query PostTagsByPostId(
    $postId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPostTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postTagsByPostId(
      postId: $postId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        tagId
        taglabel
        taglabelColor
        post {
          id
          title
          createdAt
          updatedAt
          blogPostsId
        }
        tag {
          id
          label
          labelColor
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postTagsByTagIdAndTaglabelAndTaglabelColor = /* GraphQL */ `
  query PostTagsByTagIdAndTaglabelAndTaglabelColor(
    $tagId: ID!
    $taglabelTaglabelColor: ModelPostTagsByTagCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postTagsByTagIdAndTaglabelAndTaglabelColor(
      tagId: $tagId
      taglabelTaglabelColor: $taglabelTaglabelColor
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        tagId
        taglabel
        taglabelColor
        post {
          id
          title
          createdAt
          updatedAt
          blogPostsId
        }
        tag {
          id
          label
          labelColor
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
