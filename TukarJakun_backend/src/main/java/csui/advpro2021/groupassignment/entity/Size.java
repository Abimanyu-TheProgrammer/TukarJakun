package csui.advpro2021.groupassignment.entity;

public enum Size {
    S, M, L, XL, SPECIAL;

    public String toString(Size size){
        return switch (size) {
            case S -> "s";
            case M -> "m";
            case L -> "l";
            case XL -> "xl";
            case SPECIAL -> "special";
        };
    }
}
