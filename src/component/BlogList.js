import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import {getBlogList, updateLimit, likeBlog, filterByAuthor, filterByCategory, sortBy} from "../store/action/blogAction";

class BlogList extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            id: ''
        };
    }
    componentDidMount() {
        this.props.getBlogList(this.props.id);
    }

    navigateToBlogDetail = (event) => {
        if (event.target.dataset.id) {
            this.setState({redirect: true, id: event.target.dataset.id});
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/blog-detail/' + this.state.id} />
        }
        let disableClass = 'more-articles-btn';
        if (this.props.limit >= this.props.totalBlogs) {
            disableClass += ' disabled';
        }
        return (
            <div className="blog-container">
                {
                    !this.props.isDetails ? (
                        <div className="filter-box">
                            <div><h3 className="heading">Blog</h3></div>
                            <div className="pt-5">
                                <select onChange={this.props.filterByAuthor}>
                                    <option value="">Select Author</option>
                                    {
                                        this.props.authorList.map( author => <option selected={author === this.props.selectedAuthor}
                                                                                     key={author} value={author}>{author}</option>)
                                    }
                                </select>
                            </div>
                            <div className="pt-5">
                                <select onChange={this.props.filterByCategory}>
                                    <option value="">Select Category</option>
                                    {
                                        this.props.categoryList.map( category => <option selected={category === this.props.selectedCategory}
                                                                                         key={category} value={category}>{category}</option>)
                                    }
                                </select>
                            </div>
                            <div className="pt-5">
                                <select onChange={this.props.sortBy}>
                                    <option value="">Sort By</option>
                                    <option value="author">Author</option>
                                    <option value="category">Category</option>

                                </select>
                            </div>

                        </div>

                    ) : ''
                }

                <div className="list-container">
                    <div onClick={this.navigateToBlogDetail}>
                        {
                            this.props.blogList.length > 0 ? (
                            this.props.blogList.map( (blog, index)=> {
                                return (
                                    <div className="list-item" data-id={blog.id} key={index}>
                                        <div>
                                            <div className="date-category">
                                                <div>
                                                    {blog.published_date} <span className="category">{blog.category}</span>
                                                </div>
                                                <div>
                                                    <i className="material-icons" onClick={() => this.props.likeBlog(blog.id)}>
                                                        thumb_up_alt
                                                    </i>
                                                    <span>{blog.likes} likes</span>
                                                </div>
                                            </div>
                                            <h3 className="blog-title" data-id={blog.id}>{blog.title}</h3>
                                            <p className="blog-desc">
                                                {blog.description}
                                            </p>
                                            <div>by <strong>{blog.author}</strong></div>
                                        </div>
                                        <div>
                                            <img src={blog.imgs.large} data-id={blog.id} alt={blog.id} className="img" />
                                        </div>
                                    </div>
                                )
                            })
                            ) : (<div className="pt-5" align="center"><h3>No record match</h3></div>)
                        }


                        {
                            !this.props.isDetails && this.props.blogList.length > 0 ? (
                                <div align="center" className="mt-2">
                                    <a  className={disableClass} onClick={this.props.updateLimit}>More Articles</a>
                                </div>
                            ) : ''
                        }
                    </div>

                    <div></div>
                </div>

            </div>
        )
    }
}

const mapPropsToDispatch = (state) => {
    return {
        blogList: state.blogReducer.blogList,
        categoryList: state.blogReducer.categoryList,
        authorList: state.blogReducer.authorList,
        selectedAuthor: state.blogReducer.selectedAuthor,
        selectedCategory: state.blogReducer.selectedCategory,
        limit: state.blogReducer.limit,
        totalBlogs: state.blogReducer.totalBlogs
    }
}

const mapActionToDispatch = (dispatch) => {
    return {
        getBlogList: (id) => dispatch(getBlogList(id)),
        updateLimit: () => dispatch(updateLimit()),
        likeBlog: (id) => dispatch(likeBlog(id)),
        filterByAuthor: (event) => dispatch(filterByAuthor(event)),
        filterByCategory: (event) => dispatch(filterByCategory(event)),
        sortBy: (event) => dispatch(sortBy(event)),
    }
}

export default connect(mapPropsToDispatch, mapActionToDispatch)(BlogList);