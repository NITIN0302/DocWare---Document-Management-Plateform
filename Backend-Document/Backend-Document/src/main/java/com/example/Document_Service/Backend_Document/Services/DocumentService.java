package com.example.Document_Service.Backend_Document.Services;

import com.example.Document_Service.Backend_Document.Entity.NodeDocument;
import com.example.Document_Service.Backend_Document.Pojo.GetDocument;
import com.example.Document_Service.Backend_Document.Pojo.UploadResponse;

import java.util.List;


public interface DocumentService
{
    UploadResponse uploadDocument(NodeDocument nodeDocument);
    GetDocument getDocumentContent(Long uuid);

    public List<NodeDocument> getDocument(Long parentId);
}
