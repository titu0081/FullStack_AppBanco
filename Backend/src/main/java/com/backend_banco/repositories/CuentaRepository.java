package com.backend_banco.repositories;
import com.backend_banco.models.Cuenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CuentaRepository extends JpaRepository<Cuenta, Integer> {
}
