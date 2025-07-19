// import React from "react";
// import { Col, Container, Form, Row } from "react-bootstrap";
// import Sidebar from "../Header/Sidebar";

// export const Comprovantes = () => {

// useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         // Substitua por sua API real
//         const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
//         const user = response.data;

//         setFormData({
//           nome: user.name,
//           email: user.email,
//           telefone: user.phone,
//         });
//       } catch (error) {
//         console.error("Erro ao buscar dados do usuário:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Aqui você enviaria os dados atualizados para a API
//     console.log("Dados salvos:", formData);
//     setSalvo(true);
//     setTimeout(() => setSalvo(false), 3000);
//   };

//   if (loading) {
//     return (
//       <Container className="mt-5 text-center">
//         <Spinner animation="border" />
//         <p>Carregando dados...</p>
//       </Container>
//     );
//   }
//   return (
//     <div
//       className="d-flex flex-column align-items-center justify-content-center"
//       style={{ height: "100vh" }}
//     >
//       <Sidebar />
//       <Container fluid className="p-4 flex-grow-1">
//         <Form onSubmit={}>
//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Lable></Form.Lable>
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </Container>
//     </div>
//   );
// };
