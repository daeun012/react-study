import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  let [funcShow, setFuncShow] = useState(true);
  let [classShow, setClassShow] = useState(true);
  return (
    <div className="container">
      <h1>Hello World</h1>
      <input
        type="button"
        value="remove func"
        onClick={() => {
          setFuncShow(!funcShow);
        }}
      ></input>
      <input
        type="button"
        value="remove clss"
        onClick={() => {
          setClassShow(!classShow);
        }}
      ></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}

let funcStyle = 'color:blue';
let funcId = 0;
function FuncComp(props) {
  let numberState = useState(props.initNumber);
  let number = numberState[0]; // 상태 값
  let setNumber = numberState[1]; // 상태를 바꿀 수 있는 함수

  let [_date, setDate] = useState(new Date().toString());

  // side effect가 생략 된 거래.
  // componentDidMount, componentDidUpdate
  // 첫번째 인자 : 함수 , 두번째 인자 : 배열
  // 여러개를 사용할 수 있다.
  useEffect(
    function () {
      console.log('%cfunc => useEffect number ' + ++funcId, funcStyle);
      document.title = number;

      // 정리 정돈의 작업을 처리한다. clean up
      // componentWillUnMount
      return function () {
        console.log('%cfunc => useEffect number return ' + ++funcId, funcStyle);
      };
    },
    [number] // componentDidUpdate
  );

  useEffect(
    function () {
      console.log('%cfunc => useEffect date ' + ++funcId, funcStyle);
      document.title = _date;

      return function () {
        console.log('%cfunc => useEffect date return' + ++funcId, funcStyle);
      };
    },
    [_date]
  );

  useEffect(
    function () {
      console.log('%cfunc => useEffect (componentDidMount)' + ++funcId, funcStyle);
      document.title = number;

      // 정리 정돈의 작업을 처리한다. clean up
      // componentWillUnMount
      return function () {
        console.log('%cfunc => useEffect return (componentDidMount)' + ++funcId, funcStyle);
      };
    },
    [] // 두번재 인자에 빈배열을 주면 componentDidMount 처럼 딱 한번 실행된다.
  );

  console.log('%cfunc => render' + ++funcId, funcStyle);

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number:{number}</p>
      <p>Date:{_date} </p>
      <input type="button" value="random" onClick={() => setNumber(Math.random())}></input>
      <input type="button" value="date" onClick={() => setDate(new Date().toString())}></input>
    </div>
  );
}

class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  };

  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number:{this.state.number}</p>
        <p>Date:{this.state.date}</p>
        <input
          type="button"
          value="random"
          onClick={() => {
            this.setState({ number: Math.random() });
          }}
        ></input>
        <input
          type="button"
          value="date"
          onClick={() => {
            this.setState({ date: new Date().toString() });
          }}
        ></input>
      </div>
    );
  }
}

export default App;
