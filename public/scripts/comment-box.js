'use strict';

/**
 * [renderComment description]
 * By surrounding a JavaScript expression in braces inside JSX (as either an attribute or child),
 * you can drop text or React components into the tree.
 *
 * We access named attributes passed to the component as keys on this.props
 * and any nested elements as this.props.children.
 */

/*Comment*/
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

/*Comment List*/
function renderCommentList() {
  var commentNodes = this.props.commentData.map(_comment);

  return (
    <div className="commentList">
      {commentNodes}
    </div>
  );
}

/*Comment Form*/
function getInitialStateCommentForm() {
  let data = {
    author: '',
    text: ''
  };
  return data;
}

function handleAuthorChange(e) {
  let data = {
    author: e.target.value
  };

  return this.setState(data);
}

function handleTextChange(e) {
  let data = {
    text: e.target.value
  };

  return this.setState(data);
}

/**
 * [handleSubmit description]
 * When the user submits the form,
 * we should clear it,
 * submit a request to the server,
 * and refresh the list of comments.
 */
function handleSubmit(e) {
  e.preventDefault(); // why ?? prevent the browser's default action of submitting the form
  var author = this.state.author.trim();
  var text = this.state.text.trim();
  if (!text || !author) {
    return;
  }

  // TODO: send request to the server
  let data = {
    author: '',
    text: ''
  };
  this.setState(data);
}

function renderCommentForm() {
  return (
    <div className="commentForm">
      <form className="commentForm" onSubmit={this.handleSubmit}> {/* attach an onSubmit handler to the form*/}
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    </div>
  );
}

/*Comment Box*/
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
  let data = {
    comments: [] //This will be replace with the new one from the server
  };
  return data;
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

function renderCommentBox() {
  return (
    <div className="commentBox">
      <h1>Comments</h1>
      <CommentList commentData={this.state.comments} />
      <CommentForm />
    </div>
  );
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
  getInitialState: getInitialStateCommentForm,
  handleAuthorChange: handleAuthorChange,
  handleTextChange: handleTextChange,
  handleSubmit: handleSubmit,
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