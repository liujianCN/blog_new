import { storeActions } from '@/store/thunk';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Example = () => {
  const dispatch = useDispatch();
  const [x, setX] = useState(0);
  useEffect(() => {
    dispatch(storeActions.example.reducers.save({ x: 1 }));
    console.log(x);
  }, [dispatch, x]);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          // dispatch(storeActions.draft.effects.getBlogDetail({ id: '5fe98195a0023c0a5369d9cd' }));
          console.log(storeActions.example.reducers.save({ x: 1 }));
          console.log(storeActions.draft.reducers.save({ title: '' }));
          console.log(
            storeActions.common.reducers.save<{
              headerIntersect: boolean;
            }>({ headerIntersect: true })
          );
        }}
      >
        fetchUser
      </button>
      <button
        type="button"
        onClick={() => {
          setX((s) => s + 1);
          // console.log(dispatch({ type: 'x', x: 456 }));
        }}
      >
        click x {x}
      </button>
      <button
        type="button"
        onClick={() => {
          // dispatch(actions.a.reducers.save());
        }}
      >
        action
      </button>
      <button
        type="button"
        onClick={() => {
          // dispatch(actions.global.reducers.save({ name: '123' }));
        }}
      >
        action
      </button>
      <br />
      <button
        type="button"
        onClick={() => {
          // dispatch(actions.global.reducers.save({ name: '123' }));
          // dispatch(aActions.effects.fetchUser({ id: 'cx' })).then((res) => {
          //   console.log(res);
          // });
        }}
      >
        action
      </button>
    </div>
  );
};
export default Example;
