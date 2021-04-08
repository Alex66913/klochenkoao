import React from 'react';
import { Bar } from './components/Bar.jsx';
import { Button } from './components/Button.jsx'
import store from './store'
import { observer } from 'mobx-react'
import { DeadModal } from './components/DeadModal.jsx';
import { History } from './components/History';

function App() {
  // const [shownHistory, setShownHistory] = React.useState(false);

  function action(type = 'eat') {
    return function () {
      store[type]()
    }
  }

  function toggleHistory() {
    // setShownHistory(!shownHistory)
    store.shownHistory = !store.shownHistory
  }

  return (
    <div className="app">
      <div className="container">
      <p>Здоровье:</p>
        <Bar type="health" value={store.health}></Bar>
        <p>Голод:</p>
        <Bar type="hungry" value={store.hungry}></Bar>
        <p>Жажда:</p>
        <Bar type="thrist" value={store.thrist}></Bar>
        <p>Усталость:</p>
        <Bar type="stamina" value={store.stamina}></Bar>
      </div>
      
      <div className="container">
        <Button type="eat" onClick={action('eat')}>Есть</Button>
        <Button type="drink" onClick={action('drink')}>Пить</Button>
        <Button type="sleep" onClick={action('sleep')}>Отдыхать</Button>
        <Button type="work" onClick={action('work')}>Работай, плотва</Button>

        <Button onClick={toggleHistory}>История</Button>
      </div>
      {store.isDead && <DeadModal />}
      {store.shownHistory && <History onClick={toggleHistory}/>}
    </div>
  );
}

export default observer(App);
