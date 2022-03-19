<script lang="ts">
  import { Card, CardBody, CardHeader, Container, Col, Row } from 'sveltestrap';
  import Form from './lib/Form.svelte';
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
</svelte:head>

<main>
  <Container class="form-container">
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <h1>Sprint ICS Generator</h1>
          </CardHeader>
          <CardBody>
            <Form />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
</main>

<style>
  main {
    margin-top: 2rem;
  }
</style>