import InputBox from './components/InputBox';
import Title from './components/Title';

function App() {
  return (
    <div>
      <Title />
      <div className='row mx-1'>
        <div className='col-auto'></div>
        <div className='m-5 p-5 col'>
          <InputBox />
        </div>
        <div className='col-auto'></div>
      </div>
    </div>
  );
}

export default App;
