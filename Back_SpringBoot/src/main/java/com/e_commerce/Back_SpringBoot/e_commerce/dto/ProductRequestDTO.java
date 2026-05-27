package com.e_commerce.Back_SpringBoot.e_commerce.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProductRequestDTO {
    private String name;
    private double price;
    private String category;
    private String description;

    private List<VariantDTO> variants;
}
