package com.wheelz.api.service.usuario;

import com.wheelz.api.dto.usuario.LoginRequestDTO;
import com.wheelz.api.dto.usuario.UsuarioResponse;
import com.wheelz.api.dto.usuario.UsuarioSavingRequest;
import com.wheelz.api.entity.usuario.Usuario;
import com.wheelz.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    @Lazy
    private UsuarioRepository usuarioRepository;
    @Lazy
    private UsuarioMapper usuarioMapper;
    public Usuario login(LoginRequestDTO loginRequestDTO) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(loginRequestDTO.getEmail());
        if (optionalUsuario.isPresent()){
            Usuario usuario = optionalUsuario.get();
            if (usuario.getContraseña().equals(loginRequestDTO.getContraseña())){
                return usuario;
            }
            else {
                throw new IllegalArgumentException("Contraseña invalida!!!");
            }
        }
        throw new IllegalArgumentException("Email incorrecto!!!");
    }

    public List<UsuarioResponse> findByAll() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarioRepository.findAll().stream()
                .map(usuarioMapper::toUsuarioResponse).toList();
    }

    public UsuarioResponse findByUsuarioId(Long id) {
        if (id == null|| id == 0){
            throw new RuntimeException("Id invalido!!!");
        }
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado.!"));
        return usuarioMapper.toUsuarioResponse(usuario);
    }

    public UsuarioResponse save(UsuarioSavingRequest usuarioSavingRequest) {
        //verificacionDatosRepetidos(usuarioSavingRequest);

        Usuario usuario = usuarioMapper.usuarioRequestToPost(usuarioSavingRequest);
        try {
            return usuarioMapper.toUsuarioResponse(usuarioRepository.save(usuario));
        } catch (Exception e) {
            throw new RuntimeException("Error al guardar el usuario: " + e.getMessage());
        }
    }
    public void verificacionDatosRepetidos(UsuarioSavingRequest usuarioSavingRequest){
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(usuarioSavingRequest.getEmail());
        if (usuarioOptional.isPresent()) {
            throw new RuntimeException("Email repetido!");
        }
        Optional<Usuario> usuarioByDocumento = usuarioRepository.findByDocumento(usuarioSavingRequest.getDocumento());
        if (usuarioByDocumento.isPresent()) {
            throw new RuntimeException("Documento repetido!");
        }
    }
}
