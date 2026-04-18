package com.EntitlementService.AccessRights.Pojo;

public class MetaDataDTO {
    private String name;
    private int id;
    public MetaDataDTO() {}
    public MetaDataDTO(String name, int id) {
        this.name = name;
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

}
