import {GET_BLOG_LIST, UPDATE_LIMIT, UPDATE_TOTAL_BLOG_COUNT, GET_SELECTED_BLOG} from "../actionConstant";

const initialState = {
    blogList: [],
    authorList: [],
    categoryList: [],
    slectedBlog: {},
    limit: 4,
    totalBlogs: 0,
    lStorageBlogs: JSON.parse(localStorage.getItem('blogList'))
};

const blogReducer = (state = initialState, action) => {
    const newState = {...state};

    switch (action.type) {
        case UPDATE_TOTAL_BLOG_COUNT:
            return {
                ...state,
                totalBlogs: action.payload
            }
        case GET_BLOG_LIST:
            return {
                ...state,
                blogList: action.payload.blogList,
                authorList: action.payload.authorList,
                categoryList: action.payload.categoryList,

            }

        case UPDATE_LIMIT:
            return {
                ...state,
                limit: state.limit + 4
            }

        case GET_SELECTED_BLOG:
            return {
                ...state,
                slectedBlog: action.payload
            }


        default:
            return newState;
    }
}

export default blogReducer;