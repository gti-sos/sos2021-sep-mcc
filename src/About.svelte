<script>
    import {
        Button,
        Card,
        CardBody,
        CardFooter,
        CardHeader,
        CardSubtitle,
        CardText,
        CardTitle,
        Col,
        Container,
        Nav,
        NavItem,
        NavLink,
        Row,
    } from "sveltestrap";
</script>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/">Volver a la página principal</NavLink>
        </NavItem>

        <NavItem>
                <NavLink href="/#/info">Info</NavLink>
        </NavItem>

    </Nav>

    <h1>Vídeo</h1>


    <h2>API</h2>
    <Container>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>psychology-stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        > Enlace a Vídeo de la Interfaz de Psicología</CardText
                    >
                   
                    <a href="/#/psychology-stats">
                        <Button color="primary">Enlace a Vídeo</Button>
                    </a>
                    
                </CardBody>
                <CardFooter
                    >realizado por
                    <a href="https://github.com/Mirishya"
                        >Miriam Campano Crespo</a
                    ></CardFooter
                >
            </Card>
        </Col>

       
    </Container>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    h1 {
        color: #0d497e;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>