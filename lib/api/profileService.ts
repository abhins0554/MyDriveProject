import { makeAuthorizedRequest } from "@/src/config/apiConfig"


const getProfileById = (query: string, token: string) => {
    return makeAuthorizedRequest("GET", "/profile/search-users-profile-by-id" + query, null, token);
};

const updateProfileDetails = (body:any, token: string) => {
    return makeAuthorizedRequest("POST", "/profile/update-profile-detail", body, token);
}

const updateProfileImage = (body:any, token: string) => {
    return makeAuthorizedRequest("POST", "/profile/update-profile-image", body, token);
}

const profileService = {
    getProfileById,
    updateProfileImage,
    updateProfileDetails,
};

export default profileService;