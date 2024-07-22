import { Field, Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Не розумію що шукати!');

const SearchBar = ({ onSubmit }) => {
  const initalValues = {
    query: '',
  };

  const handleSubmit = values => {
    console.log(values);
    if (values.query.trim() === '') {
      notify();
      return;
    }
    onSubmit(values.query);
  };

  return (
    <div>
      <Formik initialValues={initalValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
          <Toaster />
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
