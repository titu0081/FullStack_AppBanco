package com.backend_banco.repositories;

import com.backend_banco.models.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Integer> {
    List<Movimiento> findByCuentaIdCuentaOrderByFechaDesc(Integer idCuenta);
}