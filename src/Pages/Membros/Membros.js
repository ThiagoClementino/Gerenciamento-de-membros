import React, { useContext, useState } from "react";
import Header from "../Header/Sidebar";
import DataInfor from "../../Contexts/DataInfor";
import Footer from "../Footer/Footer";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const Membros = () => {
  const { dados } = useContext(DataInfor);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toLowerSafe = (value) =>
    typeof value === "string" ? value.toLowerCase() : "";

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectAll(false);
  };

  const filteredDados = dados.filter((dado) => {
    const lowerSearchTerm = toLowerSafe(searchTerm);
    return (
      toLowerSafe(dado._id).includes(lowerSearchTerm) ||
      toLowerSafe(dado.name).includes(lowerSearchTerm) ||
      toLowerSafe(dado.email).includes(lowerSearchTerm) ||
      toLowerSafe(dado.mothersname).includes(lowerSearchTerm) ||
      toLowerSafe(dado.fathersname).includes(lowerSearchTerm) ||
      toLowerSafe(dado.dateBirth).includes(lowerSearchTerm) ||
      toLowerSafe(dado.profession).includes(lowerSearchTerm) ||
      toLowerSafe(dado.companywork).includes(lowerSearchTerm) ||
      toLowerSafe(dado.nomefilhoum).includes(lowerSearchTerm) ||
      toLowerSafe(dado.nomefilhodois).includes(lowerSearchTerm) ||
      toLowerSafe(dado.nomefilhotres).includes(lowerSearchTerm) ||
      toLowerSafe(dado.nomefilhoquatro).includes(lowerSearchTerm) ||
      toLowerSafe(dado.databatismo).includes(lowerSearchTerm)
    );
  });

  const handleDeleteItems = async () => {
    if (selectedItems.length === 0) {
      alert("Selecione ao menos um item para excluir!");
      return;
    }

    const confirmation = window.confirm(
      `Tem certeza de que deseja excluir ${selectedItems.length} ${
        selectedItems.length > 1 ? "itens" : "item"
      }?`
    );

    if (confirmation) {
      try {
        await Promise.all(
          selectedItems.map(async (id) => {
            await axios.delete(
              `https://api-gestao-igreja-jcod.vercel.app/membros/${id}`
            );
          })
        );
        alert("Itens excluídos com sucesso!");
        window.location.reload();
      } catch (error) {
        console.error("Erro ao excluir itens:", error);
        alert("Erro ao excluir itens. Verifique o console para mais detalhes.");
      }
    }
  };

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((dadoid) => dadoid !== id));
    }
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      setSelectedItems(filteredDados.map((dado) => dado._id));
    } else {
      setSelectedItems([]);
    }
  };

  const formatDateToExport = () => {
    const data = new Date();
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar fixa */}
      <Header />

      {/* Área de conteúdo principal */}
      <div className="flex-grow-1 d-flex flex-column">
        <Container fluid className="flex-grow-1 d-flex flex-column py-3 px-4">
          <Row className="mb-4">
            <Col>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                <div>
                  <h1 className="h3 mb-1 text-primary-custom fw-bold">
                    Relação de Membros
                  </h1>
                  <p className="text-muted-custom mb-0">Membros cadastrados</p>
                </div>
                <Form.Control
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Buscar..."
                  style={{ maxWidth: "300px" }}
                />
                <div className="d-flex gap-2">
                  <Button variant="danger" onClick={handleDeleteItems}>
                    Excluir
                  </Button>
                  <Button variant="primary">
                    <CSVLink
                      data={dados}
                      target="_blank"
                      filename={`Table Members ${formatDateToExport()}`}
                      className="text-white text-decoration-none"
                    >
                      Exportar <FontAwesomeIcon icon={faDownload} />
                    </CSVLink>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Tabela dentro de card com rolagem */}
          {/* Tabela dentro de card com rolagem */}
          <Card className="mt-4 shadow-sm flex-grow-1 d-flex flex-column">
            <Card.Header className="bg-secondary-custom flex-shrink-0">
              <h4 className="mb-0 fw-semibold">Lista de Membros</h4>
            </Card.Header>
            <Card.Body className="p-0 flex-grow-1">
              <div className="overflow-auto" style={{ maxHeight: "70vh" }}>
                <Table striped bordered hover responsive className="mb-0">
                  <thead className="sticky-top bg-light text-center">
                    <tr>
                      <th>
                        <Form.Check
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                        />
                      </th>
                      <th>Visualizar</th>
                      <th>Matrícula</th>
                      <th>Data de inscrição</th>
                      <th>Nome</th>
                      <th>Nome da Mãe</th>
                      <th>Nome do Pai</th>
                      <th>Data Nasc.</th>
                      <th>Sexo</th>
                      <th>Telefone</th>
                      <th>Telefone 2</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-custom align-middle text-center">
                    {filteredDados.map((dado) => (
                      <tr key={dado._id} className="align-middle">
                        <td>
                          <Form.Check
                            type="checkbox"
                            checked={selectedItems.includes(dado._id)}
                            onChange={(event) =>
                              handleCheckboxChange(event, dado._id)
                            }
                          />
                        </td>
                        <td className="align-middle text-center">
                          <Button variant="secondary" size="sm">
                            <Link
                              to={`/membro/${dado._id}`}
                              className="text-black text-decoration-none"
                            >
                              Detalhes
                            </Link>
                          </Button>
                        </td>
                        <td>{dado._id}</td>
                        <td>{dado.datacriacao}</td>
                        <td>{dado.name}</td>
                        <td>{dado.mothersname}</td>
                        <td>{dado.fathersname}</td>
                        <td>{dado.dateBirth}</td>
                        <td>{dado.sex}</td>
                        <td>{dado.telone}</td>
                        <td>{dado.teltwo}</td>
                        <td>{dado.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Container>

        <Col
          className="footer-container d-flex justify-content-center align-items-center border-top"
          style={{ flex: "0 0 5vh" }}
        >
          <Footer />
        </Col>
      </div>
    </div>
  );
};

export default Membros;
