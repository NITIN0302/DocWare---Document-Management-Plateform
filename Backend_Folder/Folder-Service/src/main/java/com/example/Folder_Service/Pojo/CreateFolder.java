package com.example.Folder_Service.Pojo;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateFolder {
    public int status;
    public String errorMessage;
    public String message;
    public Object data;

    public CreateFolder(){}
    public CreateFolder(int status, String errorMessage, String message, Object data) {
        this.status = status;
        this.errorMessage = errorMessage;
        this.message = message;
        this.data = data;
    }

    public CreateFolder(int status, String errorMessage, String message) {
        this.status = status;
        this.errorMessage = errorMessage;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
