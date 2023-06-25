package DDANG.DDANGOverflow.answerComment.dto;

public class AnswerCommentPostDto {
    private String comment;
    private int userId;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
