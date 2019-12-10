import {GET_BLOG_LIST, UPDATE_LIMIT, UPDATE_TOTAL_BLOG_COUNT, GET_SELECTED_BLOG} from "../actionConstant";
import blogs from './../blogs';

const getAuthorCategoryList = (blogList) => {
    const retObj = {
        authorList: [],
        categoryList: []
    }

    for(let i=0; i<blogList.length; i++) {
        if (retObj.authorList.indexOf(blogList[i].author) < 0) {
            retObj.authorList.push(blogList[i].author);
        }

        if (retObj.categoryList.indexOf(blogList[i].category) < 0) {
            retObj.categoryList.push(blogList[i].category);
        }
    }

    return retObj;
}

export const getBlogList = (id) => {
    return (dispatch, getState) => {
        if (!localStorage.getItem('blogList')) {
            const dataToUpdateLocalStorage = [];
            for(let i=0; i<blogs.length; i++) {
                dataToUpdateLocalStorage[i] = blogs[i];
                dataToUpdateLocalStorage[i].likes = 0;
                dataToUpdateLocalStorage[i].id = i + 1;
                dataToUpdateLocalStorage[i].image = blogs[i].imgs.large;
                dataToUpdateLocalStorage[i].authorImage = 'https://www.vjbooks.com/v/vspfiles/assets/images/Boyd_Morrison_2.jpg';
            }
            localStorage.setItem('blogList', JSON.stringify(dataToUpdateLocalStorage));
        }



        const blogReducerData = getState().blogReducer;
        dispatch({type: UPDATE_TOTAL_BLOG_COUNT, payload: blogReducerData.lStorageBlogs.length});
        let blogList = blogReducerData.lStorageBlogs.slice(0, blogReducerData.limit);
        if (id) {
            const blogIndex = blogList.findIndex(blog => blog.id === parseInt(id))
            blogList = blogList.splice(blogIndex, 1);
        }

        const authorCategoryList = getAuthorCategoryList(blogReducerData.lStorageBlogs);

        dispatch({type: GET_BLOG_LIST,
            payload: {blogList: blogList, authorList: authorCategoryList.authorList, categoryList: authorCategoryList.categoryList}});
    }
}

export const updateLimit = (id) => {
    return (dispatch, getState) => {
        dispatch({type: UPDATE_LIMIT});
        const blogReducerData = getState().blogReducer;
        let blogList = blogReducerData.lStorageBlogs.slice(0, getState().blogReducer.limit);

        const authorCategoryList = getAuthorCategoryList(blogReducerData.lStorageBlogs);

        dispatch({type: GET_BLOG_LIST,
            payload: {blogList: blogList, authorList: authorCategoryList.authorList, categoryList: authorCategoryList.categoryList}});
    }
}

export const likeBlog = (id) => {
    return (dispatch, getState) => {
        const blogReducerData = getState().blogReducer;
        for(let i=0; i<blogReducerData.lStorageBlogs.length; i++) {
            if (id === blogReducerData.lStorageBlogs[i].id) {
                blogReducerData.lStorageBlogs[i].likes += 1;
            }
        }
        localStorage.setItem('blogList', JSON.stringify(blogReducerData.lStorageBlogs));
        let blogList = blogReducerData.lStorageBlogs.slice(0, blogReducerData.limit);

        const authorCategoryList = getAuthorCategoryList(blogReducerData.lStorageBlogs);

        dispatch({type: GET_BLOG_LIST,
            payload: {blogList: blogList, authorList: authorCategoryList.authorList, categoryList: authorCategoryList.categoryList}});
    }
}

export const getSelectedBlog = (id) => {
    return (dispatch, getState) => {
        const blogReducerData = getState().blogReducer;
        let selectedBlog = {};
        for (let i=0; i<blogReducerData.lStorageBlogs.length; i++) {
            if (parseInt(id) === blogReducerData.lStorageBlogs[i].id) {
                selectedBlog = blogReducerData.lStorageBlogs[i];
            }
        }
        dispatch({type: GET_SELECTED_BLOG, payload: selectedBlog});
    }
}
