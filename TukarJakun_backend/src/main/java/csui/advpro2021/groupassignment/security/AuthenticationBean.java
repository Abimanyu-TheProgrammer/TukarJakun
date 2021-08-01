package csui.advpro2021.groupassignment.security;

public class AuthenticationBean {
    private String message;

    public AuthenticationBean(String s) {
        this.message = s;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
