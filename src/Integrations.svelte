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
                <NavLink href="/info">Info</NavLink>
        </NavItem>

    </Nav>

    <h1>Integraciones</h1>


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
                        >Datos estadísticos por comunidad autónoma en España sobre la media de personas que acuden al Psicólogo.</CardText
                    >
                    <a
                        href="https://sos2021-sep-mcc.herokuapp.com/api/v2/psychology-stats"
                    >
                        <Button color="primary">API (v2)</Button></a
                    >
                    <a href="/#/psychology-stats">
                        <Button color="primary">Psicología</Button>
                    </a>
                    <a
                        href="https://documenter.getpostman.com/view/14948136/TzzGJEJK"
                        ><Button color="info">Postman v2</Button></a
                    >
                    <a href="/#/integrations/suicide">
                        <Button color="secondary">Integración 1</Button>
                    </a>
                    <a href="/#/integrations/rentals">
                        <Button color="secondary">Integración 2</Button>
                    </a>
                    <a href="/#/integrations/obesity">
                        <Button color="secondary">Integración 3</Button>
                    </a>
                    <a href="/#/integrations/games">
                        <Button color="secondary">Integración 4</Button>
                    </a>
                    <a href="/#/integrations/covid">
                        <Button color="danger">Integración Externa 1</Button>
                    </a>
                    <a href="/#/integrations/region">
                        <Button color="danger">Integración Externa 2</Button>
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