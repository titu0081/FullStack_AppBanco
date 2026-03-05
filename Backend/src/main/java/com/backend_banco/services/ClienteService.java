package com.backend_banco.services;

import com.backend_banco.models.Cliente;
import com.backend_banco.models.Cuenta;
import com.backend_banco.repositories.ClienteRepository;
import com.backend_banco.repositories.CuentaRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Objects;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private CuentaRepository cuentaRepository;
    
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }
    
    public Cliente getClienteById(Integer id) {
        return clienteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado con id: " + id));
    }
    
    @Transactional
    public Cliente createCliente(Cliente cliente) {
        // Valida que vengan los datos de Persona
        if (cliente.getNombre() == null || cliente.getIdentificacion() == null) {
            throw new RuntimeException("Datos de persona incompletos");
        }
        return clienteRepository.save(cliente);
    }
    
    @Transactional
    public Cliente updateCliente(Integer id, Cliente clienteDetalles) {
        Cliente cliente = getClienteById(id);
        
        // Actualizar campos HEREDADOS de Persona
        cliente.setNombre(clienteDetalles.getNombre());
        cliente.setGenero(clienteDetalles.getGenero());
        cliente.setEdad(clienteDetalles.getEdad());
        cliente.setIdentificacion(clienteDetalles.getIdentificacion());
        cliente.setDireccion(clienteDetalles.getDireccion());
        cliente.setTelefono(clienteDetalles.getTelefono());
        
        // Actualizar campos PROPIOS de Cliente
        cliente.setPassword(clienteDetalles.getPassword());
        cliente.setEstado(clienteDetalles.getEstado());
        
        return clienteRepository.save(cliente);
    }
    
    @Transactional
    public void deleteCliente(Integer id) {
        if (!clienteRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado con id: " + id);
        }

        boolean tieneCuentas = cuentaRepository.findAll().stream()
            .map(Cuenta::getCliente)
            .filter(Objects::nonNull)
            .anyMatch(cliente -> Objects.equals(cliente.getIdPersona(), id));

        if (tieneCuentas) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "No se puede eliminar el cliente porque tiene cuentas asociadas"
            );
        }

        try {
            clienteRepository.deleteById(id);
            clienteRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "No se puede eliminar el cliente por restricciones de integridad",
                e
            );
        }
    }
}