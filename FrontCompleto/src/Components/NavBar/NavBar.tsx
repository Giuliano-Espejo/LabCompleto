import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";

export const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const usuario = localStorage.getItem('usuario');

  useEffect(() => {
    setIsAuthenticated(!!usuario);
  }, [localStorage.getItem('usuario')]);


  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setIsAuthenticated(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Instrumentos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {
              usuario ?
                (JSON.parse(usuario).rol == "ADMIN") ? <><Nav.Link href="/abm/0">Agregar</Nav.Link> <Nav.Link href="/stats" > Estadisticas </Nav.Link></> : null
                : null
            }
            {
              usuario ?
                (JSON.parse(usuario).rol == "ADMIN" || JSON.parse(usuario).rol == "OPERADOR") ? <Nav.Link href="/lista">Lista</Nav.Link> : null
                : null
            }
            <Nav.Link href="/DondeEstamos">Donde Estamos</Nav.Link>
          </Nav>
          <div className="ml-auto d-flex">
            {isAuthenticated ? (
              <Button variant="outline-danger" onClick={handleLogout} href="/login">Logout</Button>
            ) : (
              <>
                <Button variant="outline-primary" className="me-2" href="/login">Login</Button>
                <Button variant="primary" href="/register">Registro</Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
