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

function renderCommentList() {
  return (
    <div className="commentList">
      <Comment author="Pete Hunt">This is one comment {/*This goes to this.props.children*/}</Comment>
      <Comment author="Jordan Walke">This is *another* comment</Comment>
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
      <CommentList data={this.props.data} />
      <CommentForm />
    </div>
  );
}

/**
 * [render description]
 * @return a tree of React components that will eventually render to HTML
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
  <CommentBox data={data}/>,
  document.getElementById('content')
);