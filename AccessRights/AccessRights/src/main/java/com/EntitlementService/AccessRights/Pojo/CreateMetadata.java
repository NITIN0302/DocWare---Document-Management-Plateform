package com.EntitlementService.AccessRights.Pojo;

public class CreateMetadata {
    private String status;
    public String message;
    public String errorCode;
    public CreateMetadata() {
    }
    public CreateMetadata(String status, String message,String errorCode) {
        this.status = status;
        this.message = message;
        this.errorCode = errorCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}
