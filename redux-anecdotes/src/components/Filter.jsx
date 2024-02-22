import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = () => {
  const style = {
    marginBottom: 10
  };
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(filterChange(e.target.value));
  };


  return (
    <div style={style}>
      filter
      <input
        type='text'
        name='filter'
        onChange={handleChange} />
    </div>
  );
};

export default Filter;
