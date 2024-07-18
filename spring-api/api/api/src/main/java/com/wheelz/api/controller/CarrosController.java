package com.wheelz.api.controller;

import com.wheelz.api.dto.carro.CarrosResponseDTO;
import com.wheelz.api.dto.carro.CarrosSavingRequestDTO;
import com.wheelz.api.dto.carro.CarrosUpdateRequestDTO;
import com.wheelz.api.service.carros.CarrosService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/carros")
@CrossOrigin("*")
public class CarrosController {

    private final CarrosService carrosService;

    @GetMapping
    public ResponseEntity<List<CarrosResponseDTO>> getAllCarros() {
        List<CarrosResponseDTO> carrosResponseDTOList = carrosService.getAllCarros();
        return ResponseEntity.ok(carrosResponseDTOList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarrosResponseDTO> getCarrosById(@PathVariable Long id) {
        CarrosResponseDTO carrosResponseDTO = carrosService.getCarrosById(id);
        return ResponseEntity.ok(carrosResponseDTO);
    }

    @PostMapping
    public ResponseEntity<CarrosResponseDTO> saveCarros(@Validated @RequestBody CarrosSavingRequestDTO carrosSavingRequestDTO) {
        CarrosResponseDTO carrosResponseDTO = carrosService.saveCarros(carrosSavingRequestDTO);
        return ResponseEntity.ok(carrosResponseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarrosResponseDTO> updateCarros(@PathVariable Long id, @Validated @RequestBody CarrosUpdateRequestDTO carrosUpdateRequestDTO) {
        CarrosResponseDTO carrosResponseDTO = carrosService.updateCarros(id, carrosUpdateRequestDTO);
        return ResponseEntity.ok(carrosResponseDTO);
    }
}



