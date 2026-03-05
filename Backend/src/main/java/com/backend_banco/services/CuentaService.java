package com.backend_banco.services;

import com.backend_banco.models.Cuenta;
import com.backend_banco.repositories.CuentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CuentaService {
    @Autowired
    private CuentaRepository cuentaRepository;

    public List<Cuenta> getAllCuentas() {
        return cuentaRepository.findAll();
    }

    public Cuenta getCuentaById(Integer id) {
        return cuentaRepository.findById(id).orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));
    }
    
    public Cuenta createCuenta(Cuenta cuenta) {
        return cuentaRepository.save(cuenta);
    }

    @Transactional
    public Cuenta updateCuenta(Integer id, Cuenta updatedCuenta) {
        Cuenta cuenta = getCuentaById(id);
        cuenta.setNumeroCuenta(updatedCuenta.getNumeroCuenta());
        cuenta.setTipoCuenta(updatedCuenta.getTipoCuenta());
        cuenta.setSaldoInicial(updatedCuenta.getSaldoInicial());
        cuenta.setEstadoCuenta(updatedCuenta.getEstadoCuenta());
        cuenta.setCliente(updatedCuenta.getCliente());
        return cuentaRepository.save(cuenta);
    }

    @Transactional
    public void deleteCuenta(Integer id) {
        cuentaRepository.deleteById(id);
    }
}
