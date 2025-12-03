function App() {
  return (
    <div className='w-screen h-screen flex flex-col flex-1'>
      
      {/* header */}
      <header className='bg-blue-500 w-full min-h-[15%]'>
        header
      </header>

      <main className=' h-[80%] w-full flex flex-row'>

      {/* flights */}
      <div className='bg-green-500 h-full w-[70%] flex flex-col'>
        
        <div className='flex flex-row w-full h-1/2'>
          {/* top left corner */}
          <div className='bg-yellow-300 w-1/2 h-full'>
            top left
          </div>
          
          {/* top right corner */}
          <div className='bg-yellow-600 w-1/2 h-full'>
            top right
          </div>
        </div>

        <div className='flex flex-row w-full h-1/2'>
          {/* bottom left corner */}
          <div className='bg-yellow-600 w-1/2 h-full'>
            top left
          </div>
          
          {/* bottom right corner */}
          <div className='bg-yellow-300 w-1/2 h-full'>
            top right
          </div>
        </div>

      </div>

      {/* Logs */}
      <div className='w-[30%] h-full bg-red-600'>
        log sidebar
      </div>

      </main>

      {/* footer */}
      <footer className='bg-gray-200 w-full h-[5%]'>
        footer
      </footer>
      
    </div>
  )
}

export default App