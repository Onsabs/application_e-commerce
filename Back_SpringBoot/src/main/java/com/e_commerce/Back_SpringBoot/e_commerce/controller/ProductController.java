package com.e_commerce.Back_SpringBoot.e_commerce.controller;

import com.e_commerce.Back_SpringBoot.e_commerce.dto.ProductRequestDTO;
import com.e_commerce.Back_SpringBoot.e_commerce.dto.ProductResponseDTO;
import com.e_commerce.Back_SpringBoot.e_commerce.entity.Product;

import com.e_commerce.Back_SpringBoot.e_commerce.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public ProductResponseDTO add(
            @RequestBody ProductRequestDTO dto
    ) {
        return service.add(dto);
    }

    @GetMapping
    public List<ProductResponseDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ProductResponseDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public ProductResponseDTO update(
            @PathVariable Long id,
            @RequestBody ProductRequestDTO dto
    ) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}