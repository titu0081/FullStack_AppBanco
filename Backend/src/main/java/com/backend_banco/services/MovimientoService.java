package com.backend_banco.services;

import com.backend_banco.models.Cuenta;
import com.backend_banco.models.Movimiento;
import com.backend_banco.repositories.CuentaRepository;
import com.backend_banco.repositories.MovimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
public class MovimientoService {
    
    @Autowired
    private MovimientoRepository movimientoRepository;
    
    @Autowired
    private CuentaRepository cuentaRepository;
    
    public List<Movimiento> getAllMovimientos() {
        List<Movimiento> movimientos = movimientoRepository.findAll();
        movimientos.forEach(this::setSaldoActual);
        return movimientos;
    }
    
    public Movimiento getMovimientoById(Integer id) {
        Movimiento movimiento = movimientoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Movimiento no encontrado"));
        setSaldoActual(movimiento);
        return movimiento;
    }
    
    public List<Movimiento> getMovimientosByCuenta(Integer idCuenta) {
        List<Movimiento> movimientos = movimientoRepository.findByCuentaIdCuentaOrderByFechaDesc(idCuenta);
        movimientos.forEach(this::setSaldoActual);
        return movimientos;
    }
    
    @Transactional
    public Movimiento createMovimiento(Movimiento movimiento) {
        Cuenta cuenta = cuentaRepository.findById(movimiento.getCuenta().getIdCuenta())
            .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));
        
        // Calcular saldo actual
        BigDecimal saldoActual = calculateSaldoActual(cuenta.getIdCuenta());
        if (saldoActual == null) {
            saldoActual = cuenta.getSaldoInicial();
        }
        
        BigDecimal valor = movimiento.getValor();
        String tipo = movimiento.getTipoMovimiento().toUpperCase();
        
        // Validar débito
        if (tipo.equals("DEBITO")) {
            if (valor.compareTo(saldoActual) > 0) {
                throw new RuntimeException("Saldo no disponible");
            }
            movimiento.setSaldo(saldoActual.subtract(valor));
        } else if (tipo.equals("CREDITO")) {
            movimiento.setSaldo(saldoActual.add(valor));
        } else {
            throw new RuntimeException("Tipo de movimiento inválido");
        }
        
        movimiento.setCuenta(cuenta);
        Movimiento saved = movimientoRepository.save(movimiento);
        setSaldoActual(saved);
        return saved;
    }

       @Transactional
    public Movimiento updateMovimiento(Integer id, Movimiento movimientoActualizado) {
        Movimiento movimiento = getMovimientoById(id);

        Integer idCuenta = movimientoActualizado.getCuenta() != null
            ? movimientoActualizado.getCuenta().getIdCuenta()
            : movimiento.getCuenta().getIdCuenta();

        Cuenta cuenta = cuentaRepository.findById(idCuenta)
            .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        BigDecimal saldoActual = calculateSaldoActual(cuenta.getIdCuenta());
        if (saldoActual == null) {
            saldoActual = cuenta.getSaldoInicial();
        }

        BigDecimal valor = movimientoActualizado.getValor();
        String tipo = movimientoActualizado.getTipoMovimiento().toUpperCase();

        if (tipo.equals("DEBITO")) {
            if (valor.compareTo(saldoActual) > 0) {
                throw new RuntimeException("Saldo no disponible");
            }
            movimiento.setSaldo(saldoActual.subtract(valor));
        } else if (tipo.equals("CREDITO")) {
            movimiento.setSaldo(saldoActual.add(valor));
        } else {
            throw new RuntimeException("Tipo de movimiento inválido");
        }

        movimiento.setCuenta(cuenta);
        movimiento.setTipoMovimiento(tipo);
        movimiento.setValor(valor);
        Movimiento saved = movimientoRepository.save(movimiento);
        setSaldoActual(saved);
        return saved;
    }

    private void setSaldoActual(Movimiento movimiento) {
        if (movimiento == null || movimiento.getCuenta() == null || movimiento.getCuenta().getIdCuenta() == null) {
            return;
        }

        BigDecimal saldoActual = calculateSaldoActual(movimiento.getCuenta().getIdCuenta());
        if (saldoActual == null) {
            saldoActual = movimiento.getCuenta().getSaldoInicial();
        }
        movimiento.getCuenta().setSaldoActual(saldoActual);
    }
    
    private BigDecimal calculateSaldoActual(Integer idCuenta) {
        List<Movimiento> movimientos = movimientoRepository.findByCuentaIdCuentaOrderByFechaDesc(idCuenta);
        if (movimientos.isEmpty()) {
            return null;
        }
        return movimientos.get(0).getSaldo();
    }
    
    @Transactional
    public void deleteMovimiento(Integer id) {
        movimientoRepository.deleteById(id);
    }
}
