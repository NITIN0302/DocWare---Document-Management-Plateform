package com.example.Folder_Service.Pojo;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResultResponse
{
    public String status;
    public String message;
    public String errorCode;
    public Object data;

    public ResultResponse(){
    }

    public ResultResponse(String status, String errorMsg, String errorCode,Object data) {
        this.status = status;
        this.message = errorMsg;
        this.errorCode = errorCode;
        this.data = data;
    }

    public ResultResponse(String status, String errorMsg, String errorCode) {
        this.status = status;
        this.message = errorMsg;
        this.errorCode = errorCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String errorMsg) {
        this.message = errorMsg;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
