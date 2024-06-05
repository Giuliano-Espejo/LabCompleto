import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../Form.css";
import { isAuthenticated } from '../../../Service/UsuarioService';
import Usuario from '../../../Entity/usuario';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await isAuthenticated(username, password);
      if (response.isAuthenticated) {
        setLoginStatus(`Login exitoso. Rol: ${response.role}`);

        // Crear un objeto de usuario para almacenar en localStorage
        const usuario: Usuario = {
          nombreUsuario: username,
          clave: password,
          rol: response.role || 'VISOR'  // Asignar 'VISOR' como rol predeterminado si no se proporciona
        };

        // Guardar el usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Redirigir al usuario a otra página
        window.location.href = '/';
      } else {
        setLoginStatus('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al autenticar el usuario:', error);
      setLoginStatus('Hubo un error al intentar iniciar sesión');
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

        <Button variant="primary" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
      {loginStatus && <div className="mt-3">{loginStatus}</div>}
    </div>
  );
}
