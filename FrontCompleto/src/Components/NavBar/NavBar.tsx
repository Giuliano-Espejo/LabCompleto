import { Container, Nav, Navbar } from "react-bootstrap"

export const NavBar = () => {

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Instrumentos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/abm/0">Agregar</Nav.Link>
            <Nav.Link href="/lista">Lista</Nav.Link>
            <Nav.Link href="/DondeEstamos">Donde Estamos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
