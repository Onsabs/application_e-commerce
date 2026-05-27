package com.e_commerce.Back_SpringBoot.e_commerce.dto;

import lombok.Data;
import java.util.List;
import java.util.Date;

@Data
public class ProductResponseDTO {
    private Long id;
    private String name;
    private double price;
    private String category;
    private String description;
    private Date createdAt;

    private List<VariantDTO> variants;
}
