package com.example.Folder_Service.Pojo;


import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    public int status;
    public String message;
    public String errorMessage;

    public Response(){}
    public Response(int status, String message, String errorMessage) {
        this.status = status;
        this.message = message;
        this.errorMessage = errorMessage;
    }
}
