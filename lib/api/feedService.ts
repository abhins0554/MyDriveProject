// import axios from "axios";

import { makeAuthorizedRequest } from "@/src/config/apiConfig"

// import { Platform } from "react-native";

// import CONSTANT from "../constant/Constant";
// import {
//   makeAuthorizedFileRequest,
//   makeAuthorizedRequest,
// } from "@/src/config/apiConfig";

// const get_feed_data = (query: string, token: any) => {
//   return makeAuthorizedRequest(
//     "GET",
//     "/post/find_post_group-completed-new" + query,
//     null,
//     token
//   );
// };

// const get_feed_likes = (query: string, token: any) => {
//   return makeAuthorizedRequest(
//     "GET",
//     "/post/get-likes-post-group" + query,
//     null,
//     token
//   );
// };

// const add_feed_comments = (data: any, token: any) => {
//   return makeAuthorizedRequest(
//     "POST",
//     "/profile/add-comment-post",
//     data,
//     token
//   );
// };

// const get_user_feed = (token: any, query: string) => {
//   return makeAuthorizedRequest(
//     "GET",
//     "/post/get-group-post-created-by-me-new" + query,
//     null,
//     token
//   );
// };

// const get_friend_feed = (query: string, token: any) => {
//   return makeAuthorizedRequest(
//     "GET",
//     "/post/get-group-post-created-by-me-new" + query,
//     null,
//     token
//   );
// };

// const get_feed_by_id = (query: string, token: any) => {
//   return makeAuthorizedRequest(
//     "GET",
//     "/post/find_post_group-completed-new" + query,
//     null,
//     token
//   );
// };

// const get_incomplete_post_feed = (query: string, token: any) => {
//   return makeAuthorizedRequest(
//     "GET",
//     "/post/find_post_group-semi-completed-new" + query,
//     null,
//     token
//   );
// };

// const skip_incomplete_post_feed = (query: string, token: any) => {
//   return makeAuthorizedRequest(
//     "GET",
//     "/post/group-post-skip" + query,
//     null,
//     token
//   );
// };

// const submit_for_collab_feed = (body: any, token: any) => {
//   return makeAuthorizedRequest("POST", "/post/create_post_group", body, token);
// };

// const submit_for_new_feed = (body: any, token: any) => {
//   return makeAuthorizedRequest("POST", "/post/create_post_group", body, token);
// };

// const submit_for_new_feed_custom_feed = async (
//   body: {
//     createJamData: {
//       bgImage: string;
//       firstLine: string | Blob;
//       fontFamily: string | Blob;
//       color: string | Blob;
//       title: string | Blob;
//     };
//   },
//   token: any
// ) => {
//   let data = new FormData();
//   let filename =
//     Platform.OS === "android"
//       ? body.createJamData.bgImage.split("/").pop()
//       : body.createJamData.bgImage.replace("file://", "").split("/").pop();
//   let uri =
//     Platform.OS === "android"
//       ? body.createJamData.bgImage
//       : body.createJamData.bgImage.replace("file://", "");

//   if (body.createJamData.bgImage)
//     data.append("post_image", {
//       uri: uri,
//       name: filename,
//       type: "image/jpeg", // Ensure the correct MIME type
//     });

//   data.append("line", 1);
//   data.append("text", body.createJamData.firstLine);
//   data.append("font_family", body.createJamData.fontFamily);
//   data.append("color", body.createJamData.color);
//   data.append("title", body.createJamData.title);
//   data.append("bg_info", "bg_info");

//   return makeAuthorizedFileRequest(
//     "POST",
//     "/post/create_post_group",
//     data,
//     token
//   );
// };



// const getStories = (token: any) => {
//   return makeAuthorizedRequest("GET", "/stories/get-all-stories", null, token);
// };

// const addStories = async (token: any, image: { path: string; uri: string }) => {
//   try {
//     let data = new FormData();
//     let filename =
//       Platform.OS === "android"
//         ? image.path.split("/").pop()
//         : image.uri.replace("file://", "").split("/").pop();
//     let uri =
//       Platform.OS === "android" ? image.path : image.uri.replace("file://", "");

//     data.append("storyImage", {
//       uri: uri,
//       name: filename,
//       type: "image/jpeg", // Ensure the correct MIME type
//     });

//     let config = {
//       method: "post",
//       url: `${CONSTANT.BASE_URL}/stories/add-story`,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data", // Allow FormData to handle boundary
//         Authorization: `Bearer ${token}`,
//       },
//       data: data,
//     };

//     const response = await axios(config);
//     console.log("Image upload response:", response.data);
//     if (response.data.code === 200) return response.data;
//     else throw new Error(response.data.message);
//   } catch (error) {
//     throw error;
//   }
// };

// const addStoryViewAPI = (body: any, token: any) => {
//   return makeAuthorizedRequest("POST", "/stories/add-story-view", body, token);
// };

// const deleteStory = (body: any, token: any) => {
//   return makeAuthorizedRequest("POST", "/stories/delete-story", body, token);
// };

// const get_title_data = (token: any) => {
//   return makeAuthorizedRequest("GET", "/post/get-post-title", null, token);
// };

// const feedService = {
//   like_post,
//   get_feed_data,
//   get_feed_likes,
//   get_feed_comments,
//   add_feed_comments,
//   get_user_feed,
//   get_friend_feed,
//   get_feed_by_id,
//   get_incomplete_post_feed,
//   skip_incomplete_post_feed,
//   submit_for_collab_feed,
//   submit_for_new_feed,
//   getStories,
//   addStories,
//   addStoryViewAPI,
//   deleteStory,
//   submit_for_new_feed_custom_feed,
//   get_title_data,
// };

// export default feedService;


const getDefaultFeedServer = (token: string) => {
    return makeAuthorizedRequest("GET", '/post/find_post_group-completed-new?skip=0&limit=100', null, token);
}

const getFeedData = (query: string, token: string) => {
    return makeAuthorizedRequest("GET", '/post/find_post_group-completed-new' + query, null, token);
}

const likeUnlikePost = (body: any, token: string) => {
    return makeAuthorizedRequest("POST", "/post/add-like-unlike", body, token);
};

const getComments = (query: string, token: any) => {
    return makeAuthorizedRequest(
        "GET",
        "/post/get-group-post-comment-by-id" + query,
        null,
        token
    );
};

const getIncompletePostFeedData = (query: string, token: any) => {
  return makeAuthorizedRequest(
    "GET",
    "/post/find_post_group-semi-completed-new" + query,
    null,
    token
  );
};

const skipIncompletePost = (query: string, token: any) => {
  return makeAuthorizedRequest(
    "GET",
    "/post/group-post-skip" + query,
    null,
    token
  );
};

const submitForIncompletePost = (body: any, token: any) => {
  return makeAuthorizedRequest("POST", "/post/create_post_group", body, token);
};

const submitForNewPost = (body: any, token: any) => {
  return makeAuthorizedRequest("POST", "/post/create_post_group", body, token);
};

const getFeedByMe = (query: string, token: string) => {
  return makeAuthorizedRequest('GET', '/post/get-group-post-created-by-me-new' + query, null, token);
};

const feedService = {
    getDefaultFeedServer,
    likeUnlikePost,
    getComments,
    getIncompletePostFeedData,
    skipIncompletePost,
    submitForIncompletePost,
    submitForNewPost,
    getFeedData,
    getFeedByMe
}

export default feedService;
