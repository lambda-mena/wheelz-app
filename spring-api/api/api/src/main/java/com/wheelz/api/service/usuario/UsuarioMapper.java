package com.wheelz.api.service.usuario;

import com.wheelz.api.dto.usuario.UsuarioResponse;
import com.wheelz.api.dto.usuario.UsuarioSavingRequest;
import com.wheelz.api.entity.usuario.Usuario;
import org.springframework.stereotype.Service;

@Service
public class UsuarioMapper {
    public UsuarioResponse toUsuarioResponse(Usuario usuario){
        if(usuario == null){
            throw new NullPointerException("Usuario no puede ser nulo!");
        }
        return UsuarioResponse.builder()
                .id(usuario.getId())
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getEmail())
                .contraseña(usuario.getContraseña())
                .documento(usuario.getDocumento())
                .tipoUsuario(usuario.getTipoUsuario())
                .build();
    }

    public Usuario usuarioRequestToPost(UsuarioSavingRequest usuario){
        if (usuario == null){
            throw new NullPointerException("Usuario no puede ser nulo!!!");
        }
        return Usuario.builder()
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getEmail())
                .contraseña(usuario.getContraseña())
                .documento(usuario.getDocumento())
                .tipoUsuario(usuario.getTipoUsuario())
                .build();
    }
}
