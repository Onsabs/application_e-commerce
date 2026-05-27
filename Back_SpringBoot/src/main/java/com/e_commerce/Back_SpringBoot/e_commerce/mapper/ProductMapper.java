package com.e_commerce.Back_SpringBoot.e_commerce.mapper;

import com.e_commerce.Back_SpringBoot.e_commerce.dto.*;
import com.e_commerce.Back_SpringBoot.e_commerce.entity.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ProductMapper {

    // ================= DTO -> ENTITY =================
    public static Product toEntity(ProductRequestDTO dto) {

        Product product = new Product();

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setCategory(dto.getCategory());
        product.setDescription(dto.getDescription());
        product.setCreatedAt(new Date());

        List<Variant> variants = new ArrayList<>();

        if (dto.getVariants() != null) {

            for (VariantDTO v : dto.getVariants()) {

                Variant variant = new Variant();

                variant.setColorName(v.getColorName());
                variant.setColorValue(v.getColorValue());

                // images safe
                variant.setImages(v.getImages() != null ? v.getImages() : new ArrayList<>());

                List<SizeStock> sizes = new ArrayList<>();

                if (v.getSizes() != null) {
                    for (SizeStockDTO s : v.getSizes()) {

                        if (s != null) {
                            SizeStock ss = new SizeStock();
                            ss.setSize(s.getSize());
                            ss.setStock(s.getStock());
                            sizes.add(ss);
                        }
                    }
                }

                variant.setSizes(sizes);
                variants.add(variant);
            }
        }

        product.setVariants(variants);

        return product;
    }

    // ================= ENTITY -> DTO =================
    public static ProductResponseDTO toDTO(Product product) {

        ProductResponseDTO dto = new ProductResponseDTO();

        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setCategory(product.getCategory());
        dto.setDescription(product.getDescription());
        dto.setCreatedAt(product.getCreatedAt());

        List<VariantDTO> variants = new ArrayList<>();

        if (product != null && product.getVariants() != null) {

            for (Variant v : product.getVariants()) {

                VariantDTO vd = new VariantDTO();

                vd.setColorName(v.getColorName());
                vd.setColorValue(v.getColorValue());

                // SAFE images
                vd.setImages(v.getImages() != null ? v.getImages() : new ArrayList<>());

                List<SizeStockDTO> sizes = new ArrayList<>();

                if (v.getSizes() != null) {

                    for (SizeStock s : v.getSizes()) {

                        SizeStockDTO sd = new SizeStockDTO();
                        sd.setSize(s.getSize());
                        sd.setStock(s.getStock());

                        sizes.add(sd);
                    }
                }

                vd.setSizes(sizes);
                variants.add(vd);
            }
        }

        dto.setVariants(variants);

        return dto;
    }
}