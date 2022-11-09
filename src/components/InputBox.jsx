import React, { useState,useEffect } from 'react'

// adding data in local storage
const InputBox = () => {
  const getLocalItems=()=>{
    let list =localStorage.getItem('lists');
    console.log(list);
    if (list) {
      return JSON.parse(localStorage.getItem('lists'));
    } else {
      return []
    }
  }

  // Using usestate hook
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItems());
  const [toogleSubmit, setToogleSubmit] = useState(true);
  const [isEditItem,setIsEditItem]=useState(null);


  const addItem = () => {
    if (!inputData) {
      alert("Fill out all field")
    } else if(inputData && !toogleSubmit){
      setItems(
        items.map((elem)=>{
          if (elem.id===isEditItem) {
             return {...elem,name:inputData}
          }
          return elem
        })
      )
      setToogleSubmit(true);
      setInputData('');
      setIsEditItem(null);
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: inputData }
      setItems([...items, allInputData])
      setInputData('')
    }
  }

  const deleteItem = (ind) => {
    const updatedItems = items.filter((elem) => {
      return ind !== elem.id;
    })
    setItems(updatedItems)
  }

  const removeAll = () => {
    setItems([])
  }

  const editItem = (ind) => {
    const newEditItem = items.find((elem) => {
      return ind === elem.id;
    })
    setToogleSubmit(false);
    setInputData(newEditItem.name)
    setIsEditItem(ind)
  }

  useEffect(() => {
    localStorage.setItem('lists',JSON.stringify(items))
  }, [items])
  

  return (
    <>
      <div className='row mb-4 '>
        <div className='col-auto me-auto'>
          <form action='#' className="input-group mb-3">
{/* on value change */}
            <input type="text" className='form-control border border-primary' placeholder='✍️ Add Items...'
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value)
              }}
            />
            <button type="submit" className="btn btn-primary"
              onClick={addItem}
            >
              {
                toogleSubmit ? <><i className="fa-solid fa-circle-plus" /> Add Task</> : <><i className="fa-solid fa-pen-to-square" /> Edit Task</>
              }
            </button>
          </form>
        </div>
        <div className='col-auto' role="group">
          <button type="button" className="btn btn-primary"
            onClick={removeAll}
          ><i className="fa-solid fa-trash-can"></i> Delete All</button>
        </div>
      </div>
      <div className='card'>
        <div className="list-group card-body ms-3">
          {
            items.map((elem) => {
              return (
                <div key={elem.id}>
                  <div className="list-group-item">{elem.name}
                    <div className='float-end'>
                      <button type='button' title='Edit Item' className='btn btn-sm btn-success' onClick={() => editItem(elem.id)}><i className="fa-solid fa-pen-to-square" /></button>
                      <button type='button' title='Delete Item' className='btn btn-sm btn-danger ms-2' onClick={() => deleteItem(elem.id)}><i className="fa-solid fa-trash" /></button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default InputBox;