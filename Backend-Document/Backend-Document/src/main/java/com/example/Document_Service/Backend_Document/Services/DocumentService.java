package com.example.Document_Service.Backend_Document.Services;

import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import com.example.Document_Service.Backend_Document.Pojo.GetDocument;
import com.example.Document_Service.Backend_Document.Pojo.UploadResponse;

import java.util.List;


public interface DocumentService
{
    UploadResponse uploadDocument(NodeDocument nodeDocument);
    GetDocument getDocumentContent(String username,Long uuid);

    public List<NodeDocument> getDocument(String username,Long parentId);

    public List<NodeDocument> getDocumentByName(String username,String docname);

    public List<NodeDocument> getDocumentByUuid(String username,Long uuid);
}
