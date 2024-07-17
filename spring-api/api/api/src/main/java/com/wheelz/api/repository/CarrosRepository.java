package com.wheelz.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.wheelz.api.entity.carro.Carros;

public interface CarrosRepository extends JpaRepository<Carros, Long> {
}
