'use strict';

/**
 * [renderComment description]
 * By surrounding a JavaScript expression in braces inside JSX (as either an attribute or child),
 * you can drop text or React components into the tree.
 *
 * We access named attributes passed to the component as keys on this.props
 * and any nested elements as this.props.children.
 */
function renderComment() {
  return (
    <div className="comment">
      <h2 className="commentAuthor">
        {this.props.author}
      </h2>
      {this.props.children.toString()}
    </div>
  );
}

function _comment(comment) {
  return (
    <Comment author={comment.author} key={comment.id}>
      {comment.text}
    </Comment>
  );
}

function renderCommentList() {
  var commentNodes = this.props.commentData.map(_comment);

  return (
    <div className="commentList">
      {commentNodes}
    </div>
  );
}

function renderCommentForm() {
  return (
    <div className="commentForm">
      <form className="commentForm">
        <input type="text" placeholder="Your name" />
        <input type="text" placeholder="Say something..." />
        <input type="submit" value="Post" />
      </form>
    </div>
  );
}

function renderCommentBox() {
  return (
    <div className="commentBox">
      <h1>Comments</h1>
      <CommentList commentData={this.state.comments} />
      <CommentForm />
    </div>
  );
}

function loadCommentsFromServer() {
  let ajaxRequest = {
    url: this.props.url,
    dataType: 'json',
    cache: false,
    success: _success.bind(this),
    error: _error.bind(this)
  };

  return $.ajax(ajaxRequest);
}

function getInitialStateCommentBox() {
  return {
    comments: [] //This will be replace with the new one from the server
  };
}

function componentDidMountCommentBox() {
  this.loadCommentsFromServer();
  setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  return;
}

function _success(data) {
  var _data = {
    comments: data
  };

  /**
   * replace the old array of comments with the new one from the server
   * and the UI automatically updates itself.
   */
  return this.setState(_data);
}

function _error(xhr, status, err) {
  return console.error(this.props.url, status, err.toString());
}
/**
 * [render description]
 * @return a tree of React components that will eventually render to HTML
 *
 * [getInitialState description]
 * executes exactly once during the lifecycle of the component
 * and sets up the initial state of the component
 *
 * [componentDidMount description]
 * method called automatically by React
 * after a component is rendered for the first time
 *
 * [loadCommentsFromServer description] - custom method
 * move the AJAX call to a separate method
 * and call it when the component is first loaded
 */
var createClassComment = {
  render: renderComment
};

var createClassCommentList = {
  render: renderCommentList
};

var createClassCommentForm = {
  render: renderCommentForm
};

var createClassCommentBox = {
  loadCommentsFromServer: loadCommentsFromServer,
  getInitialState: getInitialStateCommentBox,
  componentDidMount: componentDidMountCommentBox,
  render: renderCommentBox
};

/**
 * [React.createClass description]
 * create a new React component
 */
var Comment = React.createClass(createClassComment);
var CommentList = React.createClass(createClassCommentList);
var CommentForm = React.createClass(createClassCommentForm);
var CommentBox = React.createClass(createClassCommentBox);

/**
 *  ReactDOM.render
 * - instantiates the root component,
 * - starts the framework,
 * - and injects the markup into a raw DOM element,
 *
 *   == provided as the second argument ==
 */
ReactDOM.render(
  <CommentBox url='api/comments' pollInterval={2000}/>,
  document.getElementById('content')
);