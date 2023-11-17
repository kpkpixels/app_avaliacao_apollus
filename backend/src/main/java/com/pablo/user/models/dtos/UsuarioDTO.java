package com.pablo.user.models.dtos;

import com.pablo.user.models.Usuario.Cargo;

public record UsuarioDTO (
	Long id,
	String userLogin,
	Cargo cargo) {
}
