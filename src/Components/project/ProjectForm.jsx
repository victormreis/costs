const ProjectForm = () => {
  return (
    <form>
      <div>
        <input
          type='text'
          name=''
          id=''
          placeholder='Insira o nome do projeto'
        />
      </div>
      <div>
        <input
          type='number'
          name=''
          id=''
          placeholder='Insira o orçamento total do projeto'
        />
      </div>
      <div>
        <select name='category_id' id=''>
          <option disabled>Selecione a categoria</option>
        </select>
      </div>
      <div>
        <input type='submit' value='Criar projeto' />
      </div>
    </form>
  );
};

export default ProjectForm;
