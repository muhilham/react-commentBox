'use strict';

function renderCommentList() {
  return (
    <div className="commentList">
      Hello, world! I am a CommentList.
    </div>
  );
}

function renderCommentForm() {
  return (
    <div className="commentForm">
      Hello, world! I am a CommentForm.
    </div>
  );
}

var createClassCommentList = {
  render: renderCommentList
};

var createClassCommentForm = {
  render: renderCommentForm
};


var CommentList = React.createClass(createClassCommentList);
var CommentForm = React.createClass(createClassCommentForm);
