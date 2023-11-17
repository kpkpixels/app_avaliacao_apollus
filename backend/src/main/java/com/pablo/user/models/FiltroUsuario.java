package com.pablo.user.models;

import com.pablo.user.models.Usuario.Cargo;

public class FiltroUsuario {
	private String userLogin;
	private Cargo cargo;
	
	public String getUserLogin() {
		return userLogin;
	}
	public void setUserLogin(String usuario) {
		this.userLogin = usuario;
	}
	public Cargo getCargo() {
		return cargo;
	}
	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}
	
}
