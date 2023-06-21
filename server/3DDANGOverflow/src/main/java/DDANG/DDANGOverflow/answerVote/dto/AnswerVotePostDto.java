package DDANG.DDANGOverflow.answerVote.dto;

public class AnswerVotePostDto {
    private boolean voteFlag;
    private int userId;

    public boolean isVoteFlag() {
        return voteFlag;
    }

    public void setVoteFlag(boolean voteFlag) {
        this.voteFlag = voteFlag;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
