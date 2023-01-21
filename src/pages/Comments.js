import Cookies from "js-cookie";
import React from "react";
import { useParams } from "react-router-dom";
import { CloseIcon } from "../assets/Icons";
import ErrorPage from "./ErrorPage";

const Comments = () => {
  const { postId } = useParams();
  const [commentsData, setCommentsData] = React.useState([]);
  const token = Cookies.get("token");
  const myUsername = Cookies.get("username");
  const fetchComments = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/allposts/${postId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    if (res.status === 200) {
      setCommentsData(response.data);
    }
  };
  React.useEffect(() => {
    if(postId.length!==24){
      return;
    }
    fetchComments();
  }, []);
  const deleteComment = async (commentID) => {
    const bodyData = JSON.stringify({
      postId: postId,
      commentID: commentID,
    });
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/allposts/comment/${myUsername}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: bodyData,
      }
    );
    const response = await res.json();
    if (res.status === 200) {
      console.log(response);
    }
  };
  // console.log(commentsData)
  if(postId.length!==24){
    return(<>
    <ErrorPage/>
    </>)
  }
  return (
    <>
      <div className="w-full bg-[#121212] flex flex-col justify-center items-center mb-8 md:ml-[72px] md:w-[calc(100%-72px)] md:mb-0 xl:ml-[220px] xl:w-[calc(100%-220px)]">
        {commentsData.map((singleComment) => (
          <div
            key={singleComment.commentID}
            className="bg-[#393939] w-[calc(100%-4rem)] m-4 rounded-md"
          >
            <div className="flex justify-between items-center m-1">
              <p className="text-left ml-1 text-gray-100 text-lg font-semibold cursor-pointer">
                {singleComment.username}
              </p>
              {singleComment.username === myUsername ? (
                <p
                  onClick={() => {
                    if (window.confirm("Do you wanna delete this comment")) {
                      deleteComment(singleComment.commentID);
                    }
                  }}
                  className="mr-1 cursor-pointer"
                >
                  <CloseIcon />
                </p>
              ) : (
                ""
              )}
            </div>
            <p className="text-left m-1 text-gray-100 text-sm">
              {singleComment.commentString}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
