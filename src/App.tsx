import "./App.css";
import Navbar1 from './components/navbars/Navbar1';
import GradientBg from './components/other/GradientBg';
import Task1 from './components/tasks/Task1';

function App() {
  return (
    <div className=' bg-zinc-900 h-screen min-w-max w-screen relative text-purple-50 overflow-auto'>
      <Navbar1 />
      <GradientBg />
      <section className=' h-full w-full  z-50 relative bg-opacity-30 flex justify-center pt-4 pb-4'>
        <Task1 />
      </section>
    </div>
  )
}

export default App;