import URL from '../../url'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLoading } from "../../States/index";
import PostWidget from "../../Features/Widgets/PostWidget";
import Loading from "../../Components/Loading";
import axios from "axios";
const PostsWidget = ({ userid, isProfile = false }) => {
  const dispatch = useDispatch();

  const { token, posts } = useSelector((state) => state);

  const isLoading = useSelector((state) => state.isLoading);
  const getPosts = async () => {
    const { data } = await axios.get(
      `${URL}/posts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const { data } = await axios.get(
      `${URL}/posts/${userid}/post`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }

    dispatch(setLoading({ isLoading: false }));
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          height: "65vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
      }

  return (
    <>
      {posts.map((post, index) => {
        const {
          _id,
          userid,
          firstname,
          lastname,
          description,

          avatar,
          useravatar,
          likes,
          comments,
        } = post;
        return (
          <PostWidget
            key={index}
            postid={_id}
            postUserid={userid}
            name={`${firstname} ${lastname}`}
            description={description}
            avatar={avatar}
            useravatar={useravatar}
            likes={likes}
            comments={comments}
          />
        );
      })}
    </>
  );
};
export default PostsWidget;
