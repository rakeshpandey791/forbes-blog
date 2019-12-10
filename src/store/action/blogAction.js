import {GET_BLOG_LIST, UPDATE_LIMIT, UPDATE_TOTAL_BLOG_COUNT,
    GET_SELECTED_BLOG, SET_AUTHOR_FILTER, SET_CATEGORY_FILTER} from "../actionConstant";
import blogs from './../blogs';

const getAuthorCategoryList = (blogReducerData) => {
    const retObj = {
        authorList: [],
        categoryList: [],
        blogList: blogReducerData.lStorageBlogs
    }
    for(let i=0; i<retObj.blogList.length; i++) {
        if (retObj.authorList.indexOf(retObj.blogList[i].author) < 0) {
            retObj.authorList.push(retObj.blogList[i].author);
        }

        if (retObj.categoryList.indexOf(retObj.blogList[i].category) < 0) {
            retObj.categoryList.push(retObj.blogList[i].category);
        }
    }

    if (blogReducerData.selectedAuthor) {
        retObj.blogList = retObj.blogList.filter(obj => obj.author === blogReducerData.selectedAuthor);
    }

    if (blogReducerData.selectedCategory) {
        retObj.blogList = retObj.blogList.filter(obj => obj.category === blogReducerData.selectedCategory);
    }
    retObj.blogList = retObj.blogList.slice(0, blogReducerData.limit);

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

        const authorCategoryList = getAuthorCategoryList(blogReducerData);

        dispatch({type: GET_BLOG_LIST,
            payload: {blogList: authorCategoryList.blogList, authorList: authorCategoryList.authorList, categoryList: authorCategoryList.categoryList}});
    }
}

export const filterByAuthor = (event) => {
    return (dispatch, getState) => {
        dispatch({type: SET_AUTHOR_FILTER, payload: event.target.value});
        const blogReducerData = getState().blogReducer;
        const authorCategoryList = getAuthorCategoryList(blogReducerData);
        dispatch({type: GET_BLOG_LIST,
            payload: {blogList: authorCategoryList.blogList, authorList: authorCategoryList.authorList, categoryList: authorCategoryList.categoryList}});
    }
}

export const filterByCategory = (event) => {
    return (dispatch, getState) => {
        dispatch({type: SET_CATEGORY_FILTER, payload: event.target.value});
        const blogReducerData = getState().blogReducer;
        const authorCategoryList = getAuthorCategoryList(blogReducerData);
        dispatch({type: GET_BLOG_LIST,
            payload: {blogList: authorCategoryList.blogList, authorList: authorCategoryList.authorList, categoryList: authorCategoryList.categoryList}});
    }
}

export const updateLimit = (id) => {
    return (dispatch, getState) => {
        dispatch({type: UPDATE_LIMIT});
        const blogReducerData = getState().blogReducer;
        let blogList = blogReducerData.lStorageBlogs.slice(0, getState().blogReducer.limit);

        const authorCategoryList = getAuthorCategoryList(blogReducerData);

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
        const authorCategoryList = getAuthorCategoryList(blogReducerData);

        dispatch({type: GET_BLOG_LIST,
            payload: {blogList: authorCategoryList.blogList, authorList: authorCategoryList.authorList, categoryList: authorCategoryList.categoryList}});
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
