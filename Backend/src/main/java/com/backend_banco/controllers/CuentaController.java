package com.backend_banco.controllers;

import com.backend_banco.models.Cuenta;
import com.backend_banco.services.CuentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cuentas")
public class CuentaController {
    
    @Autowired
    private CuentaService cuentaService;
    
    @GetMapping
    public ResponseEntity<List<Cuenta>> getAllCuentas() {
        return ResponseEntity.ok(cuentaService.getAllCuentas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Cuenta> getCuentaById(@PathVariable Integer id) {
        return ResponseEntity.ok(cuentaService.getCuentaById(id));
    }
    
    @PostMapping
    public ResponseEntity<Cuenta> createCuenta(@RequestBody Cuenta cuenta) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cuentaService.createCuenta(cuenta));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Cuenta> updateCuenta(@PathVariable Integer id, @RequestBody Cuenta cuenta) {
        return ResponseEntity.ok(cuentaService.updateCuenta(id, cuenta));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCuenta(@PathVariable Integer id) {
        cuentaService.deleteCuenta(id);
        return ResponseEntity.noContent().build();
    }
}