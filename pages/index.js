import { useState } from 'react';
import styles from '@/styles/Home.module.css';
import { Amplify, Auth, API, withSSRContext, graphqlOperation } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import { createBlog, createPost, createComment } from '@/src/graphql/mutations';
import { listBlogs, getBlog, searchPosts } from '@/src/graphql/queries';
import { getBlogPostsKeysOnly } from '@/src/graphql/custom-queries';

import { Disclosure, Menu, Transition } from '@headlessui/react';

import Highlight from '@/src/components/Highlight';
import Button from '@/src/components/Button.tsx';
import ButtonGroup from '@/src/components/ButtonGroup.tsx';

export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req });
  try {
    console.log('nakagome project SSR entering');
    // POSTテーブル
    const response = await SSR.API.graphql({ query: listBlogs, authMode: 'API_KEY' });
    console.log({ blogs: response.data.listBlogs.items });
    console.log({ posts: response.data.listBlogs.items.posts });
    return {
      props: {
        posts: response.data.listBlogs.items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}

export default function Home({ blogs = [] }) {
  const [data, setData] = useState(null);
  const [blogData, setBlogData] = useState('');
  const [postData, setPostData] = useState('');
  const [blogsToDisplay, setBlogsToDisplay] = useState(blogs);

  // async function handleClick () {
  //   console.log("Clicked")
  //   const apiName = 'restapi1nakagome';
  //   const path = '/item';
  //   const myInit = {
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     response: true,
  //     // OPTIONAL (return the entire Axios response object instead of only response.data)
  //     // queryStringParameters: {
  //     //   name: 'param' // OPTIONAL
  //     // }
  //   };
  //   API.get(apiName, path, myInit)
  //   .then((response) => {
  //     console.log(response)
  //     setData("OK")
  //     // setData(response.data)
  //   })
  //   .catch((error) => {
  //     console.log(error.response);
  //     // setData(error.response)
  //     setData("NG")
  //   });
  // }

  async function handleCreateBlog(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const variables = {
      input: {
        name: form.get('blogName'),
      },
    };
    const response = await API.graphql({
      authMode: 'API_KEY',
      query: createBlog,
      variables: variables,
    });
    console.log({ response: response });
    setData(response.data);
  }

  async function handleCreatePost(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const variables = {
      input: {
        title: form.get('postTitle'),
        blogPostsId: '9f5d5ec0-aabb-4cef-9a7c-aa0188defc42',
      },
    };
    const response = await API.graphql({
      authMode: 'API_KEY',
      query: createPost,
      variables: variables,
    });
    console.log({ response: response });
    setData(response.data);
  }

  async function handleCreateComment(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const variables = {
      input: {
        content: form.get('commentContent'),
        postCommentsId: '2df9ae23-ddfd-4d8a-9553-b9f4cde9070e',
      },
    };
    const response = await API.graphql({
      authMode: 'API_KEY',
      query: createComment,
      variables: variables,
    });
    console.log({ response: response });
    setData(response.data);
  }

  async function handleGetBlog(event) {
    event.preventDefault();
    setBlogData('');
    const form = new FormData(event.target);
    console.log({ form: form.get('blogId') });
    if (form.get('blogId') == '') {
      console.log("it's null");
      const { data } = await API.graphql(
        graphqlOperation(listBlogs, {
          nextToken:
            'eyJ2ZXJzaW9uIjozLCJ0b2tlbiI6IkFnVjRHUWNBNnNFK210em5RTFlsUGdML3FVMFFxQ2JldnhLSDllZDNtcHJQVG5nQWV3QUNBQWRCY0hCVGVXNWpBQkZGYm1OeWVYQjBhVzl1UTI5dWRHVjRkQUFWWVhkekxXTnllWEIwYnkxd2RXSnNhV010YTJWNUFFUkJNMlE1VVhReVJqWlZUMHBaTWs5NGFuVTNOVVZUYUhoc1pFVXJZbmM1TldGcVVUVm9jVkpLYTJzMmNHMXhVa1pyUTFVek0xVlRUVWRTV21rNU5USkZOa0U5UFFBQkFBZGhkM010YTIxekFGQmhjbTQ2WVhkek9tdHRjenBoY0MxdWIzSjBhR1ZoYzNRdE1Ub3pNREU1TWpBNU5EWTVNRFk2YTJWNUx6UTRNbVU1WlRNNExXVXlPR010TkdJeFlTMDVZMlprTFRaaE9XRXhZVFUxWm1ZMVpBQzRBUUlCQUhpclhZeUl6VzVma3owWXRrUlhETWFGQ2lYTlZNSURhZmRLQ04rSlFEbnlkZ0ZjS0M2SXl0VzVWS25zakdtK1ZaQ2ZBQUFBZmpCOEJna3Foa2lHOXcwQkJ3YWdiekJ0QWdFQU1HZ0dDU3FHU0liM0RRRUhBVEFlQmdsZ2hrZ0JaUU1FQVM0d0VRUU13KytOWjZMa0FNaysvZ0NRQWdFUWdEdUJGdk9SU0ZHaWNuT2FpMGpSRm53YUVsOXZBS2c4c2pJcnhVMG9hNkhacmZuWlE1M3lWbmlsc1lndGVCTXJKak95MzFLd2x2Q2tLZTFBN2dJQUFCQUFsWEQwNUlSblVESHUvOEY1UWJ5R05ldjNUeGJUc1VTVzJhY00vSmQ1TUdkVEVuREN3Z0ErZ2V0MDBRTmtlUWlULy8vLy93QUFBQUVBQUFBQUFBQUFBQUFBQUFFQUFBRzJFeU5FK0hnMlN0bytPampMUHl0T05OM1U2aGlMcFNZejVGdnZQRnJUWnpPK3JPU25IYW5iWHBOZ0Fza0EwdkRVWHkvTkN1VmVqR1lrTGR4YzZKUS9xbThBTXNnZWlNc2Fka2Myc1pUbEhBU2prYnVWZW1CUFYrQ3JURTZTZDhPaVFZRVFkRTBQcUJCS0ZHbE5CZ0pEQmJ6UnFqUE1DanArMnJVMHVOMlBkRFA5eTM0Y0dzdi90ZEVLUHgwWXpUSGRlRW9DN21kMGR0ak93ejB3VkZqRTliZXkvUXVUVzgranNMOUpzZCtLUmxDeE5UVDB4Y2ozYytnc2xSTDVEd2wySk92TFpzWGthU3RUZFpiWjZxc05xNitrNlo2bXB4UUh3UkFNa01hVENqS0tSUlRQMzZsUlhkWXpPcXc4NmY3SVhYOGZscWx0eHpwUW9JK1U1L0Nma3g0aTk5L0s1NVF1Q1JOY2MxcGJsNU52dHZxWVZJRWl4ZVZtNjk4NGtJUjIwSVNZdjVaUTNKUDN4a1JrQzIvYWEwKzVwUXQyOHB6NEc1cWdrZmdPOHpodDZuZUY4VDBzL1VkSkNhZmRqQ0NWcXhqY2cycUxJS3pKSk9yaG43Z3JYMG1DemU2VUl4ZXVtN3JRalhLWEloNS9sVWMyWnJmLzBOYVA4Qy9OOHN1N0NaOHlQZllvVTJjYk8wTy9oWGZ4T3NKb0VZeXZ6RTRGenFvbCs3bWJWeHJJU0J6TEdaN2h1YStZdG1EdHlMVGl4VFNkcmNrZnNlU3dnQ0dwek9KNTU1MjhtdnU2M0FCbk1HVUNNUUNkcjNEUlRUYlhkYlFsdDdMNjZUblF6TGJ1QzFsbmlTZFdvZHNOTWdOQU84QlZKZDNJRUVmYkFRczVMcXF1eUprQ01BZjRRZkduZTdER01ZaE1pTlV3R1BsVXJyWjZtMk1weWZmeW5sV3EyNkI3Q3V4aXF0UXdlOUdZV3VYT2JyUkhvZz09In0=',
          // nextToken : "eyJ2ZXJzaW9uIjozLCJ0b2tlbiI6IkFnVjRQSkFMWFJzbDRDZGFsN2dGekFPOEZNNVdGaklldEk3MW93RWxJYUEzZnE4QWV3QUNBQWRCY0hCVGVXNWpBQkZGYm1OeWVYQjBhVzl1UTI5dWRHVjRkQUFWWVhkekxXTnllWEIwYnkxd2RXSnNhV010YTJWNUFFUkJiWGhPVmtwR1lrVXhPRE01VEVsdk1YcHVWRkZ6U0dOU1lrVmFMMGhzVFRKR00yb3lWemRzVkVab1pEWXJMMDFWVDNOcWRrSndhM2RUTTJsaGExUkhORkU5UFFBQkFBZGhkM010YTIxekFGQmhjbTQ2WVhkek9tdHRjenBoY0MxdWIzSjBhR1ZoYzNRdE1Ub3pNREU1TWpBNU5EWTVNRFk2YTJWNUx6UTRNbVU1WlRNNExXVXlPR010TkdJeFlTMDVZMlprTFRaaE9XRXhZVFUxWm1ZMVpBQzRBUUlCQUhpclhZeUl6VzVma3owWXRrUlhETWFGQ2lYTlZNSURhZmRLQ04rSlFEbnlkZ0dadmdhYXkrNDFtVk90NUNhUjZER0lBQUFBZmpCOEJna3Foa2lHOXcwQkJ3YWdiekJ0QWdFQU1HZ0dDU3FHU0liM0RRRUhBVEFlQmdsZ2hrZ0JaUU1FQVM0d0VRUU1obFJzc2EwQ2lUTzZXRGtaQWdFUWdEdWkycjNGR0NQWDV1OVFXaW5pcHpncWp5WTdKYklyVFlWaWttcDloeWdJVklhWEhla1lJc3dTWnkwODdsa29makVzQWFROGxCcXloUmt5ZmdJQUFCQUF2OTJLTFdIYzNJc3FIUWc1TnlsaVI0czFQbkFKQTFIdVFkVHE1blFqYjBOMFV4dkxzUndsL01ZUUFUZWVyWVdhLy8vLy93QUFBQUVBQUFBQUFBQUFBQUFBQUFFQUFBRzJFWVhlalBjVTFpbnE0Mmpud09tUzRHeUVjNGlqbnZleWgyZVNHL3gvbnBvYXZVTzdDMTVuUVJIb3VsR3IrSFBXMm5NZ0FkVVdqb0RHVkFSZittdDBGd00rSjk5TEVING1qdERrQndFTG1UWFB1d0RabXMxM1hXb2VJalBIL1prRVRFcjZYd3pUT0xuU3F2ZlVGUmZoampPTVJXZGQ0dFZSRFNXdTA2TXBKRmR2QzNJaXZOK0ZoMzVHQ3FwU0JDajZKajQwSzZ3L0FyTENMVEtBbXJYV2dIWUFGbFRweU43Q1pYUlozM01UUTRSbm05UThRd0JPV2xocVlDOCt3SE9hdkIwb2JuUDBrVWVJZko5ZkRoTjMzZittSUZmbGgwZlpUamlkdERRcnF3NXJxSzZuY0xXSFpJYlBGSVZETzlOL1JidGZYTytsVGFPWm5pS0lzRm9EL0Y3ZTBINlBHUm1JaHBPeXIwSlVCQlBxMHlaODZNbWVocFZqeGNDL3NaYU1PVXl5WnRVTmdyYjlaTmVIZnU3cGx3VTBhUjVRYXZUVld5YlJOZkFSVkNFUkovbWRoc0hnY0gzajk3cGxmUllDTTVXQzZ2UUQxTnRNWmV4VERoTWsvZjVHYlhuamFrQ1ArWnE4QnJkeFhtUkpodGFOZVhHNnJ2bFlzbzUyc28wQ05wRTZEeUoyZlg2dTZPQTN4SVBjaUN0emJhR245WUF4dGlYVHNjc3FWQk1hNTVRMVhvUEt0ZWxhMGQ4VGdYWENRYWdRSkpjR0EyMUgySFJ1ZEhxNnh4ZzZlSUNWdmdCbk1HVUNNUURzZTNsVmZTMlVMTGxZWGwzZEJWWTJjd2d5RytVQ0NLRjhCQ0xhRERWcXlHTHRldENJcXRhVlc3RmZFRm9xTmFzQ01GZXUzMGVGR3NHTVJCM1N3T1pHT3JmdnVoZTNTUDV4U1FjcW1IMDJSQi9rYXY3azB6dG9PQ2E5anFobng5d0xnZz09In0=",
          limit: 1,
        })
      );
      setBlogData(data);
    } else {
      console.log("it's not null");
      const { data } = await API.graphql(
        graphqlOperation(
          getBlog,
          // getBlogPostsKeysOnly,
          { id: form.get('blogId') }
        )
      );
      setBlogData(data);
    }
  }

  async function handleGetPost(event) {
    event.preventDefault();
    setPostData('');
    const form = new FormData(event.target);
    // --------- use Open Search ------------
    const varEq = {
      filter: {
        title: { eq: form.get('searchPostValue') },
      },
    };
    const varMatch = {
      filter: {
        title: { match: form.get('searchPostValue') },
      },
    };

    const { data } = await API.graphql(graphqlOperation(searchPosts, varMatch));
    console.log({ data: data });
    setPostData(data);
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <header className="bg-white shadow">
            <nav
              className="
              container mx-auto flex max-w-7xl items-center 
              justify-between px-4 py-6 sm:px-6 lg:px-8 
            "
            >
              <p className="bg-black p-appbar text-xxs text-danger">{user.username}</p>
              <ButtonGroup
                className=""
                buttons={['One', 'Two', 'Three', 'Four']}
                orientation="vertical"
              />
              <button onClick={signOut}>Sign out</button>
            </nav>
          </header>
          <main className={styles.main}>
            <div className={styles.grid}>
              {blogsToDisplay.map((blog) => (
                <a className={styles.card} href={`/blogs/${blog.id}`} key={blog.id}>
                  <h3>{blog.name}</h3>
                  {blog.posts.map((post) => (
                    <p key={post.id}>ID: {post.id}</p>
                  ))}
                </a>
              ))}
            </div>
            <form className="flex space-x-6" onSubmit={handleGetBlog}>
              <label className="relative block">
                <span className="sr-only">Blog IDを入力</span>
                <input
                  name="blogId"
                  className="
                  rounded-md
                  border-slate-900
                  py-2
                  pl-9 pr-3 placeholder-slate-400 
                  focus:border-sky-500
                  focus:outline-none 
                  focus:ring-1 
                  focus:ring-sky-500
                  sm:text-sm"
                  placeholder="Blog IDを入力"
                  type="text"
                />
                <Button label="Blogデータ取得"></Button>
              </label>
            </form>
            <code
              className="
            max-w-6xl space-x-4 overflow-x-scroll whitespace-pre rounded-lg bg-gray-800
            p-4 text-white 
            selection:bg-fuchsia-300 selection:text-fuchsia-900
          "
            >
              {blogData ? JSON.stringify(blogData, null, 2) : null}
            </code>

            <form onSubmit={handleGetPost}>
              <legend>Post title検索値</legend>
              <input name="searchPostValue" />
              <Button label="Postデータ取得" />
            </form>
            <Highlight>{postData ? JSON.stringify(postData, null, 2) : null}</Highlight>

            <form onSubmit={handleCreateBlog}>
              <legend>Blog名</legend>
              <input name="blogName" />
              <Button label="Blogデータ追加" />
            </form>

            <form onSubmit={handleCreatePost}>
              <legend>Postタイトル</legend>
              <input name="postTitle" />
              <Button label="Postデータ追加" />
            </form>

            <form onSubmit={handleCreateComment}>
              <legend>コメント内容</legend>
              <input name="commentContent" />
              <Button label="Commentデータ追加" />
            </form>

            <p>{data ? JSON.stringify(data) : ''}</p>
          </main>
        </>
      )}
    </Authenticator>
  );
}
