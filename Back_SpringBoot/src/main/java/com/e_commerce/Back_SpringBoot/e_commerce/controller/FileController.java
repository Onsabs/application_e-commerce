package com.e_commerce.Back_SpringBoot.e_commerce.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
public class FileController {

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public String upload(@RequestParam MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        String fileName =
                UUID.randomUUID() + "_" +
                        file.getOriginalFilename().replace(" ", "_");

        Path path = Paths.get(UPLOAD_DIR + fileName);

        Files.createDirectories(path.getParent());
        Files.copy(file.getInputStream(), path);

        // ✅ نرجعو URL قصير وواضح
        return fileName;
    }
}
