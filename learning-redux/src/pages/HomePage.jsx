import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewHobby, setActiveHobby } from '../actions/hobby';
import HobbyList from '../components/Home/HobbyList';

HomePage.propTypes = {

};

const randomNumber = () => {
  return 1000 + Math.trunc((Math.random() * 9000));
}

function HomePage(props) {
  // Get hobby list from redux
  const hobbyList = useSelector(state => state.hobby.list);
  const activeId = useSelector(state => state.hobby.activeId);
  const dispatch = useDispatch();

  const handleAddHobbyClick = (hooby) => {
    // Random hobby object: id + title
    const newId = randomNumber();
    const newHobby = {
      id: newId,
      title: `New Hobby ${newId}`
    }

    // Dispatch action to add a new hobby to redux store
    const action = addNewHobby(newHobby);
    dispatch(action);
  }

  const handleHobbyClick = (hobby) => {
    const action = setActiveHobby(hobby);
    dispatch(action);
  }

  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <button onClick={handleAddHobbyClick}>Random Hobby</button>
      <HobbyList
        hobbyList={hobbyList}
        activeId={activeId}
        onHobbyClick={handleHobbyClick}
      />
    </div>
  );
}

export default HomePage;