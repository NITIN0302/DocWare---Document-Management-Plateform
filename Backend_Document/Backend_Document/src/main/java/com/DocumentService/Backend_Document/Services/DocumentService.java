package com.Document.Backend_Document.Services;

import com.Document.Backend_Document.Entity.NodeDocument;
import com.Document.Backend_Document.Pojo.GetDocument;
import com.Document.Backend_Document.Pojo.UploadResponse;

public interface DocumentService
{
    UploadResponse uploadDocument(NodeDocument nodeDocument);
    GetDocument getDocument(Long uuid);
}
