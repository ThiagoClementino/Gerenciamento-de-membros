import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Badge } from 'react-bootstrap';

/**
 * Componente para exibir membros em formato de cards no mobile
 * Usado quando a tabela não é adequada para telas pequenas
 */
const MobileCardsView = ({ 
  filteredDados, 
  selectedItems, 
  handleCheckboxChange 
}) => {
  
  // Função para truncar texto longo
  const truncateText = (text, maxLength = 30) => {
    if (!text) return '-';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="mobile-cards">
      {filteredDados.length === 0 ? (
        <div className="text-center py-5">
          <div className="text-muted-custom">
            <i className="bi bi-inbox display-6 d-block mb-3 opacity-50"></i>
            <h6 className="text-secondary-custom">
              Nenhum membro encontrado
            </h6>
            <p className="small mb-0">
              Tente ajustar os filtros de busca
            </p>
          </div>
        </div>
      ) : (
        filteredDados.map((dado) => (
          <div 
            key={dado._id} 
            className={`mobile-card ${selectedItems.includes(dado._id) ? 'selected' : ''}`}
          >
            {/* Header do Card */}
            <div className="mobile-card-header">
              <div className="mobile-card-title">
                {truncateText(dado.name, 25)}
              </div>
              <div className="mobile-card-id">
                #{dado._id.slice(-6)}
              </div>
            </div>

            {/* Corpo do Card */}
            <div className="mobile-card-body">
              <div className="mobile-card-field">
                <div className="mobile-card-label">
                  <i className="bi bi-envelope me-1"></i>
                  Email
                </div>
                <div className="mobile-card-value">
                  {truncateText(dado.email, 25)}
                </div>
              </div>

              <div className="mobile-card-field">
                <div className="mobile-card-label">
                  <i className="bi bi-telephone me-1"></i>
                  Telefone
                </div>
                <div className="mobile-card-value">
                  {dado.telone || '-'}
                </div>
              </div>

              <div className="mobile-card-field">
                <div className="mobile-card-label">
                  <i className="bi bi-calendar-date me-1"></i>
                  Nascimento
                </div>
                <div className="mobile-card-value">
                  {formatDate(dado.dateBirth)}
                </div>
              </div>

              <div className="mobile-card-field">
                <div className="mobile-card-label">
                  <i className="bi bi-briefcase me-1"></i>
                  Profissão
                </div>
                <div className="mobile-card-value">
                  {truncateText(dado.profession, 20)}
                </div>
              </div>

              <div className="mobile-card-field">
                <div className="mobile-card-label">
                  <i className="bi bi-geo-alt me-1"></i>
                  Cidade
                </div>
                <div className="mobile-card-value">
                  {truncateText(dado.city, 20)}
                </div>
              </div>

              <div className="mobile-card-field">
                <div className="mobile-card-label">
                  <i className="bi bi-droplet me-1"></i>
                  Batismo
                </div>
                <div className="mobile-card-value">
                  {dado.databatismo ? (
                    <Badge bg="success" className="small">
                      <i className="bi bi-check-circle me-1"></i>
                      {formatDate(dado.databatismo)}
                    </Badge>
                  ) : (
                    <Badge bg="secondary" className="small">
                      <i className="bi bi-clock me-1"></i>
                      Pendente
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Informações adicionais (colapsáveis) */}
            <div className="mobile-card-extra">
              <div className="mobile-card-body">
                <div className="mobile-card-field">
                  <div className="mobile-card-label">
                    <i className="bi bi-person me-1"></i>
                    Mãe
                  </div>
                  <div className="mobile-card-value">
                    {truncateText(dado.mothersname, 25)}
                  </div>
                </div>

                <div className="mobile-card-field">
                  <div className="mobile-card-label">
                    <i className="bi bi-person me-1"></i>
                    Pai
                  </div>
                  <div className="mobile-card-value">
                    {truncateText(dado.fathersname, 25)}
                  </div>
                </div>

                <div className="mobile-card-field">
                  <div className="mobile-card-label">
                    <i className="bi bi-building me-1"></i>
                    Empresa
                  </div>
                  <div className="mobile-card-value">
                    {truncateText(dado.companywork, 25)}
                  </div>
                </div>

                <div className="mobile-card-field">
                  <div className="mobile-card-label">
                    <i className="bi bi-mortarboard me-1"></i>
                    Escolaridade
                  </div>
                  <div className="mobile-card-value">
                    {truncateText(dado.education, 20)}
                  </div>
                </div>

                <div className="mobile-card-field">
                  <div className="mobile-card-label">
                    <i className="bi bi-heart me-1"></i>
                    Estado Civil
                  </div>
                  <div className="mobile-card-value">
                    {dado.estadocivil || '-'}
                  </div>
                </div>

                <div className="mobile-card-field">
                  <div className="mobile-card-label">
                    <i className="bi bi-calendar-plus me-1"></i>
                    Inscrição
                  </div>
                  <div className="mobile-card-value">
                    {formatDate(dado.datacriacao)}
                  </div>
                </div>
              </div>
            </div>

            {/* Ações do Card */}
            <div className="mobile-card-actions">
              <div className="mobile-card-checkbox">
                <Form.Check
                  type="checkbox"
                  id={`mobile-check-${dado._id}`}
                  checked={selectedItems.includes(dado._id)}
                  onChange={(event) => handleCheckboxChange(event, dado._id)}
                  size="sm"
                />
                <label htmlFor={`mobile-check-${dado._id}`}>
                  Selecionar
                </label>
              </div>

              <Button
                as={Link}
                to={`/membro/${dado._id}`}
                variant="outline-primary"
                size="sm"
                className="text-decoration-none"
              >
                <i className="bi bi-eye me-1"></i>
                Ver Detalhes
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MobileCardsView;

