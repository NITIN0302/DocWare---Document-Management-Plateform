package com.example.Document_Service.Backend_Document.Services;

import com.example.Document_Service.Backend_Document.Entity.Config;
import com.example.Document_Service.Backend_Document.repository.ConfigRepository;
import org.springframework.stereotype.Service;

@Service
public class ConfigService {
    private final ConfigRepository configRepository;

    public ConfigService(ConfigRepository configRepository) {
        this.configRepository = configRepository;
    }

    public Config getConfigValue() {
        return configRepository.getById(1L);
    }
}
