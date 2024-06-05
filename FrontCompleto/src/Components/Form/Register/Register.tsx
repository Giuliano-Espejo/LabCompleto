import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import "../Form.css";
import { save } from '../../../Service/UsuarioService';
import Usuario from '../../../Entity/usuario';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('VISOR');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: Usuario = {
      nombreUsuario: username,
      clave: password,
      rol: role
    };

    try {
      const response = await save(newUser);
      if (response.status === 200) {
        alert('Registro exitoso');
        localStorage.setItem('usuario', JSON.stringify(newUser));
        navigate('/', {
            replace: true,
            state: {
              logged: true,
              usuario: newUser
            },
          });
        // Opcionalmente redirigir o limpiar el formulario
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Hubo un error al registrar el usuario');
    }
  };

  return (
    <div className='container'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="NombreUsuario">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="clave">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="RolUsuario">
          <Form.Label>Rol</Form.Label>
          <Form.Select
            aria-label="Seleccione un rol"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="OPERADOR">OPERADOR</option>
            <option value="VISOR">VISOR</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Registro
        </Button>
      </Form>
    </div>
  );
}
