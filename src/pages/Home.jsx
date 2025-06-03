import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter); 
  const { searchValue } = React.useContext(SearchContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
    window.scrollTo(0, 0);
  }

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://682dc0774fae188947576122.mockapi.io/items?page=${currentPage}&limit=4${category}${search}&sortBy=${sortType.sortProperty}&order=desc`,
      )
      .then((res) => {
        if (res.status === 200) {
          setPizzas(res.data);
        } else if (res.status === 404) {
          setPizzas([]);
        } else {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }
      })
      .catch((error) => console.error('Fetch error:', error))
      .finally(() => setIsLoading(false));

    window.scrollTo(0, 0);
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);
  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id) => onChangeCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все питсы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
