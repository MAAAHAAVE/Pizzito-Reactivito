import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, currentPage, searchValue } = useSelector((state) => state.filter);
  const { pizzas, status } = useSelector((state) => state.pizzas);

  const onChangeCategory = React.useCallback(
    (idx) => {
      dispatch(setCategoryId(idx));
    },
    [dispatch],
  );

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = React.useCallback(async () => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
  }, [categoryId, sortType.sortProperty, searchValue, currentPage, dispatch]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sortType.sortProperty,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage, navigate]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const categoryIdFromUrl = params.categoryId ? Number(params.categoryId) : 0;
      const currentPageFromUrl = params.currentPage ? Number(params.currentPage) : 1;
      const sortObj = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          categoryId: categoryIdFromUrl,
          currentPage: currentPageFromUrl,
          sortType: sortObj || list[0],
        }),
      );
    }
  }, [dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!window.location.search || !isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage, getPizzas]);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">Все питсы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось загрузить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
