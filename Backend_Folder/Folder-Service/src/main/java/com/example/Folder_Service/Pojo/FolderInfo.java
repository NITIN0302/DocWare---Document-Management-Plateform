package com.example.Folder_Service.Pojo;

public class FolderInfo {
    public int uuid;
    public int isCreated;

    public FolderInfo(){}
    public FolderInfo(int isCreated, int uuid) {
        this.isCreated = isCreated;
        this.uuid = uuid;
    }

    public int getUuid() {
        return uuid;
    }

    public void setUuid(int uuid) {
        this.uuid = uuid;
    }

    public int getIsCreated() {
        return isCreated;
    }

    public void setIsCreated(int isCreated) {
        this.isCreated = isCreated;
    }

}
