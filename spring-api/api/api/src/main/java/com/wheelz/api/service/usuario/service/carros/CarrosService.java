package com.wheelz.api.service.usuario.service.carros;

import com.wheelz.api.dto.carro.CarrosResponseDTO;
import com.wheelz.api.dto.carro.CarrosSavingRequestDTO;
import com.wheelz.api.dto.carro.CarrosUpdateRequestDTO;
import com.wheelz.api.entity.carro.Carros;
import com.wheelz.api.entity.carro.Categoria;
import com.wheelz.api.entity.carro.TipoTransmision;
import com.wheelz.api.repository.CarrosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarrosService {

    private final CarrosRepository carrosRepository; // Injected through constructor

    public CarrosResponseDTO saveCarros(CarrosSavingRequestDTO carrosSavingRequestDTO) {
        Carros carro = Carros.builder()
                .marca(carrosSavingRequestDTO.getMarca())
                .modelo(carrosSavingRequestDTO.getModelo())
                .placa(carrosSavingRequestDTO.getPlaca())
                .categoria(Categoria.valueOf(carrosSavingRequestDTO.getCategoria().toString()))
                .tipoTransmision(TipoTransmision.valueOf(carrosSavingRequestDTO.getTipoTransmision().toString()))
                .imagenes(carrosSavingRequestDTO.getImagenes())
                .precioDia(carrosSavingRequestDTO.getPrecioDia())
                .disponibilidad(carrosSavingRequestDTO.getDisponibilidad())
                .build();

        Carros savedCarro = carrosRepository.save(carro);
        return mapToResponseDTO(savedCarro);
    }

    public List<CarrosResponseDTO> getAllCarros() {
        List<Carros> carros = carrosRepository.findAll();
        return carros.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }

    public CarrosResponseDTO getCarrosById(Long id) {
        Carros carro = carrosRepository.findById(id).orElseThrow(() -> new RuntimeException("Carro no encontrado"));
        return mapToResponseDTO(carro);
    }

    public CarrosResponseDTO updateCarros(Long id, CarrosUpdateRequestDTO carrosUpdateRequestDTO) {
        Carros carro = carrosRepository.findById(id).orElseThrow(() -> new RuntimeException("Carro no encontrado con id: " + id));
        carro.setModelo(carrosUpdateRequestDTO.getModelo());
        carro.setMarca(carrosUpdateRequestDTO.getMarca());
        carro.setAño(Integer.parseInt(Integer.toString(Integer.parseInt(carrosUpdateRequestDTO.getAño()))));

        if (carrosUpdateRequestDTO.getImagenes() != null) {
            carro.setImagenes(carrosUpdateRequestDTO.getImagenes());
        }

        if (carrosUpdateRequestDTO.getPrecioDia() != null) {
            carro.setPrecioDia(carrosUpdateRequestDTO.getPrecioDia());
        }

        if (carrosUpdateRequestDTO.getDisponibilidad() != null) {
            carro.setDisponibilidad(carrosUpdateRequestDTO.getDisponibilidad());
        }

        Carros updatedCarro = carrosRepository.save(carro);
        return mapToResponseDTO(updatedCarro);
    }

    private CarrosResponseDTO mapToResponseDTO(Carros carro) {
        return CarrosResponseDTO.builder()
                .id(carro.getId())
                .marca(carro.getMarca())
                .modelo(carro.getModelo())
                .categoria(carro.getCategoria().name())
                .tipoTransmision(carro.getTipoTransmision().name())
                .imagenes(carro.getImagenes())
                .precioDia(carro.getPrecioDia())
                .disponibilidad(carro.getDisponibilidad())
                .build();
    }
}





