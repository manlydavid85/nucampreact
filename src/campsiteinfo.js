












function RenderComments({comments, addComment, campsiteId}) {
   <CommentForm campsiteId={campsiteId} addComment={addComment} />

        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        }

                        <RenderComments 
                            comments={props.comments}
                            addComment={props.addComment}
                            campsiteId={props.campsite.id}
                        />
