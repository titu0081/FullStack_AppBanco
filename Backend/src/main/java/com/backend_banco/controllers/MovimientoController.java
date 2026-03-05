package com.backend_banco.controllers;

import com.backend_banco.models.Movimiento;
import com.backend_banco.services.MovimientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/movimientos")
public class MovimientoController {
    
    @Autowired
    private MovimientoService movimientoService;
    
    @GetMapping
    public ResponseEntity<List<Movimiento>> getAllgetAllMovimientos() {
        return ResponseEntity.ok(movimientoService.getAllMovimientos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Movimiento> getMovimientoById(@PathVariable Integer id) {
        return ResponseEntity.ok(movimientoService.getMovimientoById(id));
    }
    
    @GetMapping("/cuenta/{idCuenta}")
    public ResponseEntity<List<Movimiento>> getMovimientosByCuenta(@PathVariable Integer idCuenta) {
        return ResponseEntity.ok(movimientoService.getMovimientosByCuenta(idCuenta));
    }
    
    @PostMapping
    public ResponseEntity<?> createMovimiento(@RequestBody Movimiento movimiento) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(movimientoService.createMovimiento(movimiento));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovimiento(@PathVariable Integer id) {
        movimientoService.deleteMovimiento(id);
        return ResponseEntity.noContent().build();
    }
}