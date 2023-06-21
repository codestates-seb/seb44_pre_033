package DDANG.DDANGOverflow.questionVote.dto;

public class QuestionVotePostDto {
    private boolean voteFlag;
    private int userId;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int memberId) {
        this.userId = memberId;
    }

    public boolean isVoteFlag() {
        return voteFlag;
    }

    public void setVoteFlag(boolean voteFlag) {
        this.voteFlag = voteFlag;
    }
}
