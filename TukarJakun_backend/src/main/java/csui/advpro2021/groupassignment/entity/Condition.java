package csui.advpro2021.groupassignment.entity;

public enum Condition {
    MODIFIED, UNTOUCHED;

    public String toString(Condition condition){
        return switch (condition) {
            case MODIFIED -> "modified";
            case UNTOUCHED -> "untouched";
        };
    }

}
