package com.pablo.user.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import com.pablo.user.models.Usuario;
import com.pablo.user.models.Usuario.Cargo;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	@Query("SELECT u FROM Usuario u ORDER BY u.id DESC")
    List<Usuario> findAllOrderedById();
	
	@Query("SELECT u FROM Usuario u WHERE (:userLogin IS NULL OR LOWER(u.userLogin) LIKE LOWER(CONCAT('%', :userLogin, '%'))) AND (:cargo IS NULL OR u.cargo = :cargo OR u.cargo IS NULL)")
	List<Usuario> findByUserLoginAndCargo(@Param("userLogin") String userLogin, @Param("cargo") Cargo cargo);
		
	@Query("SELECT u FROM Usuario u WHERE (:userLogin IS NULL OR LOWER(u.userLogin) = LOWER(CONCAT('%', :userLogin, '%'))) AND (:id IS NULL OR u.id != :id OR u.id IS NULL)")
	Usuario findUsuarioByUserLogin(@Param("userLogin") String userLogin, @Param("id") Long id);
	
	UserDetails findByUserLogin(String userLogin);	
}
