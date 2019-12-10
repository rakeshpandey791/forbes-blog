import React, {Component} from 'react';
import {connect} from "react-redux";
import {getBlogList, getSelectedBlog, likeBlog} from "../store/action/blogAction";
import BlogList from "./BlogList";
import {Link} from "react-router-dom";

class BlogDetail extends Component {
    state = {
        id: ''
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({id: id});
        this.props.getSelectedBlog(id);
    }

    render() {

        return (
            <React.Fragment>
                <div className="container">
                    <div className="img-container">
                        <img src={this.props.slectedBlog.image} className="img"/>
                    </div>
                    <div className="blog-dtl-container">
                        <div>
                            <div className="back-heading">
                                <div className="back-icon">
                                    <Link title="Back" to={'/'}>
                                        <i className="material-icons">
                                            arrow_back_ios
                                        </i>
                                    </Link>
                                </div>
                                <div>
                                    <h3>{this.props.slectedBlog.title}</h3>
                                </div>
                            </div>

                            <div className="author-info">
                                <div className="author-img-info">
                                    <div><img src={this.props.slectedBlog.authorImage}/> </div>
                                    <div>
                                        <strong>{this.props.slectedBlog.author}</strong>
                                    </div>
                                </div>
                                <div>Updated on: {this.props.slectedBlog.published_date}</div>
                            </div>
                            <p className="blog-desc">{this.props.slectedBlog.description}</p>
                            <div>
                                <i className="material-icons" onClick={() => this.props.likeBlog(this.props.slectedBlog.id)}>
                                    thumb_up_alt
                                </i>
                                <span>{this.props.slectedBlog.likes} likes</span>
                            </div>
                        </div>
                        <div>
                            <div className="display-ad" align="center">
                                <h2>DISPLAY AD</h2>
                            </div>
                        </div>
                    </div>
                    <h3 className="heading">Similar Articles</h3>
                    <BlogList isDetails={true} id={this.state.id} />
                </div>

            </React.Fragment>
        )
    }
}

const mapPropsToDispatch = (state) => {
    return {
        slectedBlog: state.blogReducer.slectedBlog
    }
}

const mapActionToDispatch = (dispatch) => {
    return {
        getSelectedBlog: (id) => dispatch(getSelectedBlog(id)),
        likeBlog: (id) => dispatch(likeBlog(id))
    }
}

export default connect(mapPropsToDispatch, mapActionToDispatch)(BlogDetail);