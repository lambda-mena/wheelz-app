package com.wheelz.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.wheelz.api.entity.carro.Carros;

public interface CarrosRepository extends JpaRepository<Carros, Long> {
}
