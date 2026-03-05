package com.backend_banco.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimientos")
@Data
public class Movimiento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimiento")
    private Integer idMovimiento;
    
    @Column(nullable = false)
    private LocalDateTime fecha;
    
    @ManyToOne
    @JoinColumn(name = "id_cuenta", nullable = false)
    private Cuenta cuenta;
    
    @Column(name = "tipo_movimiento", nullable = false, length = 10)
    private String tipoMovimiento; // "CREDITO" o "DEBITO"
    
    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal valor;
    
    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal saldo;
    
    @PrePersist
    protected void onCreate() {
        fecha = LocalDateTime.now();
    }
}