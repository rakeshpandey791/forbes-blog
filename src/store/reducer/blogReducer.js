import {GET_BLOG_LIST, UPDATE_LIMIT, UPDATE_TOTAL_BLOG_COUNT, GET_SELECTED_BLOG,
    SET_AUTHOR_FILTER, SET_CATEGORY_FILTER} from "../actionConstant";

const initialState = {
    blogList: [],
    authorList: [],
    categoryList: [],
    slectedBlog: {},
    selectedAuthor: '',
    selectedCategory: '',
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

        case SET_AUTHOR_FILTER:
            return {
                ...state,
                selectedAuthor: action.payload
            }

        case SET_CATEGORY_FILTER:
            return {
                ...state,
                selectedCategory: action.payload
            }

        default:
            return newState;
    }
}

export default blogReducer;