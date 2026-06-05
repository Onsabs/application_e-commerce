package com.e_commerce.Back_SpringBoot.e_commerce.service;

import com.e_commerce.Back_SpringBoot.e_commerce.dto.ProductRequestDTO;
import com.e_commerce.Back_SpringBoot.e_commerce.dto.ProductResponseDTO;
import com.e_commerce.Back_SpringBoot.e_commerce.entity.Product;
import com.e_commerce.Back_SpringBoot.e_commerce.mapper.ProductMapper;
import com.e_commerce.Back_SpringBoot.e_commerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public ProductResponseDTO add(ProductRequestDTO dto) {

        Product p = ProductMapper.toEntity(dto);

        Product saved = repo.save(p);

        return ProductMapper.toDTO(saved);
    }

    public List<ProductResponseDTO> getAll() {

        return repo.findAll()
                .stream()
                .map(ProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO getById(Long id) {
        Product p = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return ProductMapper.toDTO(p);
    }

    public ProductResponseDTO update(Long id, ProductRequestDTO dto) {

        Product existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        Product updated = ProductMapper.toEntity(dto);
        updated.setId(id);

        return ProductMapper.toDTO(repo.save(updated));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}