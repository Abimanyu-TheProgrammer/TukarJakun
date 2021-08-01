package csui.advpro2021.groupassignment.entity;

public enum Faculty {
    FASILKOM, FPSI, FT, FIA;

    public String toString(Faculty faculty){
        return switch (faculty) {
            case FASILKOM -> "fasilkom";
            case FPSI -> "fpsi";
            case FT -> "ft";
            case FIA -> "fia";
        };
    }
}
