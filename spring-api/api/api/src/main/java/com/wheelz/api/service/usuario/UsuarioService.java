package com.wheelz.api.service.usuario;

import com.wheelz.api.dto.usuario.LoginRequestDTO;
import com.wheelz.api.dto.usuario.UsuarioResponse;
import com.wheelz.api.dto.usuario.UsuarioSavingRequest;
import com.wheelz.api.dto.usuario.UsuarioUpdateRequest;
import com.wheelz.api.entity.usuario.Usuario;
import com.wheelz.api.exception.RequestException;
import com.wheelz.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    @Lazy
    private final UsuarioMapper usuarioMapper;


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
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new RequestException("Usuario no encontrado.!"));
        return usuarioMapper.toUsuarioResponse(usuario);
    }

    public UsuarioResponse save(UsuarioSavingRequest usuarioSavingRequest) {
        verificacionDatosRepetidos(usuarioSavingRequest);

        Usuario usuario = usuarioMapper.usuarioRequestToPost(usuarioSavingRequest);
        usuario.setActive(true);

        try {
            return usuarioMapper.toUsuarioResponse(usuarioRepository.save(usuario));
        } catch (Exception e) {
            throw new RequestException("Error al guardar el usuario: " + e.getMessage());
        }
    }
    public void verificacionDatosRepetidos(UsuarioSavingRequest usuarioSavingRequest){
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(usuarioSavingRequest.getEmail());
        if (usuarioOptional.isPresent()) {
            throw new RequestException("Email repetido!");
        }
        Optional<Usuario> usuarioByDocumento = usuarioRepository.findByDocumento(usuarioSavingRequest.getDocumento());
        if (usuarioByDocumento.isPresent()) {
            throw new RequestException("Documento repetido!");
        }
    }

    public UsuarioResponse update(Long id, UsuarioUpdateRequest usuarioUpdate) throws BadRequestException {
        if (id == null || id <= 0){
            throw new BadRequestException("ID de usuario invalido");
        }
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El ID del usuario no existe.!!!"));

        String nombre = usuarioUpdate.getNombre();
        validarNullVacio(nombre,"El nombre");
        validarCaracteresEspeciales(nombre,"El nombre");
        String apellido = usuarioUpdate.getApellido();
        validarNullVacio(apellido,"El apellido");
        validarCaracteresEspeciales(apellido,"El apellido");
        String email = usuarioUpdate.getEmail();
        validarNullVacio(email,"El email");
        Long documento = usuarioUpdate.getDocumento();
        if (documento == null || documento == 0) {
            throw new BadRequestException("Documento no puede ser ni nulo ni 0.");
        }
         usuarioUpdate.setNombre(nombre);
         usuarioUpdate.setApellido(apellido);
         usuarioUpdate.setEmail(email);
         usuarioUpdate.setDocumento(documento);

        Boolean isActive = usuarioUpdate.isActive();
        if (isActive != null) {
            usuario.setActive(isActive);
        }

        return usuarioMapper.toUsuarioResponse(usuarioRepository.save(usuario));
    }
    public static void validarNullVacio(String field, String fieldName) throws BadRequestException {
        if (field == null || field.isEmpty()) {
            throw new BadRequestException(fieldName + " no puede estar vacío.");
        }
    }
    public static void validarCaracteresEspeciales(String field, String fieldName) {
        if (field.matches(".*[!@#$%^&*()_+=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
            throw new RequestException(fieldName + " no debe contener caracteres especiales.");
        }
    }

    public void desactivar(Long id){
        if (id == null || id <= 0) {
            throw new RequestException("El ID es invalido o inexistente.");
        }
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if (!usuarioOptional.isPresent()) {
            throw new RequestException("No se encontro ningun usuario con el id : " + id);
        }
        Usuario usuario = usuarioOptional.get();
        if (!usuario.isActive()) {
            throw new RequestException("El usuario ya está desactivado.");
        }
        usuario.setActive(false);
        usuarioRepository.save(usuario);
    }

}
