const DateFormat = ({ date }) => {
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  
    return formattedDate;
  };
  
  export default DateFormat;
  