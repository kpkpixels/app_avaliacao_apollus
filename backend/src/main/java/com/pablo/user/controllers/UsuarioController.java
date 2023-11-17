package com.pablo.user.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pablo.user.models.FiltroUsuario;
import com.pablo.user.models.PerfilUsuario;
import com.pablo.user.models.Usuario;
import com.pablo.user.models.dtos.UsuarioDTO;
import com.pablo.user.repositories.UsuarioRepository;

@RestController
@RequestMapping(value = "/api")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository repository;
	@Autowired
	private PasswordEncoder encoder;
	
	@GetMapping("/usuarios")
	public List<UsuarioDTO> getAll(){
		List<Usuario> resultado = repository.findAllOrderedById();		
		List<UsuarioDTO> dtos = new ArrayList<>(resultado.size());
		
		for (Usuario usuario : resultado) {
			dtos.add(new UsuarioDTO(usuario.getId(), usuario.getUserLogin(), usuario.getCargo()));
		}	
		
		return dtos;
	}
	
	@GetMapping("/usuario/{id}")
    public ResponseEntity<UsuarioDTO> getById(@PathVariable Long id) {
        try {
            Usuario resultado = repository.findById(id).orElseThrow();

            if (resultado != null) {
                UsuarioDTO usuarioDto = new UsuarioDTO(resultado.getId(), resultado.getUserLogin(), resultado.getCargo());
                return new ResponseEntity<>(usuarioDto, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	
	@PostMapping("/usuario")
	public ResponseEntity<?> post(@RequestBody Usuario usuario) {
		usuario.setSenha(encoder.encode(usuario.getSenha()));
		
		if (repository.findUsuarioByUserLogin(usuario.getUserLogin(), usuario.getId()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já cadastrado.");
        }
		
		Usuario resultado = repository.save(usuario);		
		return ResponseEntity.ok(resultado);
	}
	
	@DeleteMapping("/usuario")
	public void delete(@RequestBody Usuario usuario) {
		repository.delete(usuario);
	}
	@DeleteMapping("/usuario/{id}")
	public void deleteById(@PathVariable Long id) {
		repository.deleteById(id);
	}
	
	@PutMapping("/usuario")
    public ResponseEntity<?> update(@RequestBody Usuario usuario) {
		if (usuario.getSenha() == "") {
			Usuario u = repository.findById(usuario.getId()).get();
			usuario.setSenha(u.getSenha());
		}
		else {
			usuario.setSenha(encoder.encode(usuario.getSenha()));			
		}

        if (repository.findUsuarioByUserLogin(usuario.getUserLogin(), usuario.getId()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já cadastrado.");
        }

        Usuario resultado = repository.save(usuario);
        return ResponseEntity.ok(resultado);
    }
	@PutMapping("/usuario/atualizaSenha")
    public ResponseEntity<?> atualizaSenha(@RequestBody PerfilUsuario perfil) {		
		Usuario usuario = repository.findById(perfil.getId()).get();
		usuario.setSenha(encoder.encode(perfil.getSenha()));					

        Usuario resultado = repository.save(usuario);
        return ResponseEntity.ok(resultado);
    }
	
	@PostMapping("/usuario/buscaPersonalizada")
    public ResponseEntity<List<UsuarioDTO>> buscaPersonalizada(@RequestBody FiltroUsuario filtroUsuario) {
        try {
            List<Usuario> resultado = repository.findByUserLoginAndCargo(
                    filtroUsuario.getUserLogin(), filtroUsuario.getCargo());

            if (resultado != null && !resultado.isEmpty()) {
                List<UsuarioDTO> dtos = new ArrayList<>(resultado.size());
                for (Usuario usuario : resultado) {
                    dtos.add(new UsuarioDTO(usuario.getId(), usuario.getUserLogin(), usuario.getCargo()));
                }
                return new ResponseEntity<>(dtos, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(List.of(), HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
