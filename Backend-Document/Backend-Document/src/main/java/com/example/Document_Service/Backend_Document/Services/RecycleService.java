package com.example.Document_Service.Backend_Document.Services;

import com.example.Document_Service.Backend_Document.Entity.RecycledDocument;
import com.example.Document_Service.Backend_Document.Pojo.DeleteDocument;

import java.util.List;

public interface RecycleService {

    public List<RecycledDocument> getAllDeletedDocument(String username);

    public DeleteDocument recycleDocument(String username, Long uuid);

}
