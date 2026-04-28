package com.example.Folder_Service.Pojo;

public class SaveMetaDataResp {
    private int id;
    private String status;
    public String message;
    public String errorCode;
    public SaveMetaDataResp() {
    }
    public SaveMetaDataResp(int id,String status, String message,String errorCode) {
        this.id = id;
        this.status = status;
        this.message = message;
        this.errorCode = errorCode;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
