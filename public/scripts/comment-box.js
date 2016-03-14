'use strict';
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

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
  var commentNodes = this.props.data.map(_comment);

  return (
    <div className="commentList">
      {commentNodes}
    </div>
  );
}

function renderCommentForm() {
  return (
    <div className="commentForm">
    </div>
  );
}

function renderCommentBox() {
  return (
    <div className="commentBox">
      <h1>Comments</h1>
      <CommentList data={this.state.data} />
      <CommentForm />
    </div>
  );
}

function getInitialStateCommentBox() {
  return {data: []};
}
/**
 * [render description]
 * @return a tree of React components that will eventually render to HTML
 *
 * [getInitialState description]
 * executes exactly once during the lifecycle of the component
 * and sets up the initial state of the component
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
  getInitialState: getInitialStateCommentBox,
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
  <CommentBox url='api/comments'/>,
  document.getElementById('content')
);