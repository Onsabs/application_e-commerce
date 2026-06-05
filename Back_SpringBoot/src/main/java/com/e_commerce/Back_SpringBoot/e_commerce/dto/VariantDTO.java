package com.e_commerce.Back_SpringBoot.e_commerce.dto;

import lombok.Data;
import java.util.List;
@Data
public class VariantDTO {

    private String colorName;
    private String colorValue;

    private List<String> images;

    private List<SizeStockDTO> sizes;
}